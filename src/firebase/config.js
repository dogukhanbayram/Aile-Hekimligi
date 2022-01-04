import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlIiTVaJF_qH4Fe63GQrJUvYGuFQ9oSv8",
  authDomain: "aile-hekimligi.firebaseapp.com",
  projectId: "aile-hekimligi",
  storageBucket: "aile-hekimligi.appspot.com",
  messagingSenderId: "386177073859",
  appId: "1:386177073859:web:8e7a7963f7022410185876",
  measurementId: "G-LPC79XGRH4"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
