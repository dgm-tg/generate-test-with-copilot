# Generating files with Playwright

This project demonstrates how to use GitHub Copilot to generate Playwright test files for various testing scenarios.

## Getting Started

### Prerequisites

1. Make sure you have the Playwright Test for VS Code extension installed

   - Open VS Code Extensions panel (Ctrl+Shift+X or Cmd+Shift+X on Mac)
   - Search for "Playwright Test"
   - Click Install on the extension by Microsoft

2. Clone this repository

   ```bash
   git clone https://github.com/your-username/generate-test-with-copilot.git
   cd generate-test-with-copilot
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Make sure the server is running. You can press start in the server in the .vscode/settings.json file

5. Generate tests using GitHub Copilot (see examples below)

6. Run the tests
   ```bash
   npx playwright test
   ```

## Types of Generators with Examples

### Basic Page Navigation and Verification

```md
Generate a Playwright test for the following scenario:

1. Navigate to https://debs-obrien.github.io/playwright-movies-app
2. search for 'Garfield'
3. verify the movie is in the list
```

### Screenshot Tests

```md
Generate a Playwright test for the following scenario:

1. Navigate to https://playwright.dev
2. Take a screenshot of the homepage
3. Verify the screenshot was created
```

### E-commerce Site Navigation

```md
Generate a Playwright test for the following scenario:

1. Navigate to an auto parts website
2. Search for parts for a specific car model (e.g., "Subaru Forester")
3. Verify search results contain relevant parts
4. Add an item to cart
5. Verify the item is in the cart
```

### A/B Testing Validation

```md
Generate a Playwright test for the following scenario:

1. Navigate to a website with A/B testing
2. Verify the presence of specific UI elements (like buttons or CTAs)
3. Compare these elements against expected variations
4. Take screenshots for visual comparison
```

### Heatmap Analysis

```md
Generate a Playwright test that:

1. Navigates to a website
2. Takes screenshots
3. Generates a heatmap overlay based on click data
4. Outputs an HTML report with analysis
```

## Credit

This project is cloned from [Debbie O'Brien's generate-test-with-copilot](https://github.com/debs-obrien/generate-test-with-copilot) repository.

Debbie O'Brien is a Developer Advocate at GitHub and renowned expert in frontend development and testing. Her tutorials and examples on using GitHub Copilot for test generation have been invaluable to the testing community. Check out her [GitHub profile](https://github.com/debs-obrien) and [website](https://debbie.codes/) for more excellent resources.
