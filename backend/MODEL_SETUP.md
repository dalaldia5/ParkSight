# YOLOv8 Model Setup for ParkSight

## ⚠️ IMPORTANT: Model Weights Required

The **best.pt** model file is required to run this backend. This file contains the trained YOLOv8m weights fine-tuned on the PKLot dataset.

## Model Performance Metrics

- **mAP50**: 99.30%
- **mAP50-95**: 98.91%
- **Precision**: 99.87%
- **Recall**: 99.14%
- **F1-Score**: 99.50%

## Option 1: Use Pre-trained Model

If you have access to the pre-trained model from the HansujaB/ParkSight repository:

1. Download the `best.pt` file
2. Place it in the `backend/` directory
3. The file should be at: `c:\DevProjects\ParkSight\backend\best.pt`

## Option 2: Train Your Own Model

Use the Jupyter notebook provided in the project root:

1. Open `parking-lot-prediction.ipynb`
2. Run all cells to train the model on the PKLot dataset
3. The trained model will be saved as `best.pt` in the correct location

### Training Requirements:
- **Dataset**: PKLot (PUCPR, UFPR04, UFPR05 parking lots)
- **Conditions**: Cloudy, Sunny, Rainy
- **Classes**: `space-empty`, `space-occupied`
- **Base Model**: YOLOv8m
- **Epochs**: 50 (recommended)

## Option 3: Download from Model Registry

If you have a model registry or cloud storage:

```bash
# Example for downloading from cloud storage
# Replace with your actual model URL
wget https://your-storage-url/best.pt -O backend/best.pt
```

## Verification

After placing the model file, verify it exists:

```bash
ls -la backend/best.pt
```

The file should be approximately 50-100 MB in size.

## Running the Backend

Once the model is in place:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API will start on http://localhost:5001

## Model Classes

The model is trained to detect two classes:
- **space-empty** (Green bounding box)
- **space-occupied** (Red bounding box)

## Confidence Threshold

Default: 0.25 (can be adjusted in requests)

Lower threshold = More detections (including false positives)
Higher threshold = Fewer but more confident detections
