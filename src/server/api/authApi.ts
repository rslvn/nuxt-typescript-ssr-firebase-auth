import { Request, Response, Router } from 'express';
import admin from '../firebase-admin/firebase-admin-init';
import { FirebaseError } from "firebase-admin";
import { addDecodedIdToken } from "../firebase-admin/firebase-admin-service";
import { collection, ProviderType, StoredUser, User } from '../../types'

let service = '/auth';

const router = Router();

const handleFirebaseError = (response: Response, error: FirebaseError) => {
  console.error('Firebase error', error);

  let statusCode = error?.code === 'auth/id-token-expired' ? 401 : 500;

  response.status(statusCode).json({
    service,
    error
  });
};

router.post(service, async (req: Request, res: Response) => {

  console.log(service, ' called (post)');

  if (!req.body.token) {
    return res.status(400).send('Invalid Parameter');
  }

  await addDecodedIdToken(req.body.token)
    .then(async (decodedIdToken: admin.auth.DecodedIdToken) => {
      const user = await admin.firestore().collection(collection.USER).doc(decodedIdToken.sub).get().then((document) => {
        return document.data() as User
      })
      if (!user) {
        throw new Error('User not found by id: ' + decodedIdToken.sub)
      }

      const storedUser: StoredUser = {
        name: decodedIdToken.name,
        verified: decodedIdToken.email_verified as boolean,
        email: decodedIdToken.email as string,
        profilePhoto: user.profilePhoto,
        userId: decodedIdToken.sub,
        providers: [{ providerType: decodedIdToken.firebase.sign_in_provider as ProviderType }]
      };

      return res.status(200).json(storedUser);
    })
    .catch((error) => handleFirebaseError(res, error));
});

export default router;
