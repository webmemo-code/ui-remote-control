// This file contains utility functions for file operations, such as saving downloaded files and managing file paths.

const path = require('path');
const fs = require('fs');

const fileHelpers = {
  saveFile: async (download, country, comparisonPeriod, currentPeriod) => {
    const fileName = `${country}_comparison_${comparisonPeriod.start}_${currentPeriod.end}.csv`;
    const filePath = path.join(__dirname, '../../data', fileName);
    await download.saveAs(filePath);
    return filePath;
  },

  ensureDirectoryExists: (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
};

module.exports = fileHelpers;