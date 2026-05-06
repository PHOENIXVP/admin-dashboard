// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdzAC_J3RU1XmynlWpFq2U0kTlT9yL814",
  authDomain: "aapla-b3a57.firebaseapp.com",
  projectId: "aapla-b3a57",
  storageBucket: "aapla-b3a57.firebasestorage.app",
  messagingSenderId: "358945263510",
  appId: "1:358945263510:web:0adec27a16963fcaf1d7b7",
  measurementId: "G-7QQDEBMWWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);