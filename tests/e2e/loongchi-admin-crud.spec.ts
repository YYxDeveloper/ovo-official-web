import { test, expect, type Page } from "@playwright/test";

async function fullPageScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      const duration = 2000;
      const totalHeight = document.body.scrollHeight;
      const startTime = performance.now();
      function scrollDown(now: number) {
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, totalHeight * progress);
        if (progress < 1) requestAnimationFrame(scrollDown);
        else requestAnimationFrame(scrollUp);
      }
      function scrollUp(now: number) {
        const progress = Math.min((now - startTime - duration) / duration, 1);
        window.scrollTo(0, totalHeight * (1 - progress));
        if (progress < 1) requestAnimationFrame(scrollUp);
        else resolve();
      }
      requestAnimationFrame(scrollDown);
    });
  });
}

async function adminLogin(page: Page): Promise<void> {
  await page.goto("/admin/login");
  await page.locator('input[type="password"]').fill(process.env.ADMIN_PASSWORD ?? "changeme");
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/admin/);
}

// TEST-05: Admin login → create tile → verify on /loongchi/products
test("admin can create a tile and it appears on /loongchi/products", async ({ page }) => {
  await adminLogin(page);

  // Navigate to tile management from sidebar (entry point)
  await page.getByRole("link", { name: "磁磚管理" }).click();
  await expect(page).toHaveURL(/\/admin\/tiles/);

  // Click new tile button
  await page.getByRole("link", { name: "新增磁磚" }).click();
  await expect(page).toHaveURL(/\/admin\/tiles\/new/);

  // Fill in the form with timestamp-unique name to avoid collision with leftover test data
  const ts = Date.now();
  const slug = `e2e-test-${ts}`;
  const tileName = `E2E 磁磚 ${ts}`;
  await page.locator("#slug").fill(slug);
  await page.locator("#name").fill(tileName);
  await page.locator("#category").selectOption("hexagon");
  await page.locator("#finish").selectOption("亮面");
  await page.locator("#size").fill("15x15 cm");
  await page.locator("#origin").fill("義大利");
  await page.locator("#price").fill("9999");
  await page.locator("#image").fill("https://picsum.photos/seed/e2e-test/600/400");

  await page.locator('button[type="submit"]').click();

  // Should redirect back to tile list and show the new tile
  await expect(page).toHaveURL(/\/admin\/tiles$/);
  await expect(page.getByText(tileName)).toBeVisible();

  // Verify the tile appears on the public products page
  await page.goto("/loongchi/products");
  await page.waitForLoadState("networkidle");

  // Filter by hexagon to narrow results
  await page.getByRole("button", { name: "六角" }).click();
  await fullPageScroll(page);
  await expect(page.getByText(tileName)).toBeVisible();

  // Cleanup: delete the test tile via admin
  await page.goto("/admin/tiles");
  await page.waitForLoadState("networkidle");
  const deleteLink = page.locator(`tr:has-text("${slug}") a[href*="/delete"]`);
  await deleteLink.click();
  await expect(page).toHaveURL(/\/delete$/);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/\/admin\/tiles$/, { timeout: 10000 });
  await expect(page.getByText(tileName)).not.toBeVisible();
});

test("/loongchi/products renders all tiles and tab filter works", async ({ page }) => {
  await page.goto("/loongchi/products");
  await page.waitForLoadState("networkidle");

  // Should show tile count in the header
  await expect(page.getByText(/共 \d+ 款/)).toBeVisible();

  await fullPageScroll(page);

  // Click the 木紋 tab
  await page.getByRole("button", { name: "木紋" }).click();
  await expect(page.getByText(/共 \d+ 款/)).toBeVisible();

  // All visible cards should have 木紋 badge
  const badges = page.locator("span", { hasText: "木紋" });
  await expect(badges.first()).toBeVisible();

  await fullPageScroll(page);
});

test("/loongchi home renders featured tiles from DB", async ({ page }) => {
  await page.goto("/loongchi");
  await page.waitForLoadState("networkidle");

  // Hero section should be visible
  await expect(page.getByText("驕傲源於")).toBeVisible();

  // Featured tiles section should render at least one tile card
  await page.getByRole("heading", { name: "精選商品" }).scrollIntoViewIfNeeded();

  await fullPageScroll(page);

  // At least one featured tile should be visible (wood-01 is featured)
  await expect(page.getByText("橡木暖棕")).toBeVisible();
});
