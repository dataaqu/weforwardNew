// API configuration utility
// This file helps you safely access environment variables

export const config = {
  // Firebase Configuration
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
  
  // EmailJS Configuration
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },
  
  // Application Environment
  nodeEnv: import.meta.env.NODE_ENV,
  
  // Helper function to check if required environment variables are set
  validateConfig() {
    const missing = [];
    
    // Check Firebase config
    if (!this.firebase.apiKey) missing.push('VITE_FIREBASE_API_KEY');
    if (!this.firebase.authDomain) missing.push('VITE_FIREBASE_AUTH_DOMAIN');
    if (!this.firebase.projectId) missing.push('VITE_FIREBASE_PROJECT_ID');
    if (!this.firebase.storageBucket) missing.push('VITE_FIREBASE_STORAGE_BUCKET');
    if (!this.firebase.messagingSenderId) missing.push('VITE_FIREBASE_MESSAGING_SENDER_ID');
    if (!this.firebase.appId) missing.push('VITE_FIREBASE_APP_ID');
    
    // Check EmailJS config
    if (!this.emailjs.serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
    if (!this.emailjs.templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');
    if (!this.emailjs.publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
    
    if (missing.length > 0) {
      console.warn('Missing environment variables:', missing.join(', '));
      console.warn('Please check your .env.local file');
    }
    
    return missing.length === 0;
  }
};

// Usage example:
// import { config } from './config/env';
// const firebaseConfig = config.firebase;
// config.validateConfig(); // Check if all required env vars are set
