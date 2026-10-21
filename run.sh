#!/usr/bin/env bash
# ==============================================================================
# Fides — Trust Infrastructure for Agentic Commerce
# Master Run & Deployment Script
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

print_header() {
  echo -e "\033[1;36m============================================================\033[0m"
  echo -e "\033[1m  FIDES // TRUST INFRASTRUCTURE FOR AGENTIC COMMERCE\033[0m"
  echo -e "\033[2m  Amazon Developer Hackathon (Fire TV, Alexa+, Ring, Bee)\033[0m"
  echo -e "\033[1;36m============================================================\033[0m"
}

usage() {
  print_header
  echo "Usage: ./run.sh [command]"
  echo ""
  echo "Commands:"
  echo "  test           Run full pytest suite (30/30 tests)"
  echo "  cli [args]     Run the Fides interactive CLI (e.g. ./run.sh cli scenario 1)"
  echo "  build          Build the production frontend bundle into frontend/dist"
  echo "  dev            Start backend (port 8000) and frontend Vite (port 5173)"
  echo "  prod           Run production server on port 8000 (serves API & SPA)"
  echo "  docker-build   Build Docker production image"
  echo "  docker-up      Launch Docker Compose container stack on port 8000"
  echo "  docker-down    Stop Docker Compose containers"
  echo ""
}

ensure_venv() {
  if [ ! -d ".venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv .venv
    .venv/bin/pip install --upgrade pip
    .venv/bin/pip install -r requirements.txt
  fi
}

cmd="${1:-dev}"

case "$cmd" in
  test)
    print_header
    ensure_venv
    echo -e "\033[1;32mRunning test suite...\033[0m"
    .venv/bin/pytest -v
    ;;

  cli)
    shift
    ensure_venv
    .venv/bin/python cli.py "$@"
    ;;

  build)
    print_header
    echo -e "\033[1;32mBuilding production frontend bundle...\033[0m"
    cd frontend && npm install && npm run build
    echo -e "\033[1;32mFrontend built successfully in frontend/dist!\033[0m"
    ;;

  prod)
    print_header
    ensure_venv
    if [ ! -d "frontend/dist" ]; then
      echo "frontend/dist missing. Building frontend first..."
      (cd frontend && npm install && npm run build)
    fi
    echo -e "\033[1;32mStarting production gateway on http://localhost:8000...\033[0m"
    .venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8000
    ;;

  docker-build)
    print_header
    echo -e "\033[1;32mBuilding Docker container...\033[0m"
    docker build -t fides-gateway:latest .
    ;;

  docker-up)
    print_header
    echo -e "\033[1;32mStarting Docker Compose on http://localhost:8000...\033[0m"
    docker compose up --build -d
    echo -e "\033[1;32mFides Gateway running in container!\033[0m"
    ;;

  docker-down)
    print_header
    docker compose down
    ;;

  dev)
    print_header
    ensure_venv
    echo -e "\033[1;32mStarting Fides in local development mode...\033[0m"
    echo "FastAPI Backend: http://localhost:8000"
    echo "Frontend Dev:    http://localhost:5173"
    echo ""
    # Run uvicorn in background, run vite in foreground
    trap 'kill $(jobs -p) 2>/dev/null || true' EXIT
    .venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload &
    (cd frontend && npm run dev -- --host 0.0.0.0 --port 5173)
    ;;

  *)
    usage
    ;;
esac
