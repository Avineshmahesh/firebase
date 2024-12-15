// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHqTUXnGEBz3xTdRyMXqeD-W2-sydTQoM",
  authDomain: "fir-demo-e2508.firebaseapp.com",
  projectId: "fir-demo-e2508",
  storageBucket: "fir-demo-e2508.firebasestorage.app",
  messagingSenderId: "195341808949",
  appId: "1:195341808949:web:b216151bb9512784ae487c",
  measurementId: "G-7P442XCJJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);