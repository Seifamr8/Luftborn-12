# eBay Web Test Automation (Playwright + TypeScript)

Automated UI test for https://www.ebay.com/ built with Playwright.

## Test flow
1. Navigate to https://www.ebay.com/
2. Verify the home page is displayed
3. Search for `mazda mx-5`
4. Verify the search results are displayed
5. Print the number of search results
6. Open the first search result
7. Verify the item details page is displayed

## Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- Google Chrome installed
- Git

## How to run

1. Clone the repository
   ```bash
   git clone https://github.com/Seifamr8/Luftborn-12.git
   cd Luftborn-12/Task2
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install the Playwright browser
   ```bash
   npx playwright install chromium
   ```

4. Run the test
   ```bash
   npx playwright test
   ```

The browser opens and the number of results is printed in the terminal, for example:
```
Number of search results: 11,000+ results for mazda mx-5
```

## Project structure
```
.github/workflows/      GitHub Actions workflow
tests/                  Playwright test spec (luftborn.spec.ts)
videos/                 Recorded video of the test run
playwright.config.ts    Playwright settings
package.json            Dependencies and scripts
```

## Video
- Recorded run: see the `videos/` folder
