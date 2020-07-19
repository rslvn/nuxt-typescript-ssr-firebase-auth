import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Image, User } from 'types-module'
import { auth } from '~/plugins/fire-init-plugin'
import { handleError } from '~/service/error-service'
import { saveUser } from '~/service/firebase/firestore'
import { refreshToken, updateProfileName } from '~/service/firebase/firebase-service'
import { authClaims } from '~/service/api-service'
import { ProfileState, RootState } from '~/types'

export const state = (): ProfileState => ({})

export const getters: GetterTree<ProfileState, RootState> = {}

export const mutations: MutationTree<ProfileState> = {}

export const actions: ActionTree<ProfileState, RootState> = {
  async updateCoverPhoto ({ dispatch }, coverPhoto: Image) {
    return await saveUser({
      id: auth.currentUser?.uid,
      coverPhoto
    }).catch((error: Error) => handleError(dispatch, error))
  },

  // eslint-disable-next-line no-empty-pattern
  async updateUser ({}, user: User) {
    return await saveUser(user)
      .then(async (savedUser: User) => {
        await updateProfileName(savedUser.name)
          .then(async () => await authClaims(this.$axios, savedUser.username))
          .then(() => refreshToken())
        return savedUser
      })
  }
}
