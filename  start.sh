#!/bin/bash

# ParkSight - Startup Script
# This script runs both frontend and backend together

echo "🚀 Starting ParkSight System..."
echo "======================================"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}⚠️  Virtual environment not found. Creating one...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Function to start backend
start_backend() {
    echo -e "${BLUE}🔧 Starting Backend API on port 5001...${NC}"
    cd backend
    "$SCRIPT_DIR/venv/bin/python" app.py &
    BACKEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
}

# Function to start frontend
start_frontend() {
    echo -e "${BLUE}🎨 Starting Frontend on port 5173...${NC}"
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
}

# Start services
start_backend
sleep 2
start_frontend

echo ""
echo "======================================"
echo -e "${GREEN}✨ ParkSight System is running!${NC}"
echo "======================================"
echo -e "${BLUE}🌐 Frontend:${NC} http://localhost:5173"
echo -e "${BLUE}🔧 Backend API:${NC} http://localhost:5001"
echo -e "${BLUE}📊 API Health:${NC} http://localhost:5001/api/health"
echo -e "${BLUE}🚦 Traffic Page:${NC} http://localhost:5173/traffic"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo "======================================"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping services...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    pkill -P $$ 2>/dev/null
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

# Trap SIGINT and SIGTERM
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait