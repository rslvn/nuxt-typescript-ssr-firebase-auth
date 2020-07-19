import { ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosError } from 'axios'
import { AppCookie } from 'types-module'
import { RootState, StoreConfig } from '../types'
import { decodeToken } from '~/service/firebase/firebase-service'
import { authVerify, configureAxiosDefaults } from '~/service/api-service'

export const state = (): RootState => ({})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ commit }, { route, app }: Context) {
    return await Promise.resolve()
      .then(async () => {
        console.log(`>>>>>>>>>> nuxtServerInit for path: ${route.path}`)

        configureAxiosDefaults(app.$axios)

        const token = app.$cookies.get(AppCookie.TOKEN)
        if (!token) {
          console.log('No token')
          return
        }

        console.log('Token FOUND')

        await authVerify(app.$axios)
          .then(authUser => commit(StoreConfig.auth.setAuthUser, authUser))
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
      })
      .catch((error: Error) => console.log(error))
      .finally(() => commit(StoreConfig.loading.setLoading, false))
  }
}
