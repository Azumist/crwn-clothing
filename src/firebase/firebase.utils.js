import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyDzTs_VB8HgtVxn4ak4youHVN7t4RZjmq8",
  authDomain: "crown-db-30251.firebaseapp.com",
  projectId: "crown-db-30251",
  storageBucket: "crown-db-30251.appspot.com",
  messagingSenderId: "824860421712",
  appId: "1:824860421712:web:a500457edffd69dcef6b55",
  measurementId: "G-SLTE3E61WE"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additinalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additinalData
      })
    }
    catch(e) {
      console.log('error creating user', e.message);
    }
  }

  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;