// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlhdIYmsRbAeM4dUNzAt_kcg1ZlTKFZmk',
  authDomain: 'sj-clothing-app-new.firebaseapp.com',
  projectId: 'sj-clothing-app-new',
  storageBucket: 'sj-clothing-app-new.appspot.com',
  messagingSenderId: '20455443046',
  appId: '1:20455443046:web:a2a67cd5c2eba8fb4abba7',
  measurementId: 'G-XY2JWWT6NN',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(app)
export const storage = getStorage(app)

// export const auth = getAuth(app)
