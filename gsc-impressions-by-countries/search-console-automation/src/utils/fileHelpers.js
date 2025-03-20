// This file contains utility functions for file operations, such as saving downloaded files and managing file paths.

const path = require('path');
const fs = require('fs');

const fileHelpers = {
  saveFile: async (download, country, dimension, startDate, endDate) => {
    // Format the country name for use in filenames (replace spaces with underscores)
    const formattedCountry = country.replace(/\s+/g, '_');
    
    // Create a filename with the country, dimension and date range
    const fileName = `${formattedCountry}_${dimension}_${startDate}_to_${endDate}.csv`;
    
    // Ensure the data directory exists
    const dataDir = path.join(__dirname, '../../data');
    fileHelpers.ensureDirectoryExists(dataDir);
    
    // Save the file
    const filePath = path.join(dataDir, fileName);
    await download.saveAs(filePath);
    
    console.log(`Saved ${dimension} data for ${country} to: ${fileName}`);
    
    return filePath;
  },

  ensureDirectoryExists: (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  },
  
  // Additional utility function to clean up old files if needed
  clearDirectory: (dirPath) => {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      for (const file of files) {
        fs.unlinkSync(path.join(dirPath, file));
      }
      console.log(`Cleared directory: ${dirPath}`);
    }
  }
};

module.exports = fileHelpers;