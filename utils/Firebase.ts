
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCVI7DYWTxjBeqH8dSHRVgvGHbviOmC-2o",
    authDomain: "pocketai-3431a.firebaseapp.com",
    projectId: "pocketai-3431a",
    storageBucket: "pocketai-3431a.appspot.com",
    messagingSenderId: "713824623818",
    appId: "1:713824623818:web:683daf08a22af0f0dde833",
    measurementId: "G-CMZGC0F9V6"
};

const app = initializeApp(firebaseConfig, 'Client');

export default app;