// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDRojRxsl0r2ZhUSOSTNTegFQGtVfgGY3g",
    authDomain: "imessage-clone-b5603.firebaseapp.com",
    projectId: "imessage-clone-b5603",
    storageBucket: "imessage-clone-b5603.appspot.com",
    messagingSenderId: "915319535042",
    appId: "1:915319535042:web:79ccbc83234363ffe9125b",
    measurementId: "G-LVXY9HZ24T"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);
  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;