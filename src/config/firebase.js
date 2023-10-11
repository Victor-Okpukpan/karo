// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR3TgyMJ690HgO-fUHdfWFVvloOfpcSDs",
  authDomain: "expense-tracker-674d0.firebaseapp.com",
  projectId: "expense-tracker-674d0",
  storageBucket: "expense-tracker-674d0.appspot.com",
  messagingSenderId: "1056350412725",
  appId: "1:1056350412725:web:3f9f2d5af96934e2edc3fc",
  measurementId: "G-LLV3J9YH3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)