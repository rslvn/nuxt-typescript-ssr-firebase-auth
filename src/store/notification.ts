import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { NotificationMessage, NotificationState, PushNotificationEnriched, RootState } from '~/types'

export const state = (): NotificationState => ({
  notificationMessage: undefined,
  pushNotifications: []
})

export const getters: GetterTree<NotificationState, RootState> = {
  notificationMessage: (state: NotificationState) => state.notificationMessage,
  pushNotifications: (state: NotificationState) => state.pushNotifications
}

export const mutations: MutationTree<NotificationState> = {
  setNotificationMessage (state, notificationMessage: NotificationMessage) {
    state.notificationMessage = notificationMessage
  },
  setPushNotification (state, pushNotifications: PushNotificationEnriched[]) {
    state.pushNotifications = pushNotifications
  }
}

export const actions: ActionTree<NotificationState, RootState> = {
  saveNotificationMessage ({ commit }, notificationMessage: NotificationMessage) {
    commit('setNotificationMessage', notificationMessage)
  },
  savePushNotification ({ commit }, pushNotifications: PushNotificationEnriched[]) {
    commit('setPushNotification', pushNotifications)
  },
  clearNotificationMessage ({ commit }) {
    commit('setNotificationMessage', undefined)
  }
}
