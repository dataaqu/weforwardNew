// API configuration utility
// This file helps you safely access environment variables

export const config = {
  // API Keys - these will be undefined if not set
  apiKey: import.meta.env.VITE_API_KEY,
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
  // Helper function to check if required environment variables are set
  validateConfig() {
    const missing = [];
    
    if (!this.apiKey) missing.push('VITE_API_KEY');
    if (!this.openaiApiKey) missing.push('VITE_OPENAI_API_KEY');
    if (!this.firebaseApiKey) missing.push('VITE_FIREBASE_API_KEY');
    
    if (missing.length > 0) {
      console.warn('Missing environment variables:', missing.join(', '));
      console.warn('Please check your .env.local file');
    }
    
    return missing.length === 0;
  }
};

// Usage example:
// import { config } from './config/env';
// const apiKey = config.apiKey;
// config.validateConfig(); // Check if all required env vars are set
