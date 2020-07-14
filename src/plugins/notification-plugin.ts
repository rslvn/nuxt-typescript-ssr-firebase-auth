import { Plugin } from '@nuxt/types'
import { sendNotificationObservable } from '~/service/rx-service'
import { PushNotification, PushNotificationStatus } from '~/types'
import { getAlreadyExistPushNotification, savePushNotification } from '~/service/firebase/firestore'

// export const toPushNotificationEnrichedList = async (pushNotifications: PushNotification[]) => {
//   const pushNotificationEnricheds: PushNotificationEnriched[] = []
//
//   for (const pushNotification of pushNotifications) {
//     const fromUser = await getUser(pushNotification.from)
//     if (fromUser) {
//       pushNotificationEnricheds.push({
//         pushNotification,
//         fromUser
//       })
//     }
//   }
//   return pushNotificationEnricheds
// }
//
// const loadLatestNotifications = (store: Store<any>) => {
//   const authUser = store.state.auth?.authUser as AuthUser
//   if (!authUser) {
//     console.log('No authUser to loadLatestNotifications')
//     return
//   }
//
//   getNewPushNotifications(authUser.userId)
//     .then(async (pushNotifications) => {
//       const pushNotificationEnrichedList: PushNotificationEnriched[] = await toPushNotificationEnrichedList(pushNotifications)
//
//       const limit = 5 - pushNotificationEnrichedList.length
//       if (limit > 0) {
//         await getReadPushNotifications(authUser.userId, limit)
//           .then(async (readPushNotifications) => {
//             await toPushNotificationEnrichedList(readPushNotifications).then((readPushNotificationEnrichedList) => {
//               readPushNotificationEnrichedList
//                 .forEach(pushNotificationEnriched => pushNotificationEnrichedList.push(pushNotificationEnriched))
//             })
//           })
//       }
//
//       await store.dispatch(StoreConfig.notification.savePushNotification, pushNotificationEnrichedList)
//     })
//     .catch((error: Error) => console.log(error))
// }

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
  // loadNotificationObservable.asObservable().subscribe(() => {
  //   console.log('loadNotificationObservable called')
  //   loadLatestNotifications(store)
  // })
}

export default notificationPlugin
