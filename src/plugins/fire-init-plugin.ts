import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyCL7CJUidaODn8vr6EdZFWYus9du2x2cFo',
  authDomain: 'nuxt-ts-firebase-auth-ssr.firebaseapp.com',
  databaseURL: 'https://nuxt-ts-firebase-auth-ssr.firebaseio.com',
  projectId: 'nuxt-ts-firebase-auth-ssr',
  storageBucket: 'nuxt-ts-firebase-auth-ssr.appspot.com',
  messagingSenderId: '105948403419',
  appId: '1:105948403419:web:cf34ee3366e8d3a4755efe',
  measurementId: 'G-WH7EJ7PYBQ'
}

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(config)
  } catch (e) {
    console.log('Error', e)
  }
}

export const googleAuthProvider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const twitterAuthProvider: firebase.auth.TwitterAuthProvider = new firebase.auth.TwitterAuthProvider()
export const facebookAuthProvider: firebase.auth.FacebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export const auth: firebase.auth.Auth = firebase.auth()
export const firestore: firebase.firestore.Firestore = firebase.firestore()
export const storage: firebase.storage.Storage = firebase.storage()

export default firebase
