 import firebase from 'firebase';
 var firebaseConfig = {
    apiKey: "AIzaSyBJwfqdQNTpkVmJLKl-NTfjrGca8DYa9nE",
    authDomain: "student-management-ea533.firebaseapp.com",
    projectId: "student-management-ea533",
    storageBucket: "student-management-ea533.appspot.com",
    messagingSenderId: "1094809604366",
    appId: "1:1094809604366:web:31794f785a03518175875f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;


  export const firestore = firebase.firestore()