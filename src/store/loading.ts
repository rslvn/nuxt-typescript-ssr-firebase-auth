import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { LoadingState, RootState } from '~/types'

export const state = (): LoadingState => ({
  loading: true
})

export const getters: GetterTree<LoadingState, RootState> = {
  loading: state => state.loading
}

export const mutations: MutationTree<LoadingState> = {
  setLoading (state, loading: boolean) {
    state.loading = loading
  }
}

export const actions: ActionTree<LoadingState, RootState> = {
  saveLoading ({ commit }, loading: boolean) {
    commit('setLoading', loading)
  }
}
