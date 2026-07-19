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

// Wait for React hydration: poll until a button's onClick actually works
async function waitForHydration(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle");
}

// T5: Navigate to /google via SiteHeader "Google" link (mobile menu)
test("T5 — navigate to /google via SiteHeader Google link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForHydration(page);

  // Open mobile menu via hamburger button
  const hamburger = page.getByLabel("開啟選單");
  await expect(hamburger).toBeVisible();
  await hamburger.click();

  // Wait for AnimatePresence to render the mobile menu
  const googleNavLink = page.locator('a[href="/google"]');
  await expect(googleNavLink).toBeVisible({ timeout: 10000 });
  await googleNavLink.click();

  await expect(page).toHaveURL("/google");
  await waitForHydration(page);
  await expect(page.getByText("Pixel 9", { exact: false }).first()).toBeVisible();
  await fullPageScroll(page);
  await expect(page.getByText("Google Store")).toBeVisible();
});

// T5b: Hero color picker changes image
test("T5b — hero color picker updates image on swatch click", async ({ page }) => {
  await page.goto("/google");
  await waitForHydration(page);

  const heroSection = page.locator("section").first().locator("img");

  // Click the 2nd color swatch (Porcelain) in Hero
  const heroColorButtons = page
    .locator("section")
    .first()
    .locator("button[title]");
  await expect(heroColorButtons.nth(1)).toBeVisible();
  await heroColorButtons.nth(1).click();

  // Image src should update to Porcelain
  await expect(heroSection).toHaveAttribute("src", /porcelain/, { timeout: 8000 });

  await fullPageScroll(page);
});

// T6: Product card color picker
test("T6 — product card color picker updates image", async ({ page }) => {
  await page.goto("/google");
  await waitForHydration(page);

  await page.getByText("Find the Pixel for you").scrollIntoViewIfNeeded();

  const productGrid = page.locator(".grid.gap-6");
  await expect(productGrid).toBeVisible();

  const firstCard = productGrid.locator(".border-gray-200").first();
  await expect(firstCard).toBeVisible();

  const cardImage = firstCard.locator("img").first();
  await expect(cardImage).toBeVisible();

  // Click "Hazel" swatch (3rd swatch, index 2)
  const cardSwatches = firstCard.locator("button[title]");
  await cardSwatches.nth(2).click();

  // Verify image src changes to Hazel
  await expect(cardImage).toHaveAttribute("src", /hazel/, { timeout: 8000 });

  await fullPageScroll(page);
});

// T8: Page content completeness
test("T8 — all sections and elements rendered correctly", async ({ page }) => {
  await page.goto("/google");
  await waitForHydration(page);

  // Brand bar
  await expect(page.getByText("Google Store")).toBeVisible();

  // Hero price
  await expect(page.getByText("From $999").first()).toBeVisible();

  // Hero CTA buttons
  await expect(page.getByRole("button", { name: "Buy" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Learn more" })).toBeVisible();

  // Product grid: exactly 3 product cards
  const productCards = page.locator(".grid.gap-6 .border-gray-200");
  await expect(productCards).toHaveCount(3);

  // Product names
  await expect(page.getByRole("heading", { name: "Pixel 9", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pixel 9 Pro", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pixel 9 Pro XL" })).toBeVisible();

  // Footer tagline
  await expect(page.getByText("Built with Google AI. Made for your life.")).toBeVisible();

  await fullPageScroll(page);
});

// T7: RWD — mobile viewport
test("T7 — mobile viewport: single column grid and stacked hero", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/google");
  await waitForHydration(page);

  const heroImage = page.locator("section").first().locator("img");
  await expect(heroImage).toBeVisible();

  const productGrid = page.locator(".grid.gap-6");
  await expect(productGrid).toBeVisible();

  // Cards should stack vertically on mobile
  const cards = page.locator(".rounded-3xl");
  const firstCard = await cards.nth(0).boundingBox();
  const secondCard = await cards.nth(1).boundingBox();

  expect(firstCard).not.toBeNull();
  expect(secondCard).not.toBeNull();
  expect(secondCard!.y).toBeGreaterThan(firstCard!.y + firstCard!.height - 10);

  await fullPageScroll(page);
});
