const { chromium } = require('playwright');
const config = require('./config');
const { saveFile } = require('./utils/fileHelpers');
const selectors = require('./selectors/searchConsoleSelectors');

async function run() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ acceptDownloads: true, viewport: null });
  const page = await context.newPage();

  try {
    await page.goto('https://search.google.com/search-console');
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await page.click(selectors.propertySelector);

    for (const country of config.countries) {
      console.log(`Processing comparison data for ${country}...`);
      await page.click(selectors.performanceTab);
      await page.click(selectors.filterButton);
      await page.click(selectors.countryFilter);
      await page.fill(selectors.countryInput, country);
      await page.click(selectors.countryDropdownItem);
      await page.click(selectors.applyFilterButton);
      await page.click(selectors.dateSelector);
      await page.click(selectors.compareDatesOption);
      await page.fill(selectors.currentPeriodStartDate, config.currentPeriod.start);
      await page.fill(selectors.currentPeriodEndDate, config.currentPeriod.end);
      await page.fill(selectors.comparisonPeriodStartDate, config.comparisonPeriod.start);
      await page.fill(selectors.comparisonPeriodEndDate, config.comparisonPeriod.end);
      await page.click(selectors.applyDateButton);
      await page.waitForSelector(selectors.dataLoadedIndicator);

      const downloadPromise = page.waitForEvent('download');
      await page.click(selectors.exportButton);
      await page.click(selectors.downloadOption);
      const download = await downloadPromise;
      await saveFile(download, country, config.comparisonPeriod.start, config.currentPeriod.end);
    }

    console.log('All country comparisons processed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

run();