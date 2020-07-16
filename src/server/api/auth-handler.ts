import { RequestHandler } from 'express'
import { OK } from 'http-status-codes'
import admin from 'firebase-admin'
import { setCustomClaims, toAuthUser, validateClaimsAndGet } from '../service/firebase-admin-service'
import { ApiErrorCode, FirebaseClaimKey, FirebaseClaims } from '../../types'
import { handleApiErrors } from '../service/api-error-service'
import { getDecodedIdTokenFromRequest } from './api-handler'
import DecodedIdToken = admin.auth.DecodedIdToken

export const verifyHandler: RequestHandler = async (req, res) => {
  console.log(`${req.originalUrl} - verifyHandler called`)
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken: DecodedIdToken) => {
      const claims = await validateClaimsAndGet(decodedIdToken)
      const authUser = toAuthUser(decodedIdToken, claims)

      return res.status(OK).json(authUser)
    })
    .catch((error: Error) => handleApiErrors(res, error))
}

export const claimsHandler: RequestHandler = async (req, res) => {
  console.log(`${req.originalUrl} - claimsHandler called`)
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken: DecodedIdToken) => {
      if (!req.body.claims) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }

      const firebaseClaims = req.body.claims as FirebaseClaims
      if (!firebaseClaims[FirebaseClaimKey.USERNAME]) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }

      await setCustomClaims(decodedIdToken.sub, firebaseClaims)

      return res.status(OK).end()
    })
    .catch((error: Error) => handleApiErrors(res, error))
}
