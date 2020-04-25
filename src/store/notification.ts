import { NotificationMessage, NotificationState, RootState } from "~/lib/types";
import { ActionTree, GetterTree, MutationTree } from "vuex";

export const state = (): NotificationState => ({
  message: null
});

export const getters: GetterTree<NotificationState, RootState> = {
  getMessage: state => state.message
};

export const mutations: MutationTree<NotificationState> = {
  setMessage(state, message: NotificationMessage) {
    state.message = message;
  }
};

export const actions: ActionTree<NotificationState, RootState> = {
  async saveMessage({ commit }, message: NotificationMessage) {
    commit('setMessage', message);
  },
  async clearMessage({ commit }) {
    commit('setMessage', null);
  },
};
