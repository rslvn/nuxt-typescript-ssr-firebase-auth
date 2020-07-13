import { Response } from 'express'
import { FirebaseError } from 'firebase-admin'
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes'
import { ApiErrorCode } from '../../types'

const handleFirebaseError = (response: Response, error: FirebaseError) => {
  console.error('Firebase error', error)
  switch (error?.code) {
    case 'auth/id-token-expired':
      response.status(UNAUTHORIZED).send('re-authentication required')
      break

    default:
      response.status(INTERNAL_SERVER_ERROR).send(ApiErrorCode.INTERNAL_ERROR)
  }
}

export const handleGenericError = (response: Response, error: Error) => {
  console.error('Error occurred', error)

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

export const handleApiErrors = (response: Response, error: Error | FirebaseError) => {
  isFirebaseError(error)
    ? handleFirebaseError(response, error as FirebaseError)
    : handleGenericError(response, error as Error)
}

const isFirebaseError = (error: any) => {
  return !!error.code
}
