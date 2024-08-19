// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxnD9cU1s2W5nlPF-SSR7Nf2RY-kukrEU",
  authDomain: "travelie-auth.firebaseapp.com",
  projectId: "travelie-auth",
  storageBucket: "travelie-auth.appspot.com",
  messagingSenderId: "307920320613",
  appId: "1:307920320613:web:e23586480abe3645b82e8c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);