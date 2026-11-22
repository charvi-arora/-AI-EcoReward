# Run the AI EcoReward prototype

For the local Windows demo, stop the previous server, then double-click
`Start-EcoReward-Demo.cmd` in this folder or run it from PowerShell.
Open http://127.0.0.1:8000/ in the same browser as before.
Verify previously saved photos using **Verify saved photo** under Recent scans.

In VS Code, open an integrated PowerShell terminal in this folder
(`APP-EcoScan-Waste-main`). Use the Python 3.12 virtual environment from the
existing backend setup. If you named it `.venv312`, substitute that name.

```powershell
.\.venv\Scripts\python.exe -m pip install -r prototype-requirements.txt
.\.venv\Scripts\python.exe -c "from ultralytics import YOLO; YOLO('yolo11n.pt')"
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

If the previous server is running, stop it with Ctrl+C first. The first model
load downloads the official YOLO11n checkpoint. Run it before the review so
the local copy is ready.
Open the English AI EcoReward demo at http://127.0.0.1:8000/.
The /demo address also opens the same page. API docs are at
http://127.0.0.1:8000/docs.

If automatic download fails, download the [official YOLO11n checkpoint](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n.pt)
and save it as `yolo11n.pt` in this folder. The update ZIP includes the
YOLO-World checkpoint `yolov8s-worldv2.pt` for disposal photo verification.

1. Create a profile and upload a well-lit photo of one upright bottle.
2. Confirm that the detected category, confidence, guidance and account
   balance appear. Uploading the same image again gives zero additional points.
3. Upload a different photo taken from above, with the item visible inside
   the open bin. Click **Verify with AI**. A passing photo adds 20 points once.
   For a previously saved pending upload, click **Verify saved photo**.
4. Refresh to show the saved history and leaderboard.

The included COCO checkpoint recognizes a generic bottle category. It awards
5 points for that category and supplies guidance to check the material.
Material-specific detection requires fine-tuned weights. Set
`ECOREWARD_MODEL` to a trusted local checkpoint path after training.
Recognized output labels are listed in `backend/utils/detector.py`.

The prototype stores data in `uploads/ecoreward.sqlite3`. User profiles use
an anonymous bearer token stored in the browser. Streaks use Indian
calendar days. SQLite is suitable for this local demonstration.

## API routes

| Method and route | Purpose |
| --- | --- |
| POST /api/v1/profiles | Create a profile and return its bearer token |
| POST /api/v1/detect | Upload a multipart field named file, detect waste and save the scan |
| GET /api/v1/me | Return points, streak, level and badges |
| GET /api/v1/scans | Return recent scans and proof status |
| POST /api/v1/scans/{scan_id}/proof | Submit a multipart disposal photo |
| GET /api/v1/leaderboard | Return the top ten display names and scores |
| POST /api/v1/scans/{scan_id}/proof/verify | Run the model on an already saved pending photo |

Detection, profile, history and proof submission use the profile token in an
Authorization header, except for creating the profile itself. The detector returns a bounding box in source
image pixels as [x1, y1, x2, y2]. A scan awards points for the highest scoring
supported detection. The response also includes the other supported detections.

## Disposal model limitations

The prototype uses YOLO-World with predefined item and bin labels and checks
whether most of the item box lies inside the detected bin box. This is a check
of visual evidence in a single frame. It cannot establish the disposal event,
which material stream the bin accepts, or whether the same physical item
appears in both photos.

The bundled [Ultralytics YOLO-World checkpoint](https://github.com/ultralytics/assets/releases/download/v8.3.0/yolov8s-worldv2.pt)
uses fixed label embeddings generated with Ultralytics' CLIP encoder. Keeping
both files in their original locations lets the disposal model run offline.
