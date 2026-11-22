# Reference ResNet50 checkpoint

The current AI EcoReward prototype uses YOLO11n. See [PROTOTYPE.md](PROTOTYPE.md)
for its model setup.

The original EcoScan project links to a
[ResNet50 checkpoint on Google Drive](https://drive.google.com/file/d/1rArMB9hnJTXCrnKfyNyeQ5fE8ZLh-3i6/view).
Its documentation describes an approximately 94 MB PyTorch checkpoint for
224 × 224 images with two classes, organic and recyclable. The source
project reported 97% test accuracy on its reference model. The original
dataset link is [Waste Classification Data](https://www.kaggle.com/datasets/techsash/waste-classification-data).

The legacy loader reads the path defined by `MODEL_PATH` in
`backend/config.py`. Verify that your trusted checkpoint matches the loader
architecture and that it loads successfully before using the legacy endpoint.
