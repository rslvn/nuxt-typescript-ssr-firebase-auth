import { Middleware } from '@nuxt/types'

const clearMessageMiddleware: Middleware = ({ store }) => {
  if (store.state.notification.message) {
    store.commit('notification/setMessage');
    console.log('Messages cleared')
  }
};

export default clearMessageMiddleware
