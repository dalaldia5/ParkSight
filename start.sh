#!/bin/bash

# ParkSight - Cross-platform local startup script
# Starts backend (Flask) and frontend (Vite) with safer environment detection.

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🚀 Starting ParkSight..."

detect_backend_python() {
    if command -v conda >/dev/null 2>&1; then
        if conda env list | awk '{print $1}' | grep -qx "smartpark-py310"; then
            echo "conda run -n smartpark-py310 python"
            return
        fi
    fi

    if [ -x "$SCRIPT_DIR/venv/bin/python" ]; then
        echo "$SCRIPT_DIR/venv/bin/python"
        return
    fi

    if command -v python3 >/dev/null 2>&1; then
        echo "python3"
        return
    fi

    echo ""
}

detect_npm() {
    if command -v npm >/dev/null 2>&1; then
        echo "npm"
        return
    fi

    if [ -x "/opt/homebrew/bin/npm" ]; then
        export PATH="/opt/homebrew/bin:$PATH"
        echo "/opt/homebrew/bin/npm"
        return
    fi

    echo ""
}

BACKEND_PY_CMD="$(detect_backend_python)"
NPM_CMD="$(detect_npm)"

if [ -z "$BACKEND_PY_CMD" ]; then
    echo -e "${RED}❌ Could not find a usable Python runtime.${NC}"
    echo "Install Python 3.10+ (or create conda env 'smartpark-py310') and retry."
    exit 1
fi

if [ -z "$NPM_CMD" ]; then
    echo -e "${RED}❌ Could not find npm in PATH.${NC}"
    echo "Install Node.js and npm, then retry."
    exit 1
fi

start_backend() {
    echo -e "${BLUE}🔧 Starting backend on http://localhost:5001 ...${NC}"
    cd "$SCRIPT_DIR/backend"
    # shellcheck disable=SC2086
    eval "$BACKEND_PY_CMD app.py" &
    BACKEND_PID=$!
    cd "$SCRIPT_DIR"
    echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
}

start_frontend() {
    echo -e "${BLUE}🎨 Starting frontend on http://localhost:5173 ...${NC}"
    cd "$SCRIPT_DIR/frontend"
    "$NPM_CMD" run dev &
    FRONTEND_PID=$!
    cd "$SCRIPT_DIR"
    echo -e "${GREEN}✅ Frontend started (PID: $FRONTEND_PID)${NC}"
}

cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping services...${NC}"
    kill "$BACKEND_PID" 2>/dev/null || true
    kill "$FRONTEND_PID" 2>/dev/null || true
    pkill -P $$ 2>/dev/null || true
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

start_backend
sleep 2
start_frontend

echo ""
echo "======================================"
echo -e "${GREEN}✨ ParkSight is running${NC}"
echo "======================================"
echo -e "${BLUE}🌐 Frontend:${NC} http://localhost:5173"
echo -e "${BLUE}🔧 Backend API:${NC} http://localhost:5001"
echo -e "${BLUE}📊 Health:${NC} http://localhost:5001/health"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
echo "======================================"

wait
