import admin from './firebase-admin-init';
import DecodedIdToken = admin.auth.DecodedIdToken;

export function addDecodedIdToken(idToken: string): Promise<DecodedIdToken> {
    return admin.auth()
        .verifyIdToken(idToken)
        .then((decodedIdToken: DecodedIdToken) => decodedIdToken)
}
