const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBdo3uf-1DYBAtqqGbMDbygLNfW6VGlSGk",
  authDomain: "kpis-challenge.firebaseapp.com",
  projectId: "kpis-challenge",
  storageBucket: "kpis-challenge.appspot.com",
  messagingSenderId: "986619434631",
  appId: "1:986619434631:web:f2ab85433f79a870d30a22",
  measurementId: "G-79PDDRF7SR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
