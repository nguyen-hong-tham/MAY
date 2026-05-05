// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP3mW3HWqtX3kspZ_IP-nt2l7kgtNZKJI",
  authDomain: "project-may-82c39.firebaseapp.com",
  projectId: "project-may-82c39",
  storageBucket: "project-may-82c39.firebasestorage.app",
  messagingSenderId: "994468818472",
  appId: "1:994468818472:web:96040cdb189118f7cf8f1d",
  measurementId: "G-B7278F3SZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);