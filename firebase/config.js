// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBy4yNCgfAFfg63iRMDpOW8pGhFUgW3OA",
  authDomain: "hostel-bookings.firebaseapp.com",
  projectId: "hostel-bookings",
  storageBucket: "hostel-bookings.appspot.com",
  messagingSenderId: "306607430410",
  appId: "1:306607430410:web:ba487c1509fafbbfffb8f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const useFirestore = getFirestore(app);
const storage = getStorage(app);
export { useFirestore, storage };