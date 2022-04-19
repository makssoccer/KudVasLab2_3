// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCqJypigq-zidbqxxhPLTubjFqlEyJZA5I",
    authDomain: "todo-4f48d.firebaseapp.com",
    projectId: "todo-4f48d",
    storageBucket: "todo-4f48d.appspot.com",
    messagingSenderId: "45219888799",
    appId: "1:45219888799:web:015e0785efe1e06ca52caa",
    measurementId: "G-RB2V3YSC37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();