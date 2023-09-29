// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJ5SkpxFFasqUruu6E5PMfnm-6P9ueE7Q',
  authDomain: 'sj-clothing.firebaseapp.com',
  projectId: 'sj-clothing',
  storageBucket: 'sj-clothing.appspot.com',
  messagingSenderId: '638073995197',
  appId: '1:638073995197:web:7beb5bb3792613ec951cd4',
  measurementId: 'G-MGEFW61FNK',
}

// Initialize Firebase
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

// export const auth = getAuth(app)
