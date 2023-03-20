// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcmWNmYKMeWfIhWjQkDJ3g_xvXhKuUy2I",
  authDomain: "midterm-users.firebaseapp.com",
  projectId: "midterm-users",
  storageBucket: "midterm-users.appspot.com",
  messagingSenderId: "102038874725",
  appId: "1:102038874725:web:a113bf692097172158348c",
  measurementId: "G-HEF9HQYVN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db };
export { auth };