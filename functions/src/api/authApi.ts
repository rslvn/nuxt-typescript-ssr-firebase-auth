import express, { Request, Response, Router } from 'express';
import { addDecodedIdToken } from '../service/firebase-admin-utils';
import { AnonymousUserImage, runtimeOpts, StoredUser } from '../types'
import admin from '../service/firebase-admin-init';
import { FirebaseError } from "firebase-admin";
import { runWith } from "firebase-functions";
import cookieParser from "cookie-parser";

const service = '/auth';

const app = express();
app.use(cookieParser());
const router = Router();

const handleFirebaseError = (response: Response, error: FirebaseError) => {
    console.error('Firebase error', error);
    const statusCode = error?.code === 'auth/id-token-expired' ? 401 : 500;
    response.status(statusCode).json({
        service,
        error
    });
};

// @ts-ignore
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

            const user: StoredUser = {
                name: decodedIdToken.name || '',
                verified: decodedIdToken.email_verified as boolean,
                email: decodedIdToken.email as string,
                profilePicture,
                userId: decodedIdToken.sub,
                providers: [decodedIdToken.firebase.sign_in_provider]
            };

            return res.status(200).json(user);
        })
        .catch((error) => handleFirebaseError(res, error));
});

app.use('/api', router)

export const authApi = runWith(runtimeOpts)
    .https
    .onRequest(app);
