import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyBLaK2xzaSyezMG77XdTdqsbMcV0167Xhc",
    authDomain: "clothes-db049.firebaseapp.com",
    projectId: "clothes-db049",
    storageBucket: "clothes-db049.appspot.com",
    messagingSenderId: "773139413602",
    appId: "1:773139413602:web:c0bd9cc0e10ea9d0586f3b",
    measurementId: "G-K9NCGBG31G"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

export {
  db,
  auth
}