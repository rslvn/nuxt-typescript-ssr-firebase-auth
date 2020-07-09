import { Plugin } from '@nuxt/types'
import { Store } from 'vuex';
import { loadNotificationObservable, sendNotificationObservable } from '~/service/rx-service'
import { AuthUser, PushNotification } from '~/types'
import { getNewPushNotifications, savePushNotification } from '~/service/firebase/firestore'

const loadLatestNotifications = (store: Store<any>) => {
  const authUser = store.state.auth?.authUser as AuthUser
  if (!authUser) {
    return
  }

  getNewPushNotifications(authUser.userId)
    .then((pushNotifications) => {
      console.log('pushNotifications:', pushNotifications)
    })
    .catch((error: Error) => console.log(error))
}

const notificationPlugin: Plugin = ({ store }) => {
  sendNotificationObservable
    .asObservable()
    .subscribe((notification: PushNotification) => {
      console.log('notificationObservable called:', notification)
      savePushNotification(notification)
        .catch((error: Error) => console.log(error))
    })
  loadNotificationObservable.asObservable().subscribe(() => {
    loadLatestNotifications(store)
  })
}

export default notificationPlugin
