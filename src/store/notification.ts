import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { NotificationMessage, NotificationState, RootState } from '~/types'

export const state = (): NotificationState => ({
  notificationMessage: undefined
})

export const getters: GetterTree<NotificationState, RootState> = {
  notificationMessage: (state: NotificationState) => state.notificationMessage
}

export const mutations: MutationTree<NotificationState> = {
  setNotificationMessage (state, notificationMessage: NotificationMessage) {
    state.notificationMessage = notificationMessage
  }
}

export const actions: ActionTree<NotificationState, RootState> = {
  saveNotificationMessage ({ commit }, notificationMessage: NotificationMessage) {
    commit('setNotificationMessage', notificationMessage)
  },
  clearNotificationMessage ({ commit }) {
    commit('setNotificationMessage', undefined)
  }
}
