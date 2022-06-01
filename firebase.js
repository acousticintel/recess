// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_-vpEbZhfL_ZPI_xF9uXCHzLNJcH3a2A",
  authDomain: "recess-254.firebaseapp.com",
  projectId: "recess-254",
  storageBucket: "recess-254.appspot.com",
  messagingSenderId: "358941067105",
  appId: "1:358941067105:web:b1df7f4e297e3944ca6720"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
//const storage = getStorage(app);

//enableIndexedDbPersistence(db).catch(function (err) {
//  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
//  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
//  }
//});

export {
  app,
  db, //storage
};
