import { Plugin } from '@nuxt/types'
import firebase from './fire-init-plugin'
import { sendNotificationObservable } from '~/service/rx-service'
import { PushNotification, PushNotificationStatus } from '~/types'
import { getAlreadyExistPushNotification, savePushNotification } from '~/service/firebase/firestore'
import 'firebase/messaging'

const configureFcm = () => {
  if (!firebase.messaging.isSupported()) {
    console.log('Push Notification is not supported')
    return
  }

  const messaging = firebase.messaging()
  messaging.usePublicVapidKey('BC9vtFETeLltpC88TwhJhpGoY2CQLfV0rjKErJ5qm0Al3xS2GRt7lUiGMxc904dK-Xumn_SaLufC7kUAUh6-6Ic')
  messaging.onTokenRefresh((token) => {
    console.log('messaging.onTokenRefresh token', token)
  }, (error) => {
    console.log('messaging.onTokenRefresh', error)
  })

  Notification.requestPermission().then((permission) => {
    console.log('permission: ', permission)
    messaging.getToken()
      .then((token) => {
        console.log('TOKEN:', token)
        if (token) {
          messaging.onMessage((payload) => {
            console.log('FCM payload', payload)
          })
        }
      })
  }).catch((error: Error) => console.log(error))

  console.log('configureFcm done')
}

const saveNotification = (notification: PushNotification) => {
  getAlreadyExistPushNotification(notification)
    .then((existNotifications) => {
      console.log('existNotifications', existNotifications)
      existNotifications
        .forEach((existNotification) => {
          existNotification.status = PushNotificationStatus.IGNORED
          savePushNotification(existNotification)
            .catch((error: Error) => console.log(error))
        })
    })
    .then(() => {
      savePushNotification(notification)
        .then(saveNotification => console.log('savePushNotification', saveNotification))
    })
    .catch((error: Error) => console.log(error))
}

const notificationPlugin: Plugin = () => {
  sendNotificationObservable
    .asObservable()
    .subscribe((notification: PushNotification) => {
      console.log('sendNotificationObservable called')
      saveNotification(notification)
    })
  configureFcm()
}

export default notificationPlugin
