import { test, expect, Page } from '@playwright/test';

const SEARCH_TERM = 'mazda mx-5';
const SEARCH_URL = 'https://www.ebay.com/sch/i.html?_nkw=mazda+mx-5';

async function reloadIfError(page: Page) {
  for (let i = 1; i <= 5; i++) {
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title().catch(() => '');
    if (!/error page/i.test(title)) return;
    console.log(`Error Page | eBay detected, reloading (${i}/5)`);
    await page.waitForTimeout(3000);
    await page.reload();
  }
}
test('Search Mazda MX-5 and open first result', async ({ page }) => {
  await page.goto('https://www.ebay.com/');
  await reloadIfError(page);

  const dialogTitle = page.locator('//*[@id="s0-1-4-6-7-9-0-@dialog-dialog-title"]');
  const dialogButton = page.locator('//*[@id="gh"]/nav/div[2]/div[1]/div[1]/div[2]/div[2]/button');
  const dialogShown = await dialogTitle
    .waitFor({ state: 'visible', timeout: 5000 })
    .then(() => true)
    .catch(() => false);
  if (dialogShown) {
    await dialogButton.click();
  }
  await expect(page).toHaveTitle(/ebay/i);
  const searchBox = page.getByRole('combobox', { name: /search/i }).first();
  await expect(searchBox).toBeVisible();

  await searchBox.fill(SEARCH_TERM);
  await searchBox.press('Enter');
  await page.waitForURL(/\/sch\//, { timeout: 30_000 }).catch(() => {});
  await reloadIfError(page);

  const heading = page.locator('#srp-results-heading, .srp-controls__count-heading').first();
  const headingShown = await heading
    .waitFor({ state: 'visible', timeout: 10_000 })
    .then(() => true)
    .catch(() => false);
  if (!headingShown) {
    await page.goto(SEARCH_URL);
    await reloadIfError(page);
  }
  await expect(page).toHaveURL(/\/sch\//);
  await expect(heading).toBeVisible();
  console.log('Number of search results:', await heading.innerText());
  const items = page.locator('a[href*="/itm/"]:visible:not([href*="/itm/123456"])');
  await expect(items.first()).toBeVisible();
  const itemUrl = await items.first().getAttribute('href');
  await items.first().evaluate((el) => {
    el.removeAttribute('target');
    (el as HTMLAnchorElement).click();
  });
  await page.waitForURL(/\/itm\/\d{6,}/, { timeout: 30_000 });
  await reloadIfError(page);

  if (/error page/i.test(await page.title())) {
    await page.goto(itemUrl!);
    await reloadIfError(page);
  }
  await expect(page).toHaveURL(/\/itm\//);
  await expect(page.locator('h1').first()).toBeVisible();
});