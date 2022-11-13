// import * as firebase from 'firebase/app';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);
const projectStorage = getStorage(app);
const timestamp = serverTimestamp();

export { projectStorage, projectFirestore, timestamp };