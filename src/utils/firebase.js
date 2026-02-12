// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyDQoeGUjDVY-CIp5hE04b9uZ5cIPnzF6CU",
  authDomain: "netflixgpt-1a6c4.firebaseapp.com",
  projectId: "netflixgpt-1a6c4",
  storageBucket: "netflixgpt-1a6c4.firebasestorage.app",
  messagingSenderId: "580170212713",
  appId: "1:580170212713:web:dda37c115faaa06a3109f8",
  measurementId: "G-2XZTGP9RGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);      // ✅ pass app
export const db = getFirestore(app);  // ✅ ADD THIS

// Optional (avoid analytics error in dev mode)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
