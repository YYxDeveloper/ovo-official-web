import { test, expect } from "@playwright/test";

test.use({ baseURL: "http://localhost:3000" });

test.describe("Admin Vigor CRUD (issue #36) — unauthenticated", () => {
  test("/admin/vigor/slides redirects to login when no session", async ({ page }) => {
    const res = await page.goto("/admin/vigor/slides");
    expect(res?.status()).toBeLessThan(500);
    await expect(page).toHaveURL(/\/admin\/login$/);
  });

  test("/admin/vigor/services redirects to login when no session", async ({ page }) => {
    await page.goto("/admin/vigor/services");
    await expect(page).toHaveURL(/\/admin\/login$/);
  });

  test("/admin/vigor/partners redirects to login when no session", async ({ page }) => {
    await page.goto("/admin/vigor/partners");
    await expect(page).toHaveURL(/\/admin\/login$/);
  });
});
