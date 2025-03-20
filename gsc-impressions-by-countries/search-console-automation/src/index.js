const { chromium } = require('@playwright/test');
const config = require('./config');
const { saveFile } = require('./utils/fileHelpers');
const selectors = require('./selectors/searchConsoleSelectors');
const fs = require('fs');
const path = require('path');

// Ensure screenshots directory exists
const screenshotsDir = path.join(__dirname, '../screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Increased delay for better visibility and reliability
  });
  const context = await browser.newContext({ 
    acceptDownloads: true, 
    viewport: null
  });
  const page = await context.newPage();

  try {
    // Manually navigate to Google Search Console and select property
    await page.goto('https://search.google.com/search-console/performance/search-analytics');
    console.log('Please select the correct property and navigate to the Performance page');
    
    // Wait for user to manually configure initial view
    console.log('Waiting 60 seconds for manual setup...');
    await new Promise(resolve => setTimeout(resolve, 60000)); // 60 second delay for manual setup
    console.log('Continuing with automation...');
    
    // Take a screenshot of the initial state for debugging
    await page.screenshot({ path: path.join(screenshotsDir, 'initial-state.png') });
    
    for (const country of config.countries) {
      console.log(`Processing data for ${country}...`);
      
      try {
        // Apply country filter using a more reliable approach
        console.log('Clicking Add filter button...');
        await page.click(selectors.filterButton);
        
        // Wait for dimension dropdown to appear
        console.log('Waiting for dimension dropdown...');
        await page.waitForSelector(selectors.dimensionDropdown, { state: 'visible', timeout: 10000 });
        await page.screenshot({ path: path.join(screenshotsDir, `${country}-dimension-dropdown.png`) });
        
        // Click dimension dropdown
        console.log('Clicking dimension dropdown...');
        await page.click(selectors.dimensionDropdown);
        
        // Wait for country option to appear
        console.log('Waiting for Country option...');
        await page.waitForSelector(selectors.countryOption, { state: 'visible', timeout: 10000 });
        await page.screenshot({ path: path.join(screenshotsDir, `${country}-country-option.png`) });
        
        // Click country option
        console.log('Clicking Country option...');
        await page.click(selectors.countryOption);
        
        // Wait for country search input
        console.log('Waiting for country search input...');
        await page.waitForSelector(selectors.countrySearchInput, { state: 'visible', timeout: 10000 });
        
        // Type country name
        console.log(`Typing country name: ${country}...`);
        await page.fill(selectors.countrySearchInput, country);
        
        // Wait for country list item to appear
        console.log(`Waiting for ${country} in list...`);
        await page.waitForSelector(selectors.countryListItem(country), { state: 'visible', timeout: 10000 });
        await page.screenshot({ path: path.join(screenshotsDir, `${country}-in-list.png`) });
        
        // Click country in list
        console.log(`Clicking ${country} in list...`);
        await page.click(selectors.countryListItem(country));
        
        // Click apply button
        console.log('Clicking Apply button...');
        await page.click(selectors.applyFilterButton);
        
        // Wait for data to load with new filter
        console.log('Waiting for data to load...');
        await page.waitForSelector(selectors.dataLoadedIndicator, { state: 'visible', timeout: 20000 });
        await page.screenshot({ path: path.join(screenshotsDir, `${country}-data-loaded.png`) });
        
        // TODO: Add date range setting and export functionality here
        
        // Log success
        console.log(`Successfully processed ${country}`);
      } catch (error) {
        console.error(`Error processing ${country}: ${error.message}`);
        // Save error details to a log file
        fs.appendFileSync(path.join(__dirname, '../error-log.txt'), 
          `Error processing ${country} at ${new Date().toISOString()}: ${error.message}\n${error.stack}\n\n`);
        
        // Take screenshot of error state
        try {
          await page.screenshot({ path: path.join(screenshotsDir, `${country}-error.png`) });
        } catch (screenshotError) {
          console.error('Could not take error screenshot:', screenshotError.message);
        }
        
        // Refresh the page to reset the state for the next country
        try {
          await page.reload();
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for page to load
        } catch (reloadError) {
          console.error('Could not reload page:', reloadError.message);
        }
        
        // Continue with next country
        continue;
      }
    }

    console.log('All country data processed successfully!');
  } catch (error) {
    console.error('A critical error occurred:', error);
    // Take a final screenshot of the error state
    try {
      await page.screenshot({ path: path.join(screenshotsDir, 'critical-error.png') });
    } catch (screenshotError) {
      console.error('Could not take error screenshot:', screenshotError.message);
    }
  } finally {
    // Ensure browser is closed
    await context.close();
    await browser.close();
  }
}

run();