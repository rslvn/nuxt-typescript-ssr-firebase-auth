import admin from 'firebase-admin'

export const initalizeFirebaseAdmin = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })
    console.log('Firebase Admin initializeApp')
  }
}
