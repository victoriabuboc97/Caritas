import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCcB6R6p_ov8rmnAxrgOu4jtGdWNsdGgfc',
    authDomain: 'charity-99e43.firebaseapp.com',
    databaseURL: 'https://charity-99e43-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'charity-99e43',
    storageBucket: 'charity-99e43.appspot.com',
    messagingSenderId: '631352547088',
    appId: '1:631352547088:web:5c69bb2c90d52f4f60f795',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;