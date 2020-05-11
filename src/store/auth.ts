import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from 'firebase'
import {
  AppCookie,
  AuthState,
  LoginCredentials,
  ProviderType,
  RegistrationCredentials,
  RootState,
  RouteType,
  SocialLoginCredentials,
  StoredUser
} from '~/types'
import { auth, getAuthProvider } from '~/plugins/fire-init-plugin'
import {
  getDangerNotificationMessage,
  getInfoNotificationMessage,
  getSuccessNotificationMessage,
  showInfoToaster,
  showSuccessToaster
} from '~/service/notification-service'
import { handleError, sendNotification } from '~/service/helper/global-helpers'
import { getProviderOption } from "~/service/helper/firebaseHelper";
import { cookieOptions } from "~/config/cookie-config";
import UserCredential = firebase.auth.UserCredential;
import ActionCodeInfo = firebase.auth.ActionCodeInfo;

export const state = (): AuthState => ({
  user: null,
  forceLogout: false,
  rememberMe: true
})

export const getters: GetterTree<AuthState, RootState> = {
  storedUser: (state) => state.user,
  rememberMe: (state) => state.rememberMe
}

export const mutations: MutationTree<AuthState> = {
  setUser(state, user: StoredUser) {
    state.user = user
  },
  forceLogout(state, forceLogout: boolean) {
    state.forceLogout = forceLogout
  },
  setRememberMe(state, rememberMe: boolean) {
    state.rememberMe = rememberMe
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
  async saveRememberMe({ commit }, rememberMe: boolean) {
    console.log('saveRememberMe', rememberMe)
    this.$cookies.set(AppCookie.rememberMe, rememberMe, cookieOptions)
    commit('setRememberMe', rememberMe);
  },
  async signInWithEmail({ dispatch }, credentials: LoginCredentials) {
    let persistence = credentials.rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
    await auth.setPersistence(persistence)
      .then(async () => {
        await auth
          .signInWithEmailAndPassword(credentials.email, credentials.password)
          .then(() => {
            if (credentials.callback) {
              credentials.callback()
            }
          })
          .catch((error: Error) => handleError(dispatch, error))
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

  async signInWithSocialProvider({ dispatch }, credentials: SocialLoginCredentials) {
    let authProvider = getAuthProvider(credentials.providerType);
    let persistence = credentials.rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
    await auth.setPersistence(persistence)
      .then(async () => {
        await auth.signInWithPopup(authProvider)
          .then(async () => {
            if (credentials.callback) {
              credentials.callback()
            }
          })
          .catch((error: Error) => handleError(dispatch, error))
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
      .then(async () => {
        await sendNotification(dispatch, getSuccessNotificationMessage(this.$i18n.t('notification.confirmPasswordReset')))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async handleVerifyEmail({ commit, dispatch }, actionCode: string) {
    return await auth.applyActionCode(actionCode)
      .then(async () => {
        commit('setVerified')
        await sendNotification(dispatch, getSuccessNotificationMessage(this.$i18n.t('notification.mailVerified')))
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

  async linkSocialProvider({ dispatch, commit }, providerType: ProviderType) {
    let authProvider = getAuthProvider(providerType);
    return auth.currentUser?.linkWithPopup(authProvider)
      .then(() => {
        commit('addProvider', providerType)
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(providerType)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async unlinkProvider({ dispatch, commit }, providerType: ProviderType) {
    return auth.currentUser?.unlink(providerType)
      .then(() => {
        commit('removeProvider', providerType)
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(providerType)))
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
