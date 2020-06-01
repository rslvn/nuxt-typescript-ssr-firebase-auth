import { DefaultCoverPhoto, Image, ProfileState, RootState } from '~/types'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { saveUser } from '~/service/firebase/firestore-service'
import { auth } from '~/plugins/fire-init-plugin'
import { handleError } from '~/service/error-service'

export const state = (): ProfileState => ({
  coverPhoto: DefaultCoverPhoto,
})

export const getters: GetterTree<ProfileState, RootState> = {
  coverPhoto: (state) => state.coverPhoto,
}

export const mutations: MutationTree<ProfileState> = {
  setCoverPhoto(state, coverPhoto: Image) {
    state.coverPhoto = coverPhoto
  },
}

export const actions: ActionTree<ProfileState, RootState> = {
  async saveCoverPhoto({ commit }, coverPhoto: Image) {
    commit('setCoverPhoto', coverPhoto)
  },
  async updateCoverPhoto({ commit, dispatch }, coverPhoto: Image) {
    await saveUser({
      id: auth.currentUser?.uid,
      coverPhoto: coverPhoto,
    })
      .then(() => {
        commit('setCoverPhoto', coverPhoto)
      })
      .catch((error: Error) => handleError(dispatch, error))
  },
}
