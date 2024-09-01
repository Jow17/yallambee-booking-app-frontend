import '@testing-library/jest-dom';

// Mocking ResizeObserver
global.ResizeObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
  
    observe() {
      // Mock implementation of observe method
    }
  
    unobserve() {
      // Mock implementation of unobserve method
    }
  
    disconnect() {
      // Mock implementation of disconnect method
    }
  };
  
  // Add any other global setups you need here
  
  
