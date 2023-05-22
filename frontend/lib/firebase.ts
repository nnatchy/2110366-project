import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-FnzyPwIoq2re2vbgvYtoWfyER1Po7SY",
  authDomain: "embed-toilet.firebaseapp.com",
  databaseURL: "https://embed-toilet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "embed-toilet",
  storageBucket: "embed-toilet.appspot.com",
  messagingSenderId: "664582119012",
  appId: "1:664582119012:web:c827cd0171d65ca80a8971",
  measurementId: "G-F53MT6J58E"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
