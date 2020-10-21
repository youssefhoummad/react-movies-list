import * as firebase from "firebase/app";

import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXnFJNwv3sSg1BHgCuUitrzQsDbI32sXc",
  authDomain: "movies-react-58909.firebaseapp.com",
  databaseURL: "https://movies-react-58909.firebaseio.com",
  projectId: "movies-react-58909",
  storageBucket: "movies-react-58909.appspot.com",
  messagingSenderId: "482960783333",
  appId: "1:482960783333:web:e90fdc7184690b6b75210c",
  measurementId: "G-DHJ3DX9T9W"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();
const database = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, database, timestamp, auth };
