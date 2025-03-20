const countries = ['United States', 'United Kingdom', 'Germany', 'Brazil', 'India', 'South Korea', 'Canada', 'Australia'];
const datePeriod = { start: '2023-12-01', end: '2025-03-02' };

// Define the dimensions to export
const dimensions = {
  country: true,     // Keep country dimension
  query: true,       // Add search terms/queries
  page: true         // Add pages dimension
};

// Define metrics to collect for each dimension
const metrics = {
  clicks: true,
  impressions: true
};

module.exports = {
  countries,
  datePeriod,
  dimensions,
  metrics
};