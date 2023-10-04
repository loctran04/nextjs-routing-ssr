// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-t5o49skHkxhVAIwUyA98eTd4TDT8VHg",
    authDomain: "nextjs-practice-8f538.firebaseapp.com",
    databaseURL:
        "https://nextjs-practice-8f538-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nextjs-practice-8f538",
    storageBucket: "nextjs-practice-8f538.appspot.com",
    messagingSenderId: "906297322987",
    appId: "1:906297322987:web:2274c3fdb9fcd2555afdae",
};

// Initialize Firebase
let firebase_app =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
