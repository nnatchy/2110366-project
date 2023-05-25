import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjTQqJn3NN7HUP_YCinIrmMtKO_upEsac",
  authDomain: "watering-plant-2c69b.firebaseapp.com",
  databaseURL: "https://watering-plant-2c69b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "watering-plant-2c69b",
  storageBucket: "watering-plant-2c69b.appspot.com",
  messagingSenderId: "502833181522",
  appId: "1:502833181522:web:64f122e75b2ad51b8d008b",
  measurementId: "G-6Z6RHPV86X"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
