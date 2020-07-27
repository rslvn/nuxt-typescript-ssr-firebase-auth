import { NextFunction, Request, RequestHandler, Response } from 'express'
import admin from 'firebase-admin'
import {
  extractHeadersFromRequest,
  getTokenFromRequest,
  handleApiErrors,
  handlerCalledLog
} from '../service/request-handler-service'
import { getDecodedIdToken } from '../service/firebase-admin-service'
import { ApiErrorCode } from 'types-module'
import DecodedIdToken = admin.auth.DecodedIdToken

export const extractHeaderHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  await extractHeadersFromRequest(req)
    .then(() => {
      handlerCalledLog(req, 'extractHeaderHandler')
      next()
    })
    .catch((error: Error) => handleApiErrors(req, res, error))
}

export const tokenHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  handlerCalledLog(req, 'tokenHandler')
  await getTokenFromRequest(req)
    .then(async (token: string) => {
      if (!token) {
        throw new Error(ApiErrorCode.FORBIDDEN)
      }

      await getDecodedIdToken(token)
        .then((decodedIdToken: DecodedIdToken) => {
          req.user = decodedIdToken
        })

      next()
    })
    .catch((error: Error) => handleApiErrors(req, res, error))
}
