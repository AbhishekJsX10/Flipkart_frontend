
// firebase imports
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// firebase configurations
const firebaseConfig = {
  apiKey: "AIzaSyBB2hLsq8p32TZLNPjJSZrvPUFdyxwqFWs",
  authDomain: "ecommerce-clone-flipkart.firebaseapp.com",
  projectId: "ecommerce-clone-flipkart",
  storageBucket: "ecommerce-clone-flipkart.appspot.com",
  messagingSenderId: "552021300998",
  appId: "1:552021300998:web:b9498185cf7e8572383087"
};

// firebase app connection
const app = initializeApp(firebaseConfig);

// authentiation connection with help of email and passwords
export const auth=getAuth();

// cloud firebase database connection
export const db=getFirestore(app);

export default app;