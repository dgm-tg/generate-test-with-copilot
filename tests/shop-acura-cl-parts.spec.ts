import { test, expect } from '@playwright/test';

test('Shop for parts for a 1997 Acura CL', async ({ page }) => {
  // Step 1: Go to https://www.wheelership.com/
  await test.step('Navigate to wheelership.com', async () => {
    await page.goto('https://www.wheelership.com/');
    await expect(page).toHaveTitle(/WheelerShip/);
  });

  // Step 2: Shop for parts for a 1997 Acura CL
  await test.step('Select vehicle: 1997 Acura CL', async () => {
    // Click the Make dropdown
    await page.getByRole('button', { name: 'Make' }).click();

    // Select Acura from the dropdown
    await page.getByText('Acura', { exact: true }).click();

    // Click the Model dropdown
    await page.getByRole('button', { name: 'Model' }).click();

    // Select CL from the dropdown
    await page.getByText('CL', { exact: true }).click();

    // Click the Year dropdown
    await page.getByRole('button', { name: 'Year' }).click();

    // Select 1997 from the dropdown
    await page.getByText('1997', { exact: true }).click();

    // Click the Search button
    await page.getByRole('button', { name: 'Search' }).click();

    // Verify we're on the results page for the 1997 Acura CL
    await expect(page).toHaveURL(/make-acura-model-cl-year-1997/);
    await expect(
      page.locator('text=Compatible with your "Acura CL 1997"')
    ).toBeVisible();
  });

  // Step 3: Click on the first product
  await test.step('Click on the first product', async () => {
    // Click the first product (Chrome Lug Nuts)
    await page
      .getByRole('link', {
        name: 'Chrome Lug Nuts for Honda/Acura Wheel 90304-SA5-013 (20 pcs)',
      })
      .first()
      .click();

    // Verify we're on the product page
    await expect(page).toHaveURL(
      /chrome-lug-nuts-for-honda-acura-wheel-90304-sa5-013-20-pcs\.html/
    );
    await expect(
      page.getByRole('heading', {
        name: 'Chrome Lug Nuts for Honda/Acura Wheel 90304-SA5-013 (20 pcs)',
      })
    ).toBeVisible();
  });
});
