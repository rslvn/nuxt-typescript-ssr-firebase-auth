import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OK } from 'http-status-codes'
import admin from 'firebase-admin'
import {
  extractHeadersFromRequest,
  getTokenFromRequest,
  handleApiErrors,
  handlerCalledLog
} from '../service/request-handler-service';
import { getDecodedIdToken } from '../service/firebase-admin-service'
import DecodedIdToken = admin.auth.DecodedIdToken
import { ApiErrorCode } from 'common-types'

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

export const healthyHandler: RequestHandler = (req, res) => {
  console.log(`${req.originalUrl} - healthyHandler called`)
  return res.status(OK).send('OK')
}
