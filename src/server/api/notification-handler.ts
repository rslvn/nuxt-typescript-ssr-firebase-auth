import { RequestHandler } from 'express'
import { NO_CONTENT } from 'http-status-codes'
import admin from 'firebase-admin'
import { ApiErrorCode, UserDevice } from 'common-types'
import { deleteUserDevice, getPushNotification, getUserDevices } from '../service/firebase-admin-service'
import {
  getDecodedIdTokenFromRequest,
  handleApiErrors,
  handlerCalledLog,
  handlerLog
} from '../service/request-handler-service'
import DecodedIdToken = admin.auth.DecodedIdToken

export const notifyHandler: RequestHandler = async (req, res) => {
  handlerCalledLog(req, 'notifyHandler')
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken: DecodedIdToken) => {
      const notificationId = req.params.notificationId
      handlerLog(req, `notify request from ${decodedIdToken.uid} with notificationId ${notificationId}`)
      if (!notificationId) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }

      const notification = await getPushNotification(notificationId)
      if (!notification) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }
      handlerLog(req, `notification goes from ${notification.from} to ${notification.to}`)

      const userDevices: UserDevice[] = await getUserDevices(notification.to)
      if (userDevices.length <= 0) {
        handlerLog(req, `No userDevice for ${notification.to}`)
        return res.status(NO_CONTENT).send()
      }

      const deviceTokens = userDevices.map(value => value.deviceToken)
      handlerLog(req, `${userDevices.length} userDevice(s) found for ${notification.to}`)
      const payload = {
        data: {
          type: notification.notificationType
        }
      }
      const removeUserDevicePromises: Promise<any>[] = []

      const fcmResult = await admin.messaging().sendToDevice(deviceTokens, payload)
      fcmResult.results.forEach((result, index) => {
        const error = result.error
        if (error) {
          handlerLog(req, 'Failure sending notification to:', JSON.stringify(userDevices[index]), error)
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered') {
            removeUserDevicePromises.push(deleteUserDevice(userDevices[index]))
          }
        }
      })

      await Promise.all(removeUserDevicePromises)
      handlerLog(req, `notification sent from ${notification.from} to ${notification.to}`)

      return res.status(NO_CONTENT).send()
    })
    .catch((error: Error) => handleApiErrors(req, res, error))
}
