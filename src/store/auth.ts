import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from 'firebase'
import {
  AuthState,
  LoginCredentials,
  ProviderType,
  RegistrationCredentials,
  RootState,
  RouteType,
  SocialLoginCredentials,
  StoredUser
} from '~/types'
import {
  auth,
  facebookAuthProvider,
  getAuthProvider,
  googleAuthProvider,
  twitterAuthProvider
} from '~/plugins/fire-init-plugin'
import {
  getDangerNotificationMessage,
  getInfoNotificationMessage,
  showInfoToaster,
  showSuccessToaster
} from '~/service/notification-service'
import { handleError, sendNotification } from '~/service/helper/global-helpers'
import { getProviderOption } from "~/service/helper/firebaseHelper";
import UserCredential = firebase.auth.UserCredential;
import ActionCodeInfo = firebase.auth.ActionCodeInfo;

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
  setProfilePicture(state, profilePicture: string) {
    if (state.user) {
      state.user.profilePicture.src = profilePicture
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
        if (credentials.callback) {
          credentials.callback()
        }
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async reauthenticateWithCredential({ dispatch }, credentials: LoginCredentials) {
    let authCredential = firebase.auth.EmailAuthProvider.credential(credentials.email, credentials.password);
    await auth.currentUser?.reauthenticateWithCredential(authCredential)
      .then(async () => {
        if (credentials.callback) {
          credentials.callback()
        }
      })
      .catch((error: Error) => handleError(dispatch, error))
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
      .catch((error: Error) => handleError(dispatch, error))
  },

  async updateProfilePicture({ commit }, profilePictureUrl: string) {
    await auth.currentUser
      ?.updateProfile({
        photoURL: profilePictureUrl
      })
      .then(() => {
        commit('setProfilePicture', profilePictureUrl)
      })
  },

  async signInWithSocialProvider({ dispatch }, socialLoginCredentials: SocialLoginCredentials) {
    let authProvider = getAuthProvider(socialLoginCredentials.providerType);
    await auth.signInWithPopup(authProvider)
      .then(async () => {
        if (socialLoginCredentials.callback) {
          socialLoginCredentials.callback()
        }
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async reauthenticateWithSocialProvider({ dispatch }, socialLoginCredentials: SocialLoginCredentials) {
    let authProvider = getAuthProvider(socialLoginCredentials.providerType);
    await auth.currentUser?.reauthenticateWithPopup(authProvider)
      .then(async () => {
        if (socialLoginCredentials.callback) {
          socialLoginCredentials.callback()
        }
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async updatePassword({ dispatch }, newPassword: string) {
    await auth.currentUser?.updatePassword(newPassword)
      .then(() => {
        showSuccessToaster(this.$i18n.t('notification.passwordUpdated'))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async handleSendingEmailVerificationCode({ dispatch }) {
    return auth.currentUser?.sendEmailVerification()
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.verifyMailSent', { email: auth.currentUser?.email }))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async sendPasswordResetEmail({ commit, dispatch }, emailAddress: string) {
    return await auth.sendPasswordResetEmail(emailAddress)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.sendPasswordResetEmail'))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async confirmPasswordReset({ commit, dispatch }, { actionCode, password }) {
    return await auth.confirmPasswordReset(actionCode, password)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.confirmPasswordReset'))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async handleVerifyEmail({ commit, dispatch }, actionCode: string) {
    return await auth.applyActionCode(actionCode)
      .then(async () => {
        await this.$router.replace(RouteType.ACCOUNT);
        commit('setVerified')
        showInfoToaster(this.$i18n.t('notification.mailVerified'))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async handleVerifyPasswordResetCode({ commit, dispatch }, actionCode: string) {
    return await auth.verifyPasswordResetCode(actionCode)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.passwordResetVerified'))
        return true;
      })
      .catch((error: Error) => handleError(dispatch, error))
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
      .catch((error: Error) => handleError(dispatch, error))
  },

  async linkPassword({ dispatch, commit }, credentials: LoginCredentials) {
    let authCredential = firebase.auth.EmailAuthProvider.credential(credentials.email, credentials.password);

    return auth.currentUser?.linkWithCredential(authCredential)
      .then(() => {
        commit('addProvider', ProviderType.password)
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.password)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async unlinkPassword({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.password)
      .then(() => {
        commit('removeProvider', ProviderType.password)
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.password)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async linkGoogle({ dispatch, commit }) {
    return auth.currentUser?.linkWithPopup(googleAuthProvider)
      .then(() => {
        commit('addProvider', ProviderType.google)
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.google)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async unlinkGoogle({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.google)
      .then(() => {
        commit('removeProvider', ProviderType.google)
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.google)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async linkTwitter({ dispatch, commit }) {
    return auth.currentUser?.linkWithPopup(twitterAuthProvider)
      .then(() => {
        commit('addProvider', ProviderType.twitter)
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.twitter)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async unlinkTwitter({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.twitter)
      .then(() => {
        commit('removeProvider', ProviderType.twitter)
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.twitter)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async linkFacebook({ dispatch, commit }) {
    return auth.currentUser?.linkWithPopup(facebookAuthProvider)
      .then(() => {
        commit('addProvider', ProviderType.facebook);
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.facebook)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async unlinkFacebook({ dispatch, commit }) {
    return auth.currentUser?.unlink(ProviderType.facebook)
      .then(() => {
        commit('removeProvider', ProviderType.facebook);
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(ProviderType.facebook)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async logout({ dispatch, commit }) {
    return await auth.signOut()
      .then(() => {
        this.$router.push(RouteType.LOGIN)
        commit('forceLogout', false);
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

}
