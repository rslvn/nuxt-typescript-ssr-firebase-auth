import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OK } from 'http-status-codes'
import admin from 'firebase-admin'
import { ApiErrorCode, AppCookie } from '../../types'
import { getDecodedIdToken } from '../service/firebase-admin-service'
import { handleApiErrors } from '../service/api-error-service'
import DecodedIdToken = admin.auth.DecodedIdToken

const bearer = 'Bearer '

const getTokenFromRequest = (req: Request) => {
  return Promise.resolve().then(() => {
    const token = req.headers.authorization && req.headers.authorization.startsWith(bearer)
      ? req.headers.authorization.split(bearer)[1] : null

    return token || req.cookies[AppCookie.TOKEN] as string
  })
}

export const getDecodedIdTokenFromRequest = (req: Request) => {
  return Promise.resolve().then(() => {
    if (!req.user) {
      throw new Error(ApiErrorCode.FORBIDDEN)
    }

    return req.user as DecodedIdToken
  })
}

export const tokenHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.originalUrl} - tokenHandler called`)
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
    .catch((error: Error) => handleApiErrors(res, error))
}

export const healthyHandler: RequestHandler = (req, res) => {
  console.log(`${req.originalUrl} - healthyHandler called`)
  return res.status(OK).send('OK')
}
