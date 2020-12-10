
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9bEGTe4hpBf-LY5yf18snEDFLsVF3zFA",
    authDomain: "energytrackerapp.firebaseapp.com",
    databaseURL: "https://energytrackerapp.firebaseio.com",
    projectId: "energytrackerapp",
    storageBucket: "energytrackerapp.appspot.com",
    messagingSenderId: "774551133338",
    appId: "1:774551133338:web:a377bf23b30a2960b59323"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);


//export firestore database
export default firebaseApp.firestore();