import express, { Request, Response, Router } from 'express';
import { addDecodedIdToken } from '../service/firebase-admin-utils';
import { collection, User, UserDTO } from '../types'
import admin from '../service/firebase-admin-init';
import { FirebaseError } from "firebase-admin";
import { RuntimeOptions, runWith } from "firebase-functions";
import cookieParser from "cookie-parser";

const service = '/auth';

const app = express();
app.use(cookieParser());
const router = Router();

const handleFirebaseError = (response: Response, error: FirebaseError, servicePath: string) => {
    console.error('Firebase error', error);
    const statusCode = error?.code === 'auth/id-token-expired' ? 401 : 500;
    response.status(statusCode).json({
        servicePath,
        error
    });
};

router.post(service, async (req: Request, res: Response) => {

    console.log(req.originalUrl, ' called (post)');

    if (!req.body.token) {
        return res.status(400).send('Invalid Parameter');
    }

    return await addDecodedIdToken(req.body.token)
        .then(async (decodedIdToken: admin.auth.DecodedIdToken) => {
            const user = await admin.firestore().collection(collection.USER).doc(decodedIdToken.sub).get().then((document) => {
                return document.data() as User
            })
            if (!user) {
                throw new Error('User not found by id: ' + decodedIdToken.sub)
            }

            const storedUser: UserDTO = {
                name: decodedIdToken.name,
                verified: decodedIdToken.email_verified as boolean,
                email: decodedIdToken.email as string,
                profilePhoto: user.profilePhoto,
                userId: decodedIdToken.sub,
                providers: [{ providerType: decodedIdToken.firebase.sign_in_provider }]
            };

            return res.status(200).json(storedUser);
        })
        .catch((error) => handleFirebaseError(res, error, '/api' + service));
});

app.use('/api', router)

const runtimeOpts: RuntimeOptions = {
    timeoutSeconds: 300,
    memory: '1GB'
}

export const authApi = runWith(runtimeOpts)
    .https
    .onRequest(app);
