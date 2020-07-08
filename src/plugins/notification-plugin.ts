import { Plugin } from '@nuxt/types'
import { notificationObservable } from '~/service/rx-service'
import { PushNotification } from '~/types'
import { savePushNotification } from '~/service/firebase/firestore'

const notificationPlugin: Plugin = () => {
  notificationObservable
    .asObservable()
    .subscribe((notification: PushNotification) => {
      savePushNotification(notification).catch((error: Error) =>
        console.log(error)
      )
    })
}

export default notificationPlugin
