import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDJ5SkpxFFasqUruu6E5PMfnm-6P9ueE7Q',
  authDomain: 'sj-clothing.firebaseapp.com',
  projectId: 'sj-clothing',
  storageBucket: 'sj-clothing.appspot.com',
  messagingSenderId: '638073995197',
  appId: '1:638073995197:web:7beb5bb3792613ec951cd4',
  measurementId: 'G-MGEFW61FNK',
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getStorage(FIREBASE_APP)
