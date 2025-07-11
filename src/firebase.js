import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJFn9rBUAGEaUnGwaeN-heyqUNh9yEnr8",
  authDomain: "finance-tracker-2a51b.firebaseapp.com",
  projectId: "finance-tracker-2a51b",
  storageBucket: "finance-tracker-2a51b.firebasestorage.app",
  messagingSenderId: "649706667693",
  appId: "1:649706667693:web:dc23ca6d24a4af51e51024",
  measurementId: "G-47KCGZE8D4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 