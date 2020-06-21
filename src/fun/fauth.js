import {auth} from '../Services/firebase';

export function signup(email,password,ur) {
    return auth().createUserWithEmailAndPassword(email,password)
}

export function login(email,password) {
    return auth().signInWithEmailAndPassword(email,password);
}

export function inwithGoogle() {
    const a = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(a);
}

export function out() {
    return auth().signOut();
}