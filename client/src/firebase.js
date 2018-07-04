import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDY4QS2fptCE1Bg5BB2n17SmtgS0wPi6uw",
  authDomain: "blogger-205013.firebaseapp.com",
  databaseURL: "https://blogger-205013.firebaseio.com",
  projectId: "blogger-205013",
  storageBucket: "blogger-205013.appspot.com",
  messagingSenderId: "45159892067"
};

firebase.initializeApp(config);

export const Database = firebase.database()
