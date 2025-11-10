// src/config/firebase.config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC__OC-GjwaBGJT2x4Qs2YqFJ-3wqPF6Mc",
  authDomain: "homenest-baaed.firebaseapp.com",
  projectId: "homenest-baaed",
  storageBucket: "homenest-baaed.firebasestorage.app",
  messagingSenderId: "562268604999",
  appId: "1:562268604999:web:db8dff27f8f76a0282bf62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
