# Spec: Proxy Migration

## Scope

Rename `src/middleware.ts` → `src/proxy.ts` and update the exported function name from `middleware` to `proxy`, per Next.js 16 file conventions.

## Changes

### Deleted: `src/middleware.ts`

The deprecated middleware file.

### Created: `src/proxy.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("admin-session")?.value;
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

## Acceptance Criteria

- [ ] `src/middleware.ts` no longer exists
- [ ] `src/proxy.ts` exists with `export function proxy()`
- [ ] `bun run build` passes without middleware deprecation warning
- [ ] Visiting `/admin` without session redirects to `/admin/login`
- [ ] Visiting `/admin/login` renders login page without error
