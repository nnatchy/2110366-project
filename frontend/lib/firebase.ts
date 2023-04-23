import { initializeApp } from "firebase/app"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-FnzyPwIoq2re2vbgvYtoWfyER1Po7SY",
    authDomain: "embed-toilet.firebaseapp.com",
    projectId: "embed-toilet",
    storageBucket: "embed-toilet.appspot.com",
    messagingSenderId: "664582119012",
    appId: "1:664582119012:web:c827cd0171d65ca80a8971",
    measurementId: "G-F53MT6J58E"
  };

const app = initializeApp(firebaseConfig);
export default app;