// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACZQcv4VwHh1i-unR83H5hFItT1gzvupM",
  authDomain: "home-hero-7cd67.firebaseapp.com",
  projectId: "home-hero-7cd67",
  storageBucket: "home-hero-7cd67.firebasestorage.app",
  messagingSenderId: "442805083851",
  appId: "1:442805083851:web:5f043dfd4b10a044e6c54e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
