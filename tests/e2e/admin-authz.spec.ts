import { test, expect } from "@playwright/test";

// Run against the issue18 dev server (port 3001) to test THIS branch's code,
// not the long-running dev server on 3000.
test.use({ baseURL: "http://localhost:3001" });

// H2 — page-level authorization in admin layout
// Even though proxy.ts only checks cookie *presence* (it cannot verify the JWT at the edge),
// the admin layout must reject forged/invalid JWT cookies and redirect to /admin/login.

test("H2 — forged admin-session cookie on /admin redirects to /admin/login", async ({ browser }) => {
  const ctx = await browser.newContext();
  await ctx.addCookies([
    { name: "admin-session", value: "not-a-valid-jwt", domain: "localhost", path: "/" },
  ]);
  const page = await ctx.newPage();
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login$/);
  await ctx.close();
});

test("H2 — no admin-session cookie on /admin redirects to /admin/login", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login$/);
  await ctx.close();
});
