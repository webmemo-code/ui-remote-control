const { chromium } = require('playwright');

// List of countries to process
const countries = ['United States', 'United Kingdom', 'Germany', 'Brazil', 'India', 'South Korea', 'Canada', 'Australia']
// Define date ranges for comparison
const currentPeriod = { start: '2024-07-01', end: '2025-01-31' };
const comparisonPeriod = { start: '2023-12-01', end: '2024-06-30' };

async function run() {
  // Launch the browser
  const browser = await chromium.launch({
    headless: false
  });
  
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: null
  });
  
  const page = await context.newPage();
  
  try {
    // Login to Google Search Console
    await page.goto('https://search.google.com/search-console');
    
    // Wait for login - you'll need to manually log in the first time
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    
    // Select your property (adjust selectors as needed)
    await page.click('your-property-selector');
    
    // Process each country
    for (const country of countries) {
      console.log(`Processing comparison data for ${country}...`);
      
      // Navigate to Performance section
      await page.click('performance-tab-selector');
      
      // Open filter menu
      await page.click('filter-button-selector');
      
      // Select Country filter
      await page.click('country-filter-selector');
      
      // Type and select the country
      await page.fill('country-input-selector', country);
      await page.click('country-dropdown-item-selector');
      
      // Apply filter
      await page.click('apply-filter-button-selector');
      
      // Enable date comparison mode
      await page.click('date-selector');
      await page.click('compare-dates-option'); // Click the checkbox or option to enable comparison
      
      // Set current period dates
      await page.fill('current-period-start-date', currentPeriod.start);
      await page.fill('current-period-end-date', currentPeriod.end);
      
      // Set comparison period dates
      await page.fill('comparison-period-start-date', comparisonPeriod.start);
      await page.fill('comparison-period-end-date', comparisonPeriod.end);
      
      // Apply date settings
      await page.click('apply-date-button');
      
      // Wait for data to load
      await page.waitForSelector('data-loaded-indicator');
      
      // Export data with automatic download handling
      const downloadPromise = page.waitForEvent('download');
      await page.click('export-button-selector');
      await page.click('download-option');
      
      const download = await downloadPromise;
      // Save file with country name and comparison information
      await download.saveAs(`./data/${country}_comparison_${comparisonPeriod.start}_${currentPeriod.end}.csv`);
    }
    
    console.log('All country comparisons processed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

run();
