import time
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/rewards", tags=["Rewards & Gamification"])

BASE_POINTS = {
    "plastic": 5,
    "glass": 8,
    "battery": 20,
    "e_waste": 30,
    "metal": 10,
    "organic": 5
}
PROOF_BONUS = 20

class DisposalRequest(BaseModel):
    user_id: str
    category: str
    proof_verified: bool
    last_timestamp: int
    current_streak: int

@router.post("/calculate")
def calculate_transaction(data: DisposalRequest):
    category_key = data.category.lower().replace("-", "_")
    if category_key not in BASE_POINTS:
        raise HTTPException(status_code=400, detail="Unknown waste class")
    
    current_time = int(time.time())
    
    # 1. Base Points + Proof Verification
    base = BASE_POINTS[category_key]
    proof = PROOF_BONUS if data.proof_verified else 0
    tx_points = base + proof
    
    # 2. Daily Streak Calculation (Delta D)
    delta_days = (current_time - data.last_timestamp) // 86400
    if delta_days == 1:
        new_streak = data.current_streak + 1
    elif delta_days > 1:
        new_streak = 1
    else:
        new_streak = data.current_streak
        
    # 3. Streak Milestone Bonus
    streak_bonus = 50 if new_streak == 7 else (200 if new_streak == 30 else 0)
    total_awarded = tx_points + streak_bonus
    
    return {
        "user_id": data.user_id,
        "points_awarded": total_awarded,
        "base_points": base,
        "proof_bonus": proof,
        "streak_bonus": streak_bonus,
        "new_streak": new_streak,
        "timestamp": current_time
    }