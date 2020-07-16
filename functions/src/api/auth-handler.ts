import { RequestHandler } from 'express'
import { OK } from 'http-status-codes'
import { setCustomClaims, toAuthUser, validateClaimsAndGet } from '../service/firebase-admin-service'
import { ApiErrorCode, FirebaseClaimKey, FirebaseClaims } from '../types'
import { handleApiErrors } from '../service/api-error-service'
import { getDecodedIdTokenFromRequest } from './api-handler'

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
