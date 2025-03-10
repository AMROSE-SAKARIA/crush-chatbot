// utils/helpers.js

/**
 * Format a timestamp to a human-readable date/time
 * @param {string} timestamp - ISO string timestamp
 * @param {boolean} includeDate - Whether to include the date in the output
 * @returns {string} Formatted date/time
 */
export const formatTimestamp = (timestamp, includeDate = false) => {
    const date = new Date(timestamp);
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    };
    
    if (includeDate) {
      options.month = 'short';
      options.day = 'numeric';
    }
    
    return date.toLocaleString('en-US', options);
  };
  
  /**
   * Generate a random ID for elements that need unique identifiers
   * @returns {string} Random ID
   */
  export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
  
  /**
   * Debounce function to limit how often a function can be called
   * @param {Function} func - The function to debounce
   * @param {number} wait - The time to wait in milliseconds
   * @returns {Function} Debounced function
   */
  export const debounce = (func, wait) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Get a random item from an array
   * @param {Array} array - The array to select from
   * @returns {*} A random item from the array
   */
  export const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  /**
   * Check if a string is empty or just contains whitespace
   * @param {string} str - The string to check
   * @returns {boolean} True if the string is empty or just whitespace
   */
  export const isEmptyString = (str) => {
    return !str || str.trim() === '';
  };
  
  /**
   * Truncate a string to a specific length and add ellipsis
   * @param {string} str - The string to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} Truncated string
   */
  export const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };
  
  /**
   * Wait for a specified time
   * @param {number} ms - Time to wait in milliseconds
   * @returns {Promise} Promise that resolves after the specified time
   */
  export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };