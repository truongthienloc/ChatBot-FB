// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { Firestore } from "firebase/firestore";
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDtU1_jBJlUBGOLYsQ-Dtmny76BL95AcHQ",
    authDomain: "congnghebot.firebaseapp.com",
    projectId: "congnghebot",
    storageBucket: "congnghebot.appspot.com",
    messagingSenderId: "646082696843",
    appId: "1:646082696843:web:4363882c892c99da98e68e",
    measurementId: "G-CQL2YT5XYR"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
const customerFinance = database.collection("Customer_Finance");
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

module.exports = {
    customerFinance,
}