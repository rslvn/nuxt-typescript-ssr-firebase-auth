import { Request, Response, Router } from 'express';
import admin from '../../service/firebase-admin/firebase-admin-init';
import { FirebaseError } from "firebase-admin";
import { addDecodedIdToken } from "../../service/firebase-admin/firebase-admin-service";
import { AnonymousUserImage, ProviderType, StoredUser } from '../../types'

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
    .then((decodedIdToken: admin.auth.DecodedIdToken) => {

      const alt = decodedIdToken.name as string || decodedIdToken.email as string;

      const profilePicture = decodedIdToken.picture ?
        {
          src: decodedIdToken.picture,
          alt: 'Picture of ' + alt
        }
        : AnonymousUserImage

      let user: StoredUser = {
        name: decodedIdToken.name,
        verified: decodedIdToken.email_verified as boolean,
        email: decodedIdToken.email as string,
        profilePicture: profilePicture,
        userId: decodedIdToken.sub,
        providers: [{ providerType: decodedIdToken.firebase.sign_in_provider as ProviderType }]
      };

      console.log(service, 'returns user: ', user);

      return res.status(200).json(user);
    })
    .catch((error) => handleFirebaseError(res, error));
});

export default router;
