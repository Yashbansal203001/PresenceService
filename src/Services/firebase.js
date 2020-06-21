import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBOWkK_P3DYImE_hRuiYfYy1p1DVaUgUw0",
    authDomain: "test-b09be.firebaseapp.com",
    databaseURL: "https://test-b09be.firebaseio.com"
};


firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
