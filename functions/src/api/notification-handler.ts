import { RequestHandler } from 'express'
import { NO_CONTENT } from 'http-status-codes'
import admin from 'firebase-admin'
import { getDecodedIdTokenFromRequest } from './api-handler'
import { ApiErrorCode, UserDevice } from '../types'
import { deleteUserDevice, getPushNotification, getUserDevices } from '../service/firebase-admin-service'
import { handleApiErrors } from '../service/api-error-service'
import DecodedIdToken = admin.auth.DecodedIdToken

export const notifyHandler: RequestHandler = async (req, res) => {
  console.log(`${req.originalUrl} - notifyHandler called`)
  await getDecodedIdTokenFromRequest(req)
    .then(async (decodedIdToken: DecodedIdToken) => {
      const notificationId = req.params.notificationId
      console.log(`notify request from ${decodedIdToken.uid} with notificationId ${notificationId}`)
      if (!notificationId) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }
      console.log(`getting notification by id ${notificationId}`)

      const notification = await getPushNotification(notificationId)
      if (!notification) {
        throw new Error(ApiErrorCode.BAD_REQUEST)
      }
      console.log(`notification goes from ${notification.from} to ${notification.to}`)

      const userDevices: UserDevice[] = await getUserDevices(notification.to)
      if (userDevices.length <= 0) {
        console.log(`No userDevice for ${notification.to}`)
        return res.status(NO_CONTENT).send()
      }
      console.log(`${userDevices.length} userDevice(s) found for ${notification.to}`)

      const deviceTokens = userDevices.map(value => value.deviceToken)
      const payload = {
        data: {
          type: notification.notificationType
        }
      }
      const removeUserDevicePromises: Promise<any>[] = []

      await admin.messaging().sendToDevice(deviceTokens, payload)
        .then((messagingDevicesResponse) => {
          messagingDevicesResponse.results.forEach((result, index) => {
            const error = result.error
            if (error) {
              console.error('Failure sending notification to', userDevices[index], error)
              // Cleanup the tokens who are not registered anymore.
              if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
                removeUserDevicePromises.push(deleteUserDevice(userDevices[index]))
              }
            }
          })
          Promise.all(removeUserDevicePromises).catch(error => console.log(error))
        }).catch(error => console.log(error))

      console.log(`notification sent from ${notification.from} to ${notification.to}`)

      return res.status(NO_CONTENT).send()
    }).catch((error: Error) => handleApiErrors(res, error))
}
