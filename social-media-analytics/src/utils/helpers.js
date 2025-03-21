// src/utils/helpers.js

// Function to sort data efficiently
export const sortByProperty = (array, propertyName, order = 'desc') => {
    const multiplier = order === 'desc' ? -1 : 1;
    
    return [...array].sort((a, b) => {
      if (a[propertyName] < b[propertyName]) return -1 * multiplier;
      if (a[propertyName] > b[propertyName]) return 1 * multiplier;
      return 0;
    });
  };
  
  // Debounce function to limit API calls
  export const debounce = (func, delay) => {
    let timeoutId;
    
    return function(...args) {
      const context = this;
      
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  
  // Format date for display
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec ago`;
    }
    
    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    }
    
    if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    }
    
    // If more than a day, return the actual date
    return date.toLocaleDateString();
  };
  
  // Find highest count from array of objects
  export const findMaxValueByProperty = (array, propertyName) => {
    if (!array || array.length === 0) return 0;
    
    return array.reduce((max, item) => {
      return item[propertyName] > max ? item[propertyName] : max;
    }, array[0][propertyName]);
  };