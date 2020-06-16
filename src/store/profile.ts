import { Image, ProfileState, RootState, StoreConfig, User } from '~/types'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { auth } from '~/plugins/fire-init-plugin'
import { handleError } from '~/service/error-service'
import { saveUser } from '~/service/firebase/firestore';

export const state = (): ProfileState => ({})

export const getters: GetterTree<ProfileState, RootState> = {}

export const mutations: MutationTree<ProfileState> = {}

export const actions: ActionTree<ProfileState, RootState> = {

  async updateCoverPhoto({ commit, dispatch }, coverPhoto: Image) {
    await saveUser({
      id: auth.currentUser?.uid,
      coverPhoto: coverPhoto,
    })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async updateUser({ commit, dispatch }, user: User) {
    saveUser(user)
      .then((savedUser: User) => {
        dispatch(StoreConfig.auth.saveName, savedUser.name, {
          root: true
        })
      })
      .catch((error: Error) => handleError(dispatch, error))
  }

}
