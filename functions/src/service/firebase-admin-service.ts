import admin from './firebase-admin-init'
import { AuthUser, collection, FirebaseClaimKey, FirebaseClaims, ProviderType, User } from '../types'
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

export const validateClaimsAndGet = async (decodedIdToken: DecodedIdToken) => {
    let username = decodedIdToken[FirebaseClaimKey.USERNAME]
    if (username) {
        return { username }
    }

    const user = await getUser(decodedIdToken.sub)
    if (!user) {
        throw new Error('User not found by id: ' + decodedIdToken.sub)
    }

    username = user.username || user.id
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
    };
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
