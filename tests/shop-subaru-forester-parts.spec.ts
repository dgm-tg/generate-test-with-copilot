import { test, expect } from '@playwright/test';

test('Search and view Subaru Forester parts on wheelership.com', async ({
  page,
}) => {
  // Step 1: Navigate to wheelership.com
  await test.step('Navigate to wheelership.com', async () => {
    await page.goto('https://www.wheelership.com/');
    await expect(page).toHaveTitle(/The WheelerShip Online Store/);
  });

  // Step 2: Search for parts for a 2009 Subaru Forester
  await test.step('Search for 2009 Subaru Forester parts', async () => {
    // Click the Make dropdown and select Subaru
    await page.getByRole('button', { name: 'Make' }).click();
    await page.getByText('Subaru').click();

    // Click the Model dropdown and select Forester
    await page.getByRole('button', { name: 'Model' }).click();
    await page.getByText('Forester').click();

    // Click the Year dropdown and select 2009
    await page.getByRole('button', { name: 'Year' }).click();
    await page.getByText('2009').click();

    // Click the Search button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify search results page loaded with correct vehicle
    await expect(page).toHaveURL(/make-subaru-model-forester-year-2009/);
    await expect(
      page.locator('text=Compatible with your "Subaru Forester 2009"')
    ).toBeVisible();
  });

  // Step 3: Click on the first product
  await test.step('Click on the first product', async () => {
    // Click on the first product - Pirelli PZero All Season 235/45R18
    await page
      .locator('a')
      .filter({ hasText: 'Pirelli PZero All Season 235/45R18' })
      .first()
      .click();

    // Verify product page loaded correctly
    await expect(page).toHaveTitle('Pirelli PZero All Season 235/45R18');
    await expect(
      page.locator('h1:has-text("Pirelli PZero All Season 235/45R18")')
    ).toBeVisible();
    await expect(page.locator('text=In stock')).toBeVisible();
    await expect(page.locator('text=$239.94')).toBeVisible();
  });
});
