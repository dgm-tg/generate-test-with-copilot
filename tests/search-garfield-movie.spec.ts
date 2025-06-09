import { test, expect } from '@playwright/test';

test.describe('Movie search functionality', () => {
  test('Search for Garfield movie', async ({ page }) => {
    // Step 1: Navigate to the movies app website
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');

    // Step 2: Click on the search icon
    await page.getByRole('search').click();

    // Step 3: Type "Garfield" in the search input and submit
    await page.getByRole('textbox', { name: 'Search Input' }).fill('Garfield');
    await page.getByRole('textbox', { name: 'Search Input' }).press('Enter');

    // Step 4: Verify the movie is in the search results
    await expect(page).toHaveTitle('Garfield - Search Results');
    await expect(
      page.getByRole('heading', { name: 'The Garfield Movie', level: 2 })
    ).toBeVisible();

    // Additional verification: Check that we're on the correct search results URL
    const url = page.url();
    expect(url).toContain('searchTerm=Garfield');
  });
});
