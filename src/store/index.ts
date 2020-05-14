import { ActionTree } from 'vuex'
import { Context } from '@nuxt/types'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiConfig, AppCookie, RootState, StoreConfig, StoredUser } from "../types"

export const state = (): RootState => ({})

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch, state }, { route, app }: Context) {
    commit(StoreConfig.loading.setLoading, true)
    console.log(`>>>>>>>>>> nuxtServerInit loading: ${state?.loading?.loading} mode: ${process?.mode} for path: ${route.path}`)

    const token = app.$cookies.get(AppCookie.token)
    if (token) {
      return await app.$axios
        .post(ApiConfig.auth, {
          token
        })
        .then((response: AxiosResponse<StoredUser>) => {
          commit(StoreConfig.auth.setUser, response.data)
        })
        .catch((error: AxiosError) => {
          console.log('Error: ', error)
          if (error?.response?.status !== 401) {
            commit(StoreConfig.auth.forceLogout, true)
            app.$cookies.remove(AppCookie.token);
          }
        })
        .then(() => commit(StoreConfig.loading.setLoading, false));
    }
    return dispatch(StoreConfig.loading.saveLoading, false)
  }
}
