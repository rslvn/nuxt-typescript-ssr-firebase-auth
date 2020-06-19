import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import admin from '../firebase-admin/firebase-admin-init';
import { FirebaseError } from 'firebase-admin';
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from 'http-status-codes'
import { getDecodedIdToken, getUser, setCustomClaims } from '../firebase-admin/firebase-admin-service';
import {
  ApiConfig,
  ApiErrorCode,
  AppCookie,
  AuthUser,
  FirebaseClaimKey,
  FirebaseClaims,
  ProviderType
} from '../../types'
import DecodedIdToken = admin.auth.DecodedIdToken;

const handleFirebaseError = (response: Response, error: FirebaseError) => {
  console.error('Firebase error', error);
  switch (error?.code) {
    case 'auth/id-token-expired':
      response.status(UNAUTHORIZED).send('re-authentication required')
      break

    default:
      response.status(INTERNAL_SERVER_ERROR).send(ApiErrorCode.INTERNAL_ERROR)
  }
};

const handleError = (response: Response, error: Error) => {
  console.error('Error occurred', error);

  switch (error.message) {
    case ApiErrorCode.FORBIDDEN:
      response.status(FORBIDDEN).send(error.message)
      break

    case ApiErrorCode.BAD_REQUEST:
      response.status(BAD_REQUEST).send(error.message)
      break

    default:
      response.status(INTERNAL_SERVER_ERROR).send(ApiErrorCode.INTERNAL_ERROR)
  }
};

const validateClaimsAndGet = async (decodedIdToken: DecodedIdToken) => {
  let username = decodedIdToken[FirebaseClaimKey.USERNAME]
  if (username) {
    return { username }
  }

  let user = await getUser(decodedIdToken.sub)
  if (!user) {
    throw new Error('User not found by id: ' + decodedIdToken.sub)
  }

  username = (user.username || user.id) as string
  let firebaseClaims = { username }

  await setCustomClaims(decodedIdToken.sub, firebaseClaims)

  return firebaseClaims
}

const toAuthUser = (decodedIdToken: DecodedIdToken, firebaseClaims: FirebaseClaims): AuthUser => {
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

const getTokenFromRequest = async (req: Request) => {
  let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ?
    req.headers.authorization.split('Bearer ')[1] : null;

  return token ? token : req.cookies[AppCookie.TOKEN]
}

const getDecodedIdTokenFromRequest = async (req: Request) => {
  if (!req.user) {
    throw new Error(ApiErrorCode.FORBIDDEN)
  }
  return req.user as DecodedIdToken
}

const tokenHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('tokenHandler called')
  await getTokenFromRequest(req)
    .then(async (token: string) => {
      if (!token) {
        throw new Error(ApiErrorCode.FORBIDDEN);
      }

      await getDecodedIdToken(token)
        .then(async (decodedIdToken: DecodedIdToken) => {
          req.user = decodedIdToken
          next()
        })
    })
    .catch((error: FirebaseError) => handleFirebaseError(res, error))
    .catch()
}

const healthyHandler: RequestHandler = (req, res) => {
  console.log(ApiConfig.auth.healthy, ' headers: ', req.headers)
  return res.status(OK).send('OK')
}

const verifyHandler: RequestHandler = async (req, res) => {
  console.log('verifyHandler called')
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken) => {
      let claims = await validateClaimsAndGet(decodedIdToken);
      let authUser = toAuthUser(decodedIdToken, claims)

      return res.status(OK).json(authUser);

    })
    .catch((error: FirebaseError) => handleFirebaseError(res, error))
    .catch((error: Error) => handleError(res, error))
}

const claimsHandler: RequestHandler = async (req, res) => {
  console.log('claimsHandler called')
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken) => {
      if (!req.body.claims) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }

      let firebaseClaims = req.body.claims as FirebaseClaims
      if (!firebaseClaims[FirebaseClaimKey.USERNAME]) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }

      await setCustomClaims(decodedIdToken.sub, firebaseClaims)

      return res.status(OK).json();

    })
    .catch((error: FirebaseError) => handleFirebaseError(res, error))
    .catch((error: Error) => handleError(res, error))
}

const router = Router();
router.get(ApiConfig.auth.healthy, healthyHandler);
router.get(ApiConfig.auth.verify, tokenHandler, verifyHandler);
router.post(ApiConfig.auth.claims, tokenHandler, claimsHandler);

export default router;
