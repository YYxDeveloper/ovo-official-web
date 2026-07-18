# Spec 08 — DevOps & Dev Server

## Port Auto-Detection Script (scripts/start-dev.sh)

```bash
#!/bin/bash
PORT=3000
while lsof -i :$PORT -sTCP:LISTEN > /dev/null 2>&1; do
  echo "Port $PORT occupied, trying $((PORT+1))..."
  PORT=$((PORT+1))
done

TAILSCALE_IP=$(tailscale ip -4 2>/dev/null | head -1)

echo "Starting on port $PORT"
echo "Local:     http://localhost:$PORT"
[ -n "$TAILSCALE_IP" ] && echo "Tailscale: http://$TAILSCALE_IP:$PORT"

npm run dev -- --port $PORT
```

## package.json Script

```json
"dev:smart": "bash scripts/start-dev.sh"
```

## next.config.ts Image Domains

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/photo-**' },
    { protocol: 'https', hostname: 'picsum.photos' },
  ]
}
```

## Tailscale Preview
- IP: 100.100.177.73
- Expected URL: `http://100.100.177.73:<PORT>`

## Acceptance Criteria
- [ ] `npm run dev:smart` auto-detects free port starting from 3000
- [ ] Tailscale URL printed to console if tailscale is running
- [ ] Next.js Image component loads Unsplash + Picsum URLs
