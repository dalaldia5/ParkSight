# Vercel Deployment Guide

## Local Development (macOS/Linux)

Before deploying, validate locally from the repository root:

```bash
# Backend (Python 3.10 recommended for pinned ML deps)
conda create -y -n smartpark-py310 python=3.10
conda run -n smartpark-py310 pip install -r backend/requirements.txt

# Frontend
cd frontend
npm ci
npm run dev
```

In a second terminal:

```bash
conda run -n smartpark-py310 python /Users/dia/Desktop/SmartPark-main/backend/app.py
```

Or use the root startup helper:

```bash
cd /Users/dia/Desktop/SmartPark-main
bash start.sh
```

> Note: `npm run dev` must be executed inside `frontend/`, not at repository root.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed: `npm install -g vercel`

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Deploy Frontend

1. Go to https://vercel.com/new
2. Import your GitHub repository: `dalaldia5/ParkSight`
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_URL`: (Will be your backend URL from step below)
5. Click "Deploy"

#### Deploy Backend

1. Go to https://vercel.com/new
2. Import the same repository again
3. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
4. Click "Deploy"
5. Copy the deployed backend URL (e.g., `https://your-backend.vercel.app`)

#### Update Frontend with Backend URL

1. Go to your frontend project in Vercel
2. Go to Settings → Environment Variables
3. Update `VITE_API_URL` with your backend URL
4. Redeploy the frontend

### Option 2: Deploy via CLI

#### Step 1: Deploy Backend

```bash
cd backend
vercel --prod
```

- Follow the prompts
- Copy the deployed URL

#### Step 2: Deploy Frontend

```bash
cd ../frontend
vercel --prod
```

- When prompted for environment variables, add:
  - `VITE_API_URL`: Your backend URL from Step 1

## Important Notes

### Backend Limitations on Vercel

⚠️ **Vercel has limitations for Python applications:**

- **Max execution time**: 10 seconds on Hobby plan, 60 seconds on Pro
- **Max payload size**: 4.5 MB
- **No persistent storage**: Uploaded files won't persist between deployments

### Recommended Alternative for Backend

For production deployment, consider these alternatives:

1. **Railway.app** - Better Python support, persistent storage
2. **Render.com** - Free tier available, good for Flask apps
3. **AWS Lambda** with S3 storage
4. **Google Cloud Run**
5. **DigitalOcean App Platform**

### If Using Vercel for Backend

You'll need to:

1. Use external storage (AWS S3, Cloudinary) for images
2. Keep video processing under 10 seconds
3. Reduce model size or use serverless-optimized models

## Testing Deployment

After deployment:

1. Visit your frontend URL
2. Upload a test image
3. Check browser console for any CORS or API errors
4. Verify detection results display correctly

## Troubleshooting

### CORS Issues

If you see CORS errors, ensure backend has:

```python
CORS(app, resources={r"/*": {"origins": "*"}})
```

### 404 Errors

- Check that API routes start with `/` not `api/`
- Verify `vercel.json` routing configuration

### Build Failures

- Frontend: Check Node.js version (requires 20.19+ or 22.12+)
- Backend: Verify all dependencies in `requirements.txt`

### Large Model File

If `best.pt` (52MB) causes issues:

1. Use Git LFS
2. Or host model file separately (S3, Google Drive)
3. Download model on first request

## Environment Variables

### Frontend

- `VITE_API_URL`: Backend API URL

### Backend (if needed)

- `MODEL_PATH`: Path to model file
- `AWS_ACCESS_KEY_ID`: If using S3 storage
- `AWS_SECRET_ACCESS_KEY`: If using S3 storage
- `S3_BUCKET_NAME`: If using S3 storage

## Monitoring

- Check Vercel logs: https://vercel.com/dashboard
- Monitor function execution times
- Track error rates and performance
