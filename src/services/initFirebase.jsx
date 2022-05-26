import firebase from "firebase/compat/app";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyBL2lULyMgDQW8TGSb-SKmal3pNBfOCjRo",
  authDomain: "esp32-firebase-demo-b9bc0.firebaseapp.com",
  databaseURL:
    "https://esp32-firebase-demo-b9bc0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-firebase-demo-b9bc0",
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export {firebase, config};
