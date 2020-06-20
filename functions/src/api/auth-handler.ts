import { NextFunction, Request, RequestHandler, Response } from 'express';
import { OK } from 'http-status-codes'
import admin from 'firebase-admin';
import {
    getDecodedIdToken,
    setCustomClaims,
    toAuthUser,
    validateClaimsAndGet
} from '../service/firebase-admin-service';
import { ApiConfig, ApiErrorCode, AppCookie, FirebaseClaimKey, FirebaseClaims } from '../types'
import { handleApiErrors } from '../service/api-error-service';
import DecodedIdToken = admin.auth.DecodedIdToken;

const getTokenFromRequest = async (req: Request) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ?
        req.headers.authorization.split('Bearer ')[1] : null;

    return token ? token : req.cookies[AppCookie.TOKEN]
}

const getDecodedIdTokenFromRequest = async (req: Request) => {
    if (!req.user) {
        throw new Error(ApiErrorCode.FORBIDDEN)
    }
    return req.user as DecodedIdToken
}

export const tokenHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.originalUrl} - tokenHandler called`)
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
        .catch((error) => handleApiErrors(res, error))
}

export const healthyHandler: RequestHandler = (req, res) => {
    console.log(ApiConfig.auth.healthy, ' headers: ', req.headers)
    return res.status(OK).send('OK')
}

export const verifyHandler: RequestHandler = async (req, res) => {
    console.log('verifyHandler called')
    await getDecodedIdTokenFromRequest(req)
        .then(async (decodedIdToken) => {
            const claims = await validateClaimsAndGet(decodedIdToken);
            const authUser = toAuthUser(decodedIdToken, claims)

            return res.status(OK).json(authUser);

        })
        .catch((error) => handleApiErrors(res, error))
}

export const claimsHandler: RequestHandler = async (req, res) => {
    console.log('claimsHandler called')
    await getDecodedIdTokenFromRequest(req)
        .then(async (decodedIdToken) => {
            if (!req.body.claims) {
                throw new Error(ApiErrorCode.BAD_REQUEST)
            }

            const firebaseClaims = req.body.claims as FirebaseClaims
            if (!firebaseClaims[FirebaseClaimKey.USERNAME]) {
                throw new Error(ApiErrorCode.BAD_REQUEST)
            }

            await setCustomClaims(decodedIdToken.sub, firebaseClaims)

            return res.status(OK).json();

        })
        .catch((error) => handleApiErrors(res, error))
}
