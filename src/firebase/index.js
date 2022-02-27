// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { Firestore } from "firebase/firestore";
import firebase, {initializeApp} from "firebase/app";
// import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyDtU1_jBJlUBGOLYsQ-Dtmny76BL95AcHQ",
    authDomain: "congnghebot.firebaseapp.com",
    projectId: "congnghebot",
    storageBucket: "congnghebot.appspot.com",
    messagingSenderId: "646082696843",
    appId: "1:646082696843:web:4363882c892c99da98e68e",
    measurementId: "G-CQL2YT5XYR"
};

const app = initializeApp(firebaseConfig);
// initializeApp({
//     credential : firebaseConfig
// })
const database = getFirestore(app);
const customerFinance = collection(database, "Customer_Finance");
// addDoc(customerFinance, {user: "test"});
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const addCustomerFinance = (data) => {
    console.log(data)
    addDoc(customerFinance, data);
}
module.exports = {
    addCustomerFinance,
}