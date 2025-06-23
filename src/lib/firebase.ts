import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// Firebase configuration - using direct values for cPanel deployment
const firebaseConfig = {
  apiKey: "AIzaSyAKAW0nAicwoObIaFJ4RrUbsunmmqLzq9U",
  authDomain: "weforward-blogpage.firebaseapp.com",
  projectId: "weforward-blogpage",
  storageBucket: "weforward-blogpage.firebasestorage.app",
  messagingSenderId: "429074555361",
  appId: "1:429074555361:web:e4c8f52a5d7acc05aeb2a0"
};

// Skip environment variable validation for cPanel deployment
// Configuration is now hardcoded above

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
