const searchConsoleSelectors = {
  // Filter selectors - updated based on error messages
  filterButton: 'button:has-text("Add filter")', // Keep this selector
  dimensionDropdown: 'button.IrSRuc', // Select the dropdown when it appears after clicking Add filter
  countryOption: '[role="menuitem"]:has-text("Country")', // Select Country from the dropdown
  countrySearchInput: 'input[aria-label="Search"]', // Input field to search for a country
  countryListItem: (countryName) => `[role="option"]:has-text("${countryName}")`, // Select a country from the list
  applyFilterButton: '[jsname="OCpkSd"]', // Apply button by its jsname attribute
  
  // Date selectors - needed for date range selection
  dateSelector: 'button:has-text("Date")', // Date button
  customDateOption: '[role="radio"][value="custom"]', // Custom date radio button by role and value
  startDateInput: 'input[placeholder="YYYY-MM-DD"]:first-of-type', // First date input
  endDateInput: 'input[placeholder="YYYY-MM-DD"]:nth-of-type(2)', // Second date input
  applyDateButton: '[jsname="OCpkSd"]', // Same apply button as above
  
  // Dimension tab selectors - needed for switching between dimensions
  queryDimensionTab: 'button:has-text("Queries")', // Button for Queries tab
  pageDimensionTab: 'button:has-text("Pages")', // Button for Pages tab
  
  // Export selectors - needed for downloading data
  dataLoadedIndicator: 'table', // Table with data loaded
  exportButton: 'button:has-text("Export")', // Export button
  downloadOption: 'button:has-text("Download")', // Download option
};

module.exports = searchConsoleSelectors;