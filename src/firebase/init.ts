
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoBVb_cCMDDmFBvI9GJtXzwXEAauFVn3c",
  authDomain: "energybuddy-79fe4.firebaseapp.com",
  projectId: "energybuddy-79fe4",
  storageBucket: "energybuddy-79fe4.appspot.com",
  messagingSenderId: "682100492202",
  appId: "1:682100492202:web:fcfb7d124e55092ae28dd3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


//export firestore database
export default firebaseApp.firestore();