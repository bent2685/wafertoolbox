#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PLATFORM="${1:-windows/amd64}"
SKIP_FRONTEND="${2:-false}"

if ! command -v wails >/dev/null 2>&1; then
  echo "ERROR: wails command not found. Please install Wails CLI first." >&2
  exit 1
fi

if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "ERROR: project directory not found: $PROJECT_DIR" >&2
  exit 1
fi

cd "$PROJECT_DIR"

echo "[INFO] Project: $PROJECT_DIR"
echo "[INFO] Platform: $PLATFORM"
echo "[INFO] Skip frontend: $SKIP_FRONTEND"

if [[ "$SKIP_FRONTEND" == "true" ]]; then
  wails build -platform "$PLATFORM" -s
else
  wails build -platform "$PLATFORM"
fi

echo "[DONE] Build output: $PROJECT_DIR/build/bin/wafer-tools.exe"
