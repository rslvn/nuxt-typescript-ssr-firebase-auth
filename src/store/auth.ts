import { ActionTree, Dispatch, GetterTree, MutationTree } from 'vuex'
import firebase from 'firebase'
import {
  AuthState,
  LoginCredentials,
  NotificationMessage,
  ProviderType,
  RegistrationCredentials,
  RootState,
  RouteType,
  StoredUser,
  UpdatePasswordCredentials
} from '~/types'
import { auth, facebookAuthProvider, googleAuthProvider, twitterAuthProvider } from '~/plugins/fire-init-plugin'
import {
  errorToNotificationMessage,
  getDangerNotificationMessage,
  getInfoNotificationMessage,
  showInfoToaster,
  showSuccessToaster
} from '~/service/notification-service'
import { log } from '~/service/helper/global-helpers'
import UserCredential = firebase.auth.UserCredential;
import ActionCodeInfo = firebase.auth.ActionCodeInfo;

const sendNotification = async (
  dispatch: Dispatch,
  notificationMessage: NotificationMessage
) => {
  await dispatch('notification/saveMessage', notificationMessage, {
    root: true
  })
};

const getProviderOption = (provider: ProviderType) => {
  return {
    provider: provider.replace('.com', '')
  }
}

const sendErrorNotification = async (dispatch: Dispatch, error: Error) => {
  await sendNotification(dispatch, errorToNotificationMessage(error))
}

const handError = async (dispatch: Dispatch, error: Error) => {
  log(error)
  await sendErrorNotification(dispatch, error)
}

export const state = (): AuthState => ({
  user: null,
  forceLogout: false
})

export const getters: GetterTree<AuthState, RootState> = {
  storedUser: (state) => state.user
}

export const mutations: MutationTree<AuthState> = {
  setUser(state, user: StoredUser) {
    state.user = user
  },
  forceLogout(state, forceLogout: boolean) {
    state.forceLogout = forceLogout
  },
  setVerified(state) {
    if (state.user) {
      state.user.verified = true
    }
  },
  setName(state, name: string) {
    if (state.user) {
      state.user.name = name
    }
  },
  addProvider(state, provider: string) {
    if (state.user) {
      state.user.providers.push(provider)
    }
  },
  removeProvider(state, provider: string) {
    if (state.user) {
      const index = state.user.providers.indexOf(provider)

      if (index > -1) {
        state.user.providers.splice(index, 1)
      }
    }
  }
}

export const actions: ActionTree<AuthState, RootState> = {
  async saveUser({ commit }, user: StoredUser) {
    commit('setUser', user);
  },

  async signInWithEmail({ dispatch }, credentials: LoginCredentials) {
    await auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async signUpWithEmail({ commit, dispatch }, credentials: RegistrationCredentials) {
    await auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (userCredential: UserCredential) => {

        await userCredential?.user
          ?.updateProfile({
            displayName: credentials.name
          })
          .then(() => {
            commit('setName', credentials.name)
          })

        await userCredential?.user?.sendEmailVerification()
          .then(() =>
            sendNotification(dispatch,
              getInfoNotificationMessage(this.$i18n.t('notification.verifyMailSent', { email: credentials.email })))
          )
          .catch(() =>
            sendNotification(dispatch,
              getDangerNotificationMessage(this.$i18n.t('notification.verifyMailNotSent', { email: credentials.email })))
          )
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async signInWithGoogle({ dispatch }, callback: () => void) {
    await auth.signInWithPopup(googleAuthProvider)
      .then(() => {
        callback()
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async signInWithTwitter({ dispatch }, callback: () => void) {
    await auth.signInWithPopup(twitterAuthProvider)
      .then(() => {
        callback()
      }).catch((error: Error) => handError(dispatch, error))
  },

  async signInWithFacebook({ dispatch }, callback: () => void) {
    await auth.signInWithPopup(facebookAuthProvider)
      .then(() => {
        callback()
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async updatePassword({ dispatch }, updatePasswordCredentials: UpdatePasswordCredentials) {
    let authCredential = firebase.auth.EmailAuthProvider
      .credential(updatePasswordCredentials.credentials.email, updatePasswordCredentials.credentials.password);
    await auth.currentUser?.reauthenticateWithCredential(authCredential)
      .then(async () => {
        await auth.currentUser?.updatePassword(updatePasswordCredentials.newPassword)
          .then(() => {
            showSuccessToaster(this.$i18n.t('notification.passwordUpdated'))
          })
          .catch((error: Error) => handError(dispatch, error))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async handleSendingEmailVerificationCode({ dispatch }) {
    return auth.currentUser?.sendEmailVerification()
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.verifyMailSent', { email: auth.currentUser?.email }))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async sendPasswordResetEmail({ commit, dispatch }, emailAddress: string) {
    return await auth.sendPasswordResetEmail(emailAddress)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.sendPasswordResetEmail'))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async confirmPasswordReset({ commit, dispatch }, { actionCode, password }) {
    return await auth.confirmPasswordReset(actionCode, password)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.confirmPasswordReset'))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async handleVerifyEmail({ commit, dispatch }, actionCode: string) {
    return await auth.applyActionCode(actionCode)
      .then(async () => {
        await this.$router.replace(RouteType.ACCOUNT);
        commit('setVerified')
        showInfoToaster(this.$i18n.t('notification.mailVerified'))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async handleVerifyPasswordResetCode({ commit, dispatch }, actionCode: string) {
    return await auth.verifyPasswordResetCode(actionCode)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.passwordResetVerified'))
        return true;
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async handleRecoverEmail({ dispatch }, actionCode: string) {
    return await auth.checkActionCode(actionCode)
      .then(async (info: ActionCodeInfo) => {
        await auth.applyActionCode(actionCode)
          .then(() => console.log('Action applied'))
        return info.data.email;
      }).then((email: string | null | undefined) => {
        if (email)
          auth.sendPasswordResetEmail(email)
            .then(() => console.log('PasswordResetEmail sent'))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async linkPassword({ dispatch, commit }, credentials: LoginCredentials) {
    let authCredential = firebase.auth.EmailAuthProvider.credential(credentials.email, credentials.password);

    return auth.currentUser?.linkWithCredential(authCredential)
      .then(() => {
        commit('addProvider', ProviderType.password)
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.password)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async unlinkPassword({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.password)
      .then(() => {
        commit('removeProvider', ProviderType.password)
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.password)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async linkGoogle({ dispatch, commit }) {
    return auth.currentUser?.linkWithPopup(googleAuthProvider)
      .then(() => {
        commit('addProvider', ProviderType.google)
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.google)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async unlinkGoogle({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.google)
      .then(() => {
        commit('removeProvider', ProviderType.google)
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.google)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async linkTwitter({ dispatch, commit }) {
    return auth.currentUser?.linkWithPopup(twitterAuthProvider)
      .then(() => {
        commit('addProvider', ProviderType.twitter)
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.twitter)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async unlinkTwitter({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.twitter)
      .then(() => {
        commit('removeProvider', ProviderType.twitter)
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.twitter)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async linkFacebook({ dispatch, commit }) {
    return auth.currentUser?.linkWithPopup(facebookAuthProvider)
      .then(() => {
        commit('addProvider', ProviderType.facebook);
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.facebook)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async unlinkFacebook({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.facebook)
      .then(() => {
        commit('removeProvider', ProviderType.facebook);
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.facebook)))
      })
      .catch((error: Error) => handError(dispatch, error))
  },

  async logout({ dispatch, commit }) {
    return await auth.signOut()
      .then(() => {
        this.$router.push(RouteType.LOGIN)
        commit('forceLogout', false);
      })
      .catch((error: Error) => handError(dispatch, error))
  },

}
