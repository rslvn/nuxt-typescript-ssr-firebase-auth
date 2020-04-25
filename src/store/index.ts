import { ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosError, AxiosResponse } from 'axios'
import { AppCookie, RootState, StoredUser } from "../lib/types"
import { log } from '~/lib/helper/global-helpers'

export const state = (): RootState => ({})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { route, app }: Context) {
    console.log(`>>>>>>>>>> nuxtServerInit mode: ${process?.mode}  path: ${route.path}`)

    const token = app.$cookies.get(AppCookie.token)

    if (token) {
      log('call /api/auth from nuxtServerInit')
      return await app.$axios
        .post('/auth', {
          token
        })
        .then((response: AxiosResponse<StoredUser>) => {
          log('Api Response: ', response.data)
          commit('auth/setUser', response.data)
        })
        .catch((error: AxiosError) => {
          console.log('Error: ', error)
          if (error?.response?.status !== 401) {
            commit('auth/forceLogout', true)
            log('remove idToken')
            app.$cookies.remove(AppCookie.token);
          }
        });
    } else {
      log('No token')
      return Promise.resolve()
    }
  }
}
