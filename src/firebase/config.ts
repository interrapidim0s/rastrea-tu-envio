// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfpOJ_pXIj7Ychj8hkIYEHBR9l2d4j3Jc",
  authDomain: "interrapidisimo-82450.firebaseapp.com",
  projectId: "interrapidisimo-82450",
  storageBucket: "interrapidisimo-82450.firebasestorage.app",
  messagingSenderId: "692971886777",
  appId: "1:692971886777:web:9c911cda76f14033c3e368"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
