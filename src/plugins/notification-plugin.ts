import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { PushNotification, PushNotificationStatus } from 'common-types'
import firebase, { auth } from './fire-init-plugin'
import { configureFcmObservable, loadNotificationObservable, sendNotificationObservable } from '~/service/rx-service'
import { LocalStorageKey } from '~/types'
import { getAlreadyExistPushNotification, savePushNotification } from '~/service/firebase/firestore'
import 'firebase/messaging'
import { saveUserDevice } from '~/service/firebase/firestore/user-device-collection'
import { notificationNotify } from '~/service/api-service'

let messagingLoaded = false

const configureFcm = () => {
  if (!firebase.messaging.isSupported()) {
    console.log('Push Notification is not supported')
    return
  }
  const messaging = firebase.messaging()
  if (!messagingLoaded) {
    messaging.usePublicVapidKey(process.env.FIREBASE_MESSAGING_VAP_ID)
    messaging.onTokenRefresh((token) => {
      console.log('messaging.onTokenRefresh token', token)
    }, (error) => {
      console.log('messaging.onTokenRefresh', error)
    })
    messagingLoaded = true
  }

  Notification.requestPermission().then((permission) => {
    console.log('permission: ', permission, auth.currentUser.uid)
    messaging.getToken()
      .then((token) => {
        const user = auth.currentUser
        if (token && user) {
          saveUserDevice({
            userId: user.uid,
            deviceToken: token
          })
            .catch(() => {
            })

          messaging.onMessage((payload) => {
            console.log('FCM payload', payload)
            loadNotificationObservable.next()
          })

          localStorage.setItem(LocalStorageKey.FCM_TOKEN, token)
        }
      })
  }).catch((error: Error) => console.log(error))

  console.log('configureFcm done')
}

const sendNotification = (app: NuxtAppOptions, notification: PushNotification) => {
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
        .then((saveNotification) => {
          notificationNotify(app.$axios, saveNotification.id)
            .catch((error: Error) => console.log(error))
        })
    })
    .catch((error: Error) => console.log(error))
}

const notificationPlugin: Plugin = ({ app }) => {
  sendNotificationObservable
    .asObservable()
    .subscribe((notification: PushNotification) => {
      console.log('sendNotificationObservable called')
      sendNotification(app, notification)
    })
  configureFcmObservable.asObservable().subscribe(() => {
    configureFcm()
  })
}

export default notificationPlugin
