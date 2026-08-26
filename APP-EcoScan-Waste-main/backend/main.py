import os
import sys

# Set parent directory in sys.path before local imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from backend.routes import classify, chat, rewards
import uvicorn
app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

app.include_router(classify.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(rewards.router)

@app.get("/")
async def read_root():
    return FileResponse("frontend/templates/index.html")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)