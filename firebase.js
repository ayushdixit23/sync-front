// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTMtIZQbpdqkv2zN7y8bUin300At7Zlv4",
  authDomain: "nexoo-d1801.firebaseapp.com",
  projectId: "nexoo-d1801",
  storageBucket: "nexoo-d1801.appspot.com",
  messagingSenderId: "721184821804",
  appId: "1:721184821804:web:6c86a0ce4ef04a13dcf789",
  measurementId: "G-29KCSJ8N66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
