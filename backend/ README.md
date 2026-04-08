# Smart Parking Backend API

Flask-based REST API for the Smart Parking Detection System.

## Features

- Real-time parking slot status
- Image-based parking occupancy prediction
- Video frame analysis
- Analytics dashboard data
- Integration with TensorFlow/Keras ML model

## Installation

```bash
cd backend
pip install -r requirements.txt
```

## Running the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/health

Health check and status

### GET /api/parking/status

Get current parking lot status with all slots

### POST /api/predict/image

Upload an image to predict parking occupancy

### POST /api/predict/video

Send video frame for real-time detection

### GET /api/analytics

Get parking analytics data

## Integration with Frontend

The frontend React app should connect to this backend by updating the API base URL.