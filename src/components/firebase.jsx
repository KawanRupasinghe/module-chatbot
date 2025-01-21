import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChdSZ-VIOC3_3P5Gjy2GTqU5R5owhMha4",
  authDomain: "module-chatbot.firebaseapp.com",
  projectId: "module-chatbot",
  storageBucket: "module-chatbot.firebasestorage.app",
  messagingSenderId: "812959485715",
  appId: "1:812959485715:web:cf575a914ad656216814e6",
  measurementId: "G-JMXYLYERVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Return the user object for further use
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

export { auth, provider };
