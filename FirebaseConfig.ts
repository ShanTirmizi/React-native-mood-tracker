// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB__RbE2XIfEP4i4TMEJngJSIhelPReL1I",
  authDomain: "covid-19-tracker-5bd35.firebaseapp.com",
  projectId: "covid-19-tracker-5bd35",
  storageBucket: "covid-19-tracker-5bd35.appspot.com",
  messagingSenderId: "44569869586",
  appId: "1:44569869586:web:a2cff1d1a8732303de87cb",
  measurementId: "G-YNEZW9V5ZN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);