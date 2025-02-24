// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d7349.firebaseapp.com",
  projectId: "mern-blog-d7349",
  storageBucket: "mern-blog-d7349.firebasestorage.app",
  messagingSenderId: "674276962919",
  appId: "1:674276962919:web:89f3b35362a928d6d51ac2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);