// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoLJzf-KDg07KAGbBSGZ_YIBljgGeI6zY",
  authDomain: "pantry-tracker-techbire.firebaseapp.com",
  projectId: "pantry-tracker-techbire",
  storageBucket: "pantry-tracker-techbire.appspot.com",
  messagingSenderId: "541518585286",
  appId: "1:541518585286:web:be57da7f89a346e115e6c7",
  measurementId: "G-RS8SGCMGL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };