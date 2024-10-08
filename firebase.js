import { getApp, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object containing the project's Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyAtAIsj6tCBHget5ghMIIAfYYaGtZTmc60",
  authDomain: "booking-project-a4de9.firebaseapp.com",
  projectId: "booking-project-a4de9",
  storageBucket: "booking-project-a4de9.appspot.com",
  messagingSenderId: "745901751173",
  appId: "1:745901751173:web:ace08f086b8b694da722ec"
};

// Initialize Firebase app  
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore();

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
  prompt: "select_account"
});

// Function to sign in with Google popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Export the auth and db instances for use in your application
export { auth, db };
