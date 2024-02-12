
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAYrDfF1YTQ_ogK9wXsRuvjcyoXpeFzD30",
    authDomain: "auth-project-1d89a.firebaseapp.com",
    projectId: "auth-project-1d89a",
    storageBucket: "auth-project-1d89a.appspot.com",
    messagingSenderId: "1014012325157",
    appId: "1:1014012325157:web:fcd6fc6b4862859faf3ecc"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
export { app, auth }
