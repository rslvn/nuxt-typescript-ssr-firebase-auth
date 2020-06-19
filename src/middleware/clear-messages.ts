import { Middleware } from '@nuxt/types'
import { StoreConfig } from '~/types'

const clearMessageMiddleware: Middleware = async ({ store }) => {
  if (store.state.notification.notificationMessage) {
    await store.dispatch(StoreConfig.notification.clearNotificationMessage)
    console.log('Messages cleared')
  }
}

export default clearMessageMiddleware
