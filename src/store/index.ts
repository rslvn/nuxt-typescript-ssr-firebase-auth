import { ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosError, AxiosResponse } from 'axios'
import { AppCookie, RootState, StoredUser } from "../types"
import { log } from '~/service/helper/global-helpers'

export const state = (): RootState => ({})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { route, app }: Context) {
    console.log(`>>>>>>>>>> nuxtServerInit mode: ${process?.mode} for path: ${route.path}`)

    const token = app.$cookies.get(AppCookie.token)
    if (token) {
      return await app.$axios
        .post('/auth/', {
          token
        })
        .then((response: AxiosResponse<StoredUser>) => {
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
