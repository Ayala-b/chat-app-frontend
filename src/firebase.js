// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXjMUqyL-ntgzTfmSjpCTzRHkpt90JHK4",
  authDomain: "chatapp-f3bc9.firebaseapp.com",
  projectId: "chatapp-f3bc9",
  storageBucket: "chatapp-f3bc9.firebasestorage.app",
  messagingSenderId: "623370905413",
  appId: "1:623370905413:web:fbc7d527a3c8c35030802c",
  measurementId: "G-1QYLK1TFV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // For Firestore (clients and users profiles)
const rtdb = getDatabase(app); // For Realtime Database (chat messages)
const analytics = getAnalytics(app);

export { app, auth, db, rtdb };