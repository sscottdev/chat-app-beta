// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb0jhCaNOXrUkKYL94J37S7lD4USQZ9y0",
    authDomain: "chat-59f88.firebaseapp.com",
    projectId: "chat-59f88",
    storageBucket: "chat-59f88.appspot.com",
    messagingSenderId: "423725790155",
    appId: "1:423725790155:web:a2f9ef24ade07c52cefc4e",
    measurementId: "G-N9MJW92P3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();