# 🚀 YOLOv8 Model Training Guide for ParkSight

## Overview

This guide will help you train the YOLOv8 parking detection model and integrate it with your ParkSight backend.

---

## 📋 Quick Start

### Option 1: Kaggle Training (RECOMMENDED - Free GPU)

1. **Upload Notebook to Kaggle**
   - Go to https://www.kaggle.com
   - Click "Create" → "New Notebook"
   - Upload `parking-lot-prediction.ipynb` from your project root

2. **Add Dataset**
   - In Kaggle, click "Add Data" → Search for "pklot-yolov8"
   - OR upload your own PKLot dataset

3. **Configure GPU**
   - Click "Accelerator" → Select "GPU T4 x2"
   - This provides FREE GPU access

4. **Run Training**
   - Run Cell 4 (Main Training Pipeline)
   - Wait 2-3 hours for training to complete
   - Look for: `✅ TRAINING COMPLETED!`

5. **Download Model**
   - Run Cell 6 (Download best.pt)
   - Click the generated download link
   - Save as: `c:\DevProjects\ParkSight\backend\best.pt`

---

## 🔧 Local Training (If You Have GPU)

### Prerequisites
- NVIDIA GPU with CUDA support
- 8GB+ VRAM recommended
- 20GB+ free disk space

### Setup
```powershell
# Navigate to project
cd c:\DevProjects\ParkSight

# Activate virtual environment
.\.venv\Scripts\activate

# Install training dependencies
pip install jupyter notebook ipykernel
```

### Training
```powershell
# Start Jupyter
jupyter notebook

# Open parking-lot-prediction.ipynb
# Modify paths in Cell 4 to point to your local dataset
# Run all cells
```

### Expected Output
```
Training Results:
├── runs/detect/yolov8_parking/
│   ├── weights/
│   │   ├── best.pt          # ⭐ Use this file
│   │   └── last.pt
│   ├── results.csv
│   └── plots/
```

---

## ✅ Integration Steps

### 1. Verify Model File
```powershell
cd c:\DevProjects\ParkSight\backend
Test-Path best.pt
# Should return: True
```

### 2. Start Backend
```powershell
cd c:\DevProjects\ParkSight\backend
C:/DevProjects/ParkSight/.venv/Scripts/python.exe app.py
```

**Expected Output:**
```
🔄 Loading YOLOv8 model...
✅ Model loaded successfully from best.pt
✅ Server running on http://localhost:5001
```

### 3. Test Health Endpoint
```powershell
curl http://localhost:5001/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "model": "loaded",
  "version": "1.0.0"
}
```

### 4. Start Frontend
```powershell
# Open new terminal
cd c:\DevProjects\ParkSight\frontend
npm run dev
```

### 5. Test Detection
- Navigate to: http://localhost:5173/parking
- Upload a parking lot image
- You should see:
  - Annotated image with bounding boxes
  - Green boxes = Empty spaces
  - Red boxes = Occupied spaces
  - Statistics (occupied/free counts)

---

## 🎯 Model Performance

Your trained model should achieve:

| Metric      | Target   | Description                          |
|-------------|----------|--------------------------------------|
| mAP50       | 99.30%   | Mean Average Precision at 50% IoU    |
| mAP50-95    | 98.91%   | Mean Average Precision across IoUs   |
| Precision   | 99.87%   | % of correct positive predictions    |
| Recall      | 99.14%   | % of actual positives detected       |
| F1-Score    | 99.50%   | Harmonic mean of precision & recall  |

---

## 🔍 Troubleshooting

### Problem: Model file not found
```
❌ FileNotFoundError: best.pt not found
```

**Solution:**
1. Check file exists: `Test-Path backend\best.pt`
2. Verify file size: Should be 50-100 MB
3. Re-download from Kaggle if corrupted

---

### Problem: Low detection accuracy
```
⚠️  Detected 0 objects in image
```

**Solution:**
1. Check image format (JPG/PNG)
2. Verify image quality (not too blurry)
3. Adjust confidence threshold in `backend/app.py`:
   ```python
   CONFIDENCE_THRESHOLD = 0.15  # Lower for more detections
   ```

---

### Problem: Training fails on Kaggle
```
❌ OpenCV DataLoader Error
```

**Solution:**
- Run Cell 2 (Fix OpenCV Version)
- Restart kernel
- Run Cell 4 again

---

### Problem: CUDA out of memory
```
❌ CUDA out of memory
```

**Solution:**
- In Cell 4, reduce batch size:
  ```python
  batch_size = 8  # Instead of 16
  ```

---

## 📊 API Endpoints

Once backend is running, these endpoints are available:

### GET `/health`
Check if server and model are loaded
```bash
curl http://localhost:5001/health
```

### POST `/detect`
Upload image and get detection results
```bash
curl -X POST http://localhost:5001/detect \
  -F "file=@parking_lot.jpg"
```

**Response:**
```json
{
  "annotated_image_b64": "base64_encoded_image...",
  "occupied_count": 45,
  "free_count": 55,
  "per_spot": [true, false, true, ...],
  "confidence": 0.89,
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## 🎓 Understanding the Training Process

### What Happens During Training?

1. **Dataset Loading** (5 min)
   - Copies PKLot dataset to writable location
   - Verifies image and label files
   - Creates data.yaml configuration

2. **Model Initialization** (1 min)
   - Downloads YOLOv8m pre-trained weights (~50MB)
   - Configures architecture for 2 classes
   - Sets up training parameters

3. **Training Loop** (2-3 hours)
   - 30 epochs of training
   - Each epoch processes all training images
   - Validates after each epoch
   - Saves best model based on mAP

4. **Validation** (5 min)
   - Tests model on validation set
   - Calculates performance metrics
   - Generates plots and reports

### Training Output Files

```
runs/detect/yolov8_parking/
├── weights/
│   ├── best.pt          # Best performing model (use this!)
│   └── last.pt          # Final epoch model
├── results.csv          # Training metrics per epoch
├── confusion_matrix.png # Classification performance
├── F1_curve.png         # F1 score vs confidence
├── PR_curve.png         # Precision-Recall curve
└── val_batch0_pred.jpg  # Sample predictions
```

---

## 🔐 Security Notes

- Model file is ~50-100 MB (not included in git)
- Add to `.gitignore`: `backend/best.pt`
- Store model in cloud for production (S3, Azure Blob)
- Use environment variables for MODEL_PATH in production

---

## 📞 Support

### Common Issues

1. **"Model not loaded"** → Download best.pt from Kaggle
2. **"CORS error"** → Backend running on localhost:5001?
3. **"No detections"** → Try different image or lower confidence
4. **"Import error"** → Reinstall: `pip install ultralytics`

### Resources

- **Ultralytics Docs:** https://docs.ultralytics.com/
- **PKLot Dataset:** https://www.kaggle.com/datasets/pklot
- **YOLOv8 Paper:** https://arxiv.org/abs/2305.09972

---

## 🎉 Success Checklist

- ✅ Kaggle notebook runs without errors
- ✅ Training completes with mAP50 > 99%
- ✅ best.pt downloaded to backend folder
- ✅ Backend starts with "Model loaded successfully"
- ✅ Frontend displays detection results
- ✅ Green/red boxes appear on uploaded images
- ✅ Occupied/free counts are accurate

**You're now ready for production! 🚀**
