import { LoadingState, RootState } from '~/types'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

export const state = (): LoadingState => ({
  loading: false,
})

export const getters: GetterTree<LoadingState, RootState> = {
  loading: (state) => state.loading,
};

export const mutations: MutationTree<LoadingState> = {
  setLoading(state, loading: boolean) {
    state.loading = loading
  },
}

export const actions: ActionTree<LoadingState, RootState> = {
  async saveLoading({ commit }, loading: boolean) {
    commit('setLoading', loading)
  },
}
