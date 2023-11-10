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
  apiKey: 'AIzaSyDaXYPmyl86Pttlc6z6jBjoir2ejsPAx2g',
  authDomain: 'sj-clothing-app-e38ad.firebaseapp.com',
  projectId: 'sj-clothing-app-e38ad',
  storageBucket: 'sj-clothing-app-e38ad.appspot.com',
  messagingSenderId: '529299213781',
  appId: '1:529299213781:web:038dc9c1795f0b5361c15c',
  measurementId: 'G-5643DV97N4',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(app)
export const storage = getStorage(app)

// export const auth = getAuth(app)
