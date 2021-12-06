import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import "firebase/performance";
import "firebase/analytics";

let config = {
  apiKey: "AIzaSyAOKzPd35JC9nPj9k4u17ieyXCBG-axtxI",
  authDomain: "poketrader-4a2d4.firebaseapp.com",
  projectId: "poketrader-4a2d4",
  storageBucket: "poketrader-4a2d4.appspot.com",
  messagingSenderId: "125862436292",
  appId: "1:125862436292:web:089bed89a48fb57c5c1891",
  measurementId: "G-MPL37S68X7"
}

const app = firebase.initializeApp(config);

app.firestore().settings({
    ignoreUndefinedProperties: true
})

export default firebase;
export const firestore = app.firestore();
export const functions = app.functions("europe-west1");
export const auth = app.auth();
export const performance = app.performance();
export const analytics = app.analytics();