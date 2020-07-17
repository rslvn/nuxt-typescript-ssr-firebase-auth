import { Request, Response } from 'express'
import admin, { FirebaseError } from 'firebase-admin'
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes'
import { ApiErrorCode } from '../../types'
import { AppCookie, AppHeader, AuthHeaderValuePrefix } from '../../../functions/src/types'
import { generateUuid } from '../../service/global-service'
import DecodedIdToken = admin.auth.DecodedIdToken

const isFirebaseError = (error: any) => {
  return !!error.code
}
const sessinIdsLog = (req: Request) => {
  return `nsSessionId: ${req.nsSessionId}, nsRequestId: ${req.nsRequestId}`
}

const contextLog = (req: Request) => {
  return `context: ${req.originalUrl}`
}

export const handlerCalledLog = (req: Request, handler: string) => {
  console.log(handler, ` called - ${sessinIdsLog(req)},${contextLog(req)}`)
}
export const handlerLog = (req: Request, ...anyMessages: any[]) => {
  console.log(...anyMessages, ` - ${sessinIdsLog(req)}`)
}

export const handlerError = (req: Request, ...anyMessages: any[]) => {
  console.error(`${sessinIdsLog(req)},${contextLog(req)} - `, ...anyMessages)
}

export const extractHeadersFromRequest = (req: Request) => {
  return Promise.resolve().then(() => {
    req.nsSessionId = req.get(AppHeader.SESSION_ID) || generateUuid()
    req.nsRequestId = req.get(AppHeader.REQUEST_ID) || generateUuid()
  })
}

export const getTokenFromRequest = (req: Request) => {
  return Promise.resolve().then(() => {
    const token = req.headers.authorization && req.headers.authorization.startsWith(AuthHeaderValuePrefix)
      ? req.headers.authorization.split(AuthHeaderValuePrefix)[1] : null

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

const handleFirebaseError = (request: Request, response: Response, error: FirebaseError) => {
  handlerError(request, 'Firebase error', error)
  switch (error?.code) {
    case 'auth/id-token-expired':
      response.status(UNAUTHORIZED).send('re-authentication required')
      break

    default:
      response.status(INTERNAL_SERVER_ERROR).send(ApiErrorCode.INTERNAL_ERROR)
  }
}

export const handleGenericError = (request: Request, response: Response, error: Error) => {
  handlerError(request, 'Error occurred', error)
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
}

export const handleApiErrors = (request: Request, response: Response, error: Error|FirebaseError) => {
  isFirebaseError(error)
    ? handleFirebaseError(request, response, error as FirebaseError)
    : handleGenericError(request, response, error as Error)
}
