import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { ProviderType } from "~/types";

if (!firebase.apps.length) {

  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }

  firebase.initializeApp(config)
}

export const getAuthProvider = (providerType: ProviderType) => {
  switch (providerType) {
    case ProviderType.google:
      return new firebase.auth.GoogleAuthProvider();

    case ProviderType.twitter:
      return new firebase.auth.TwitterAuthProvider();

    case ProviderType.facebook:
      return new firebase.auth.FacebookAuthProvider()

    default:
      throw new Error('No social auth provider for provider type' + providerType);
  }
}

export const auth: firebase.auth.Auth = firebase.auth()
export const firestore: firebase.firestore.Firestore = firebase.firestore()
export const storage: firebase.storage.Storage = firebase.storage()

export const TaskEvent = firebase.storage.TaskEvent
export const TaskState = firebase.storage.TaskState

export default firebase
