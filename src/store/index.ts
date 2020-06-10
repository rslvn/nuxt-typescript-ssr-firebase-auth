import { ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosError, AxiosResponse } from 'axios'
import {
  ApiConfig,
  AppCookie,
  RootState,
  StoreConfig,
  AuthUser,
} from '../types'
import { decodeToken } from '~/service/firebase/firebase-service';

export const state = (): RootState => ({})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch, state }, { route, app }: Context) {
    commit(StoreConfig.loading.setLoading, true)
    console.log(`>>>>>>>>>> nuxtServerInit for path: ${route.path}`)

    const token = app.$cookies.get(AppCookie.TOKEN)
    if (token) {
      console.log('Token FOUND')
      return await app.$axios
        .post(ApiConfig.auth, {
          token,
        })
        .then((response: AxiosResponse<AuthUser>) => {
          console.log('decoded User on Server')
          commit(StoreConfig.auth.setAuthUser, response.data)
        })
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
        .then(() => commit(StoreConfig.loading.setLoading, false))
    } else {
      console.log('No token')
    }
    return dispatch(StoreConfig.loading.saveLoading, false)
  },
}
