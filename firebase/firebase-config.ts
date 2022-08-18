import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCF1KIDnebg_DDbw2gvjwnx_YqiDqQ2alg",
    authDomain: "pabau-ass.firebaseapp.com",
    projectId: "pabau-ass",
    storageBucket: "pabau-ass.appspot.com",
    messagingSenderId: "875797621986",
    appId: "1:875797621986:web:1ea13287dacc87a40082bb",
    measurementId: "G-MJC6ENX4RK"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };