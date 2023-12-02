// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw0yh1JG8_Jet-wQnJO9bpKnz2RZ63yrI",
  authDomain: "project3-d9941.firebaseapp.com",
  projectId: "project3-d9941",
  storageBucket: "project3-d9941.appspot.com",
  messagingSenderId: "156721549332",
  appId: "1:156721549332:web:a8e2e321cd2f1c9d491701",
  measurementId: "G-2DX78QXDZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authFirebase = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
