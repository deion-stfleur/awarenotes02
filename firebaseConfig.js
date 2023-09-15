// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3jI7bt7xxOFLkf_nIu-b1l-1lC1BCwAg",
  authDomain: "awarenotes.firebaseapp.com",
  projectId: "awarenotes",
  storageBucket: "awarenotes.appspot.com",
  messagingSenderId: "588164777560",
  appId: "1:588164777560:web:2c5964c2f886b69eac2c2d",
  measurementId: "G-FTC4BE2XEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});




export { db, app, auth};