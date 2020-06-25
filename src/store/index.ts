import { ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosError } from 'axios'
import { AppCookie, RootState, StoreConfig, } from '../types'
import { decodeToken } from '~/service/firebase/firebase-service';
import { authVerify } from '~/service/api-service';

export const state = (): RootState => ({})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch, state }, { route, app, req }: Context) {
    console.log(`>>>>>>>>>> nuxtServerInit for path: ${route.path}`)
    const token = app.$cookies.get(AppCookie.TOKEN)
    if (token) {
      commit(StoreConfig.loading.setLoading, true)
      console.log('Token FOUND')
      return await authVerify(app.$axios)
        .then((authUser) => commit(StoreConfig.auth.setAuthUser, authUser))
        .catch((error: AxiosError) => {
          if (error?.response?.status === 401) {
            console.log('Token DECODED')
            commit(StoreConfig.auth.setAuthUser, decodeToken(token))
          } else {
            console.log('Error: ', error)
            commit(StoreConfig.auth.forceLogout, true)
            app.$cookies.remove(AppCookie.TOKEN)
          }
        })
        .finally(() => commit(StoreConfig.loading.setLoading, false))
    } else {
      console.log('No token')
    }
  },
}
