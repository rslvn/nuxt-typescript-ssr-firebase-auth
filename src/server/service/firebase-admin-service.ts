import {
  AuthUser,
  collection,
  CollectionField,
  FirebaseClaimKey,
  FirebaseClaims,
  FirebaseQueryOperator,
  ProviderType,
  PushNotification,
  User,
  UserDevice,
  WhereClause
} from 'common-types'
import admin from './firebase-admin-init'
import { deleteModel, getModelById, getModelsByWhereClauses } from './firestore-admin-collection-service'
import DecodedIdToken = admin.auth.DecodedIdToken

export const getDecodedIdToken = (idToken: string): Promise<DecodedIdToken> => {
  return admin.auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken: DecodedIdToken) => decodedIdToken)
}

export const setCustomClaims = async (uid: string, firebaseClaims: FirebaseClaims): Promise<void> => {
  await admin.auth().setCustomUserClaims(uid, firebaseClaims)
}

export const validateClaimsAndGet = async (decodedIdToken: DecodedIdToken) => {
  let username = decodedIdToken[FirebaseClaimKey.USERNAME]
  if (username) {
    return { username }
  }

  const user = await getUser(decodedIdToken.uid)
  if (!user) {
    throw new Error(`User not found by id: ${decodedIdToken.uid}`)
  }

  username = (user.username || user.id)
  const firebaseClaims = { username }

  await setCustomClaims(decodedIdToken.sub, firebaseClaims)

  return firebaseClaims
}

export const toAuthUser = (decodedIdToken: DecodedIdToken, firebaseClaims: FirebaseClaims): AuthUser => {
  return {
    name: decodedIdToken.name,
    verified: decodedIdToken.email_verified as boolean,
    email: decodedIdToken.email as string,
    profilePhoto: {
      src: decodedIdToken.picture as string,
      alt: `Profile photo of ${firebaseClaims[FirebaseClaimKey.USERNAME]}`
    },
    userId: decodedIdToken.sub,
    username: firebaseClaims[FirebaseClaimKey.USERNAME],
    providers: [{ providerType: decodedIdToken.firebase.sign_in_provider as ProviderType }]
  }
}

export const getUser = async (userId: string): Promise<User> => {
  return await getModelById(collection.USER, userId)
}

export const getPushNotification = async (notificationId: string): Promise<PushNotification> => {
  return await getModelById(collection.NOTIFICATION, notificationId)
}

export const getUserDevices = async (userId: string): Promise<UserDevice[]> => {
  const userWhereClause: WhereClause = {
    field: CollectionField.USER_DEVICE.userId,
    operator: FirebaseQueryOperator.EQ,
    value: userId
  }

  return await getModelsByWhereClauses(collection.USER_DEVICE, userWhereClause)
}

export const deleteUserDevice = (userDevice: UserDevice) => {
  return deleteModel(collection.USER_DEVICE, userDevice)
}
