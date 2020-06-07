import { ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosError, AxiosResponse } from 'axios'
import {
  ApiConfig,
  AppCookie,
  RootState,
  StoreConfig,
  StoredUser,
} from '../types'
import { decodeToken } from '~/service/firebase/firebase-service';

export const state = (): RootState => ({})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch, state }, { route, app }: Context) {
    commit(StoreConfig.loading.setLoading, true)
    console.log(
      `>>>>>>>>>> nuxtServerInit loading: ${state?.loading?.loading} mode: ${process?.mode} for path: ${route.path}`
    )

    const token = app.$cookies.get(AppCookie.TOKEN)
    if (token) {
      console.log('Token FOUND')
      return await app.$axios
        .post(ApiConfig.auth, {
          token,
        })
        .then((response: AxiosResponse<StoredUser>) => {
          console.log('decoed User on Server')
          commit(StoreConfig.auth.setStoredUser, response.data)
        })
        .catch((error: AxiosError) => {
          if (error?.response?.status === 401) {
            console.log('Token DECODED')
            commit(StoreConfig.auth.setStoredUser, decodeToken(token))
          } else {
            console.log('Error: ', error)
            commit(StoreConfig.auth.forceLogout, true)
            app.$cookies.remove(AppCookie.TOKEN)
          }
        })
        .then(() => commit(StoreConfig.loading.setLoading, false))
    }
    return dispatch(StoreConfig.loading.saveLoading, false)
  },
}
