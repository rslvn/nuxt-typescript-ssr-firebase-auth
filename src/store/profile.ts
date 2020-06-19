import { Image, ProfileState, RootState, User } from '~/types'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { auth } from '~/plugins/fire-init-plugin'
import { handleError } from '~/service/error-service'
import { saveUser } from '~/service/firebase/firestore'
import { refreshToken, updateProfileName } from '~/service/firebase/firebase-service';
import { authClaims } from '~/service/api-service';

export const state = (): ProfileState => ({})

export const getters: GetterTree<ProfileState, RootState> = {}

export const mutations: MutationTree<ProfileState> = {}

export const actions: ActionTree<ProfileState, RootState> = {
  async updateCoverPhoto({ commit, dispatch }, coverPhoto: Image) {
    await saveUser({
      id: auth.currentUser?.uid,
      coverPhoto: coverPhoto,
    }).catch((error: Error) => handleError(dispatch, error))
  },

  async updateUser({ commit, dispatch }, user: User) {
    await saveUser(user)
      .then(async (savedUser: User) => {
        await updateProfileName(savedUser.name as string)
          .then(async () => await authClaims(this.$axios, savedUser.username as string))
          .then(() => refreshToken())
      })
      .catch((error: Error) => handleError(dispatch, error))
  },
}
