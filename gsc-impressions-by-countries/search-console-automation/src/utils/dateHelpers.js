// This file exports utility functions for handling date formatting and validation.

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-CA', options);
}

function validateDate(date) {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function getDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];
    for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        dateArray.push(new Date(dt).toISOString().split('T')[0]);
    }
    return dateArray;
}

module.exports = {
    formatDate,
    validateDate,
    getCurrentDate,
    getDateRange
};