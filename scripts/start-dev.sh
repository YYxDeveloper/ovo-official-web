#!/bin/bash
# Auto-detect a free port starting from 3000 and print a Tailscale IP preview URL.

set -e

PORT=3000
MAX_PORT=3999
while [ $PORT -le $MAX_PORT ]; do
  if ! lsof -i :$PORT -sTCP:LISTEN -P -n > /dev/null 2>&1; then
    break
  fi
  echo "Port $PORT occupied, trying $((PORT+1))..."
  PORT=$((PORT+1))
done

if [ $PORT -gt $MAX_PORT ]; then
  echo "No free port found between 3000 and $MAX_PORT."
  exit 1
fi

TAILSCALE_IP=""
if command -v tailscale > /dev/null 2>&1; then
  TAILSCALE_IP=$(tailscale ip -4 2>/dev/null | head -1 || true)
fi

echo ""
echo "Starting on port $PORT"
echo "Local:     http://localhost:$PORT"
if [ -n "$TAILSCALE_IP" ]; then
  echo "Tailscale: http://$TAILSCALE_IP:$PORT"
fi
echo ""

exec npm run dev -- --port $PORT
