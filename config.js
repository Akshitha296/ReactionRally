import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDiHZ2bSLjwa6ytwrxaHBKstNv9GR52fwo",
    authDomain: "reactionrally.firebaseapp.com",
    projectId: "reactionrally",
    storageBucket: "reactionrally.appspot.com",
    messagingSenderId: "511522085842",
    appId: "1:511522085842:web:48fc48f9ce3225b43ec60b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export default firebase.firestore();