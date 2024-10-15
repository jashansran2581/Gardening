import { getApp, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for the primary Firestore instance
const firebaseConfig = {
  apiKey: "AIzaSyAtAIsj6tCBHget5ghMIIAfYYaGtZTmc60",
  authDomain: "booking-project-a4de9.firebaseapp.com",
  projectId: "booking-project-a4de9",
  storageBucket: "booking-project-a4de9.appspot.com",
  messagingSenderId: "745901751173",
  appId: "1:745901751173:web:ace08f086b8b694da722ec",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);   // For login and all Firestore operations

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Function to sign in with Google popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Export the auth and Firestore instance for use in your application
export { auth, db };