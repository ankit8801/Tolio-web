// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACAqBWJCvkzTHWz-S7P6u4yg7GrbID0dA",
  authDomain: "tolio-web.firebaseapp.com",
  projectId: "tolio-web",
  storageBucket: "tolio-web.firebasestorage.app",
  messagingSenderId: "977021947544",
  appId: "1:977021947544:web:395ad526e6e32434474aed"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
