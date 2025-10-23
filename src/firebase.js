// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeR5cUgLESl7gmWxC2IbZndZmuYDf4SA0",
  authDomain: "ayala-testings.firebaseapp.com",
  databaseURL: "https://ayala-testings-default-rtdb.firebaseio.com",
  projectId: "ayala-testings",
  storageBucket: "ayala-testings.firebasestorage.app",
  messagingSenderId: "1010283401705",
  appId: "1:1010283401705:web:a4b0823068186e500dfb78"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // For Firestore (clients and users profiles)
const rtdb = getDatabase(app); // For Realtime Database (chat messages)
const analytics = getAnalytics(app);

export { app, auth, db, rtdb };