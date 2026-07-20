# fix: rename middleware.ts → proxy.ts for Next.js 16 compatibility

## Summary

Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`. The admin route guard used the old convention, causing a runtime error "Cannot find the middleware module" when accessing `/admin/login`.

## Background & Motivation

- Project runs Next.js 16.2.10 which no longer supports `middleware.ts`
- The admin panel authentication guard was implemented using the deprecated `middleware.ts` file convention
- Build succeeds with a deprecation warning, but at runtime the middleware module fails to load
- All `/admin/*` routes become inaccessible

## Symptom

Visiting `http://<host>:3000/admin/login` produces:

```
Runtime Error: Cannot find the middleware module
```

## Root Cause

Next.js 16 replaced the `middleware.ts` file convention with `proxy.ts`. The exported function must also be renamed from `middleware` to `proxy`. The project had `src/middleware.ts` exporting `function middleware()`, which Next.js 16 cannot resolve at runtime.

## Fix Applied

| Action | File |
|---|---|
| Deleted | `src/middleware.ts` |
| Created | `src/proxy.ts` — same logic, exported as `function proxy()` |

Logic unchanged: intercept `/admin/*` (excluding `/admin/login`), redirect to `/admin/login` if no `admin-session` cookie present.

## Regression Risk

**Low** — pure file rename + function rename. Auth guard logic is identical. No other modules depend on the middleware file.

### Recommended additional tests

- E2E test: unauthenticated visit to `/admin` should redirect to `/admin/login`
- E2E test: authenticated visit to `/admin` should render dashboard
