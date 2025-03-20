# Project Title: Search Console Automation

## Overview
This project automates the process of extracting impression data from Google Search Console for multiple countries. It utilizes Playwright to handle browser interactions, allowing for efficient data retrieval and comparison over specified date ranges.

## Features
- Automated login to Google Search Console.
- Ability to filter data by country.
- Date comparison functionality for impressions.
- Export of data to CSV files for each country.

## Project Structure
```
search-console-automation
├── src
│   ├── index.js               # Main entry point for the application
│   ├── config.js              # Configuration settings (countries and date ranges)
│   ├── utils
│   │   ├── dateHelpers.js     # Utility functions for date handling
│   │   └── fileHelpers.js     # Utility functions for file operations
│   └── selectors
│       └── searchConsoleSelectors.js # CSS selectors for Google Search Console UI
├── data
│   └── .gitkeep               # Keeps the data directory tracked by Git
├── package.json               # npm configuration file
├── playwright.config.js       # Playwright configuration settings
├── .gitignore                 # Files and directories to ignore by Git
└── README.md                  # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd search-console-automation
   ```

2. Install the required dependencies:
   ```bash
   npm install playwright
   npm install csv-parser
   npm install fs-extra
   npm install dotenv
   ```

   3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

   4. Create a `.env` file in the root directory and add your Google credentials:
   ```
   GOOGLE_EMAIL=your-email@gmail.com
   GOOGLE_PASSWORD=your-password
   ```

## Usage
1. Open `src/config.js` to configure the list of countries and date ranges for comparison.
2. Run the automation script:
   ```
   node src/index.js
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.