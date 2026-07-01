// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu8mG1HUyXIYWocukbXFQjakN0xAU0Yig",
  authDomain: "ciclos-e-biorritmos.firebaseapp.com",
  projectId: "ciclos-e-biorritmos",
  storageBucket: "ciclos-e-biorritmos.firebasestorage.app",
  messagingSenderId: "701119561103",
  appId: "1:701119561103:web:7a162caec2ca82dbf5dffa",
  measurementId: "G-0TPPL1HDWF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, app, analytics, storage };
