// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA7OW8pjF1k6G8LJeHO8RDs1rAkwdmh2Hw",
    authDomain: "authentication-web-aa350.firebaseapp.com",
    projectId: "authentication-web-aa350",
    storageBucket: "authentication-web-aa350.appspot.com",
    messagingSenderId: "104415733296",
    appId: "1:104415733296:web:aee38e7ac5a768b4b12ff5",
    measurementId: "G-HWV32XPVNS"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
