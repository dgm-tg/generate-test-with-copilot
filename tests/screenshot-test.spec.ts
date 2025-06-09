import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('test screenshot functionality', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://playwright.dev');

  // Create screenshots directory if it doesn't exist
  const screenshotDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Take a screenshot and save it to the screenshots directory
  const screenshotPath = path.join(screenshotDir, 'playwright-website.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // Verify the screenshot was saved
  expect(fs.existsSync(screenshotPath)).toBeTruthy();

  console.log(`Screenshot saved to: ${screenshotPath}`);
});
