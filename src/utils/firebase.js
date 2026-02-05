// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
export const auth = getAuth();