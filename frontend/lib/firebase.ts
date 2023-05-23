import { initializeApp } from "firebase/app"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjTQqJn3NN7HUP_YCinIrmMtKO_upEsac",
  authDomain: "watering-plant-2c69b.firebaseapp.com",
  projectId: "watering-plant-2c69b",
  storageBucket: "watering-plant-2c69b.appspot.com",
  messagingSenderId: "502833181522",
  appId: "1:502833181522:web:64f122e75b2ad51b8d008b",
  measurementId: "G-6Z6RHPV86X"
};

const app = initializeApp(firebaseConfig);
export default app;