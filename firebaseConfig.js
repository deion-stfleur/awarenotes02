// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const newFirebaseConfig = {
  apiKey: "AIzaSyB1pskHluHneIvgToG9JXyQpNQPVoi_O4U",
  authDomain: "ocr-mobile-8e9f1.firebaseapp.com",
  projectId: "ocr-mobile-8e9f1",
  storageBucket: "ocr-mobile-8e9f1.appspot.com",
  messagingSenderId: "728865880802",
  appId: "1:728865880802:web:d464c01bb76b7559a67cbb",
  measurementId: "G-RH5NT1Y5J7"
};

// Check if any Firebase apps are already initialized
const app = !getApps().length ? initializeApp(newFirebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);
console.log("Firebase app initialized with:", app.options);


// Initialize Auth
const auth = getAuth(app);

export { db, app, auth };
