import { NotificationMessage, NotificationState, RootState } from '~/types'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

export const state = (): NotificationState => ({
  notificationMessage: undefined
})

export const getters: GetterTree<NotificationState, RootState> = {
  notificationMessage: (state) => state.notificationMessage,
}

export const mutations: MutationTree<NotificationState> = {
  setNotificationMessage(state, notificationMessage: NotificationMessage) {
    state.notificationMessage = notificationMessage
  },
}

export const actions: ActionTree<NotificationState, RootState> = {
  async saveNotificationMessage({ commit }, notificationMessage: NotificationMessage) {
    commit('setNotificationMessage', notificationMessage)
  },
  async clearNotificationMessage({ commit }) {
    commit('setNotificationMessage', null)
  },
}
