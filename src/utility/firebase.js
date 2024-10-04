import {getAuth} from 'firebase/auth'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN912nvDKFqQfNkmojNJu5Igx64q-4JgU",
  authDomain: "clone-9b1a4.firebaseapp.com",
  projectId: "clone-9b1a4",
  storageBucket: "clone-9b1a4.appspot.com",
  messagingSenderId: "592589583348",
  appId: "1:592589583348:web:5fc5e71e029e536970bfa1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();