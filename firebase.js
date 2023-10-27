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
  apiKey: 'AIzaSyDdFp04xNN0muNQRmbmAHlzsGEYeZEp5ls',
  authDomain: 'sj-clothing-app.firebaseapp.com',
  projectId: 'sj-clothing-app',
  storageBucket: 'sj-clothing-app.appspot.com',
  messagingSenderId: '108999029592',
  appId: '1:108999029592:web:0c0d0ac0d8973cc12a2b2d',
  measurementId: 'G-N9M82Z3P8Q',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(app)
export const storage = getStorage(app)

// export const auth = getAuth(app)
