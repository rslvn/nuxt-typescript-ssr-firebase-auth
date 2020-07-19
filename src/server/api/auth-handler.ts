import { RequestHandler } from 'express'
import { NO_CONTENT, OK } from 'http-status-codes'
import admin from 'firebase-admin'
import { ApiErrorCode, FirebaseClaimKey, FirebaseClaims } from 'types-module'
import { setCustomClaims, toAuthUser, validateClaimsAndGet } from '../service/firebase-admin-service'
import {
  getDecodedIdTokenFromRequest,
  handleApiErrors,
  handlerCalledLog,
  handlerLog
} from '../service/request-handler-service'
import DecodedIdToken = admin.auth.DecodedIdToken

export const verifyHandler: RequestHandler = async (req, res) => {
  handlerCalledLog(req, 'verifyHandler')
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken: DecodedIdToken) => {
      const claims = await validateClaimsAndGet(decodedIdToken)
      handlerLog(req, `current claims of: ${decodedIdToken.uid}`, JSON.stringify(claims))

      const authUser = toAuthUser(decodedIdToken, claims)
      handlerLog(req, 'returning authUser: ', JSON.stringify(authUser))

      return res.status(OK).json(authUser)
    })
    .catch((error: Error) => handleApiErrors(req, res, error))
}

export const claimsHandler: RequestHandler = async (req, res) => {
  handlerCalledLog(req, 'claimsHandler')
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken: DecodedIdToken) => {
      if (!req.body.claims) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }

      const firebaseClaims = req.body.claims as FirebaseClaims
      handlerLog(req, 'claims from body: ', JSON.stringify(firebaseClaims))
      if (!firebaseClaims[FirebaseClaimKey.USERNAME]) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }

      await setCustomClaims(decodedIdToken.sub, firebaseClaims)

      return res.status(NO_CONTENT).send()
    })
    .catch((error: Error) => handleApiErrors(req, res, error))
}
