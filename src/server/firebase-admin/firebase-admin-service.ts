import admin from './firebase-admin-init'
import { collection, FirebaseClaims, User } from '../../types'
import DecodedIdToken = admin.auth.DecodedIdToken;

export const getDecodedIdToken = (idToken: string): Promise<DecodedIdToken> => {
  return admin.auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken: DecodedIdToken) => decodedIdToken)
}

export const setCustomClaims = async (uid: string, firebaseClaims: FirebaseClaims): Promise<void> => {
  console.log('setCustomClaims', firebaseClaims)
  await admin.auth().setCustomUserClaims(uid, firebaseClaims);
}

export const getUser = async (uid: string): Promise<User> => {
  return await admin.firestore()
    .collection(collection.USER)
    .doc(uid)
    .get()
    .then((document) => {
      return document.data() as User
    })
}
