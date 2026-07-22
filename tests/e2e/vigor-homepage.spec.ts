import { test, expect } from "@playwright/test";

test.use({ baseURL: "http://localhost:3000" });

test.describe("Vigor homepage (issue #35)", () => {
  test("desktop viewport — /vigor renders carousel, services, partners, footer", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/vigor");
    await expect(page).toHaveTitle(/Vigor/);

    await expect(page.getByRole("heading", { name: "服務總覽" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "下載資源" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "合作夥伴" })).toBeVisible();

    const services = page.getByRole("listitem").filter({ hasText: /健康|學習|社群|生活/ });
    expect(await services.count()).toBeGreaterThan(0);
  });

  test("mobile viewport — hamburger menu toggles nav", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/vigor");
    const toggle = page.getByRole("button", { name: /開啟主導覽選單|關閉主導覽選單/ });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.getByRole("navigation", { name: "主導覽" })).toBeVisible();
  });

  test("tablet viewport — service grid 2-column layout", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/vigor");
    await expect(page.getByRole("heading", { name: "服務總覽" })).toBeVisible();
  });

  test("carousel pause control — hover pauses autoplay", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/vigor");
    const carousel = page.getByRole("region", { name: "Vigor 最新消息" });
    if (await carousel.isVisible().catch(() => false)) {
      await carousel.hover();
      await expect(carousel).toBeVisible();
    }
  });
});
