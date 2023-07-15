// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuLpfY2g7BVr28ZQACDJBX2KC4miG8YMY",
  authDomain: "web-login-7e719.firebaseapp.com",
  projectId: "web-login-7e719",
  storageBucket: "web-login-7e719.appspot.com",
  messagingSenderId: "315085588436",
  appId: "1:315085588436:web:38946779aedc2db12cf841",
  measurementId: "G-2Y7QGWG76L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// CLIENT_ID :87067216265-trch4uob69s4u071r4p8d2s7l188l98b.apps.googleusercontent.com
// CLIENT_secret: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
