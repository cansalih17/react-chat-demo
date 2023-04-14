import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC559GYSTaeQ8mSPtPD1k5hamkpcRXofTs",
  authDomain: "chat-985c5.firebaseapp.com",
  projectId: "chat-985c5",
  storageBucket: "chat-985c5.appspot.com",
  messagingSenderId: "501411476781",
  appId: "1:501411476781:web:d6a35fbbd70c966efa8fa4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()