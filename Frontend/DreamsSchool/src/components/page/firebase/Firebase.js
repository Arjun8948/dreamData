import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyDh_pec778O-aAwxN-_sIBjWIKwsr1eFmU",
  authDomain: "school-1d5c9.firebaseapp.com",
  projectId: "school-1d5c9",
  storageBucket: "school-1d5c9.appspot.com",
  messagingSenderId: "610896436692",
  appId: "1:610896436692:web:3f9e5fbbfacb292db10a41"
};
const app = initializeApp(firebaseConfig);
 export const authication = getAuth(app)