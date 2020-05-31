import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from 'firebase'
import {
  AppCookie,
  AuthState,
  cookieOptions,
  DefaultCoverPhoto,
  DefaultProfilePhoto,
  Image,
  LoginCredentials,
  ProviderData,
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
  sendNotification,
  showInfoToaster,
  showSuccessToaster
} from '~/service/notification-service'
import { getProviderData, getProviderOption } from "~/service/firebase/firebase-service";
import { handleError } from "~/service/error-service";
import { saveUser } from "~/service/firebase/firestore-service";
import UserCredential = firebase.auth.UserCredential;
import ActionCodeInfo = firebase.auth.ActionCodeInfo;

export const state = (): AuthState => ({
  forceLogout: false,
  rememberMe: true
})

export const getters: GetterTree<AuthState, RootState> = {
  storedUser: (state) => state.storedUser,
  rememberMe: (state) => state.rememberMe
}

export const mutations: MutationTree<AuthState> = {
  setStoredUser(state, storedUser: StoredUser) {
    state.storedUser = storedUser
  },
  forceLogout(state, forceLogout: boolean) {
    state.forceLogout = forceLogout
  },
  setRememberMe(state, rememberMe: boolean) {
    state.rememberMe = rememberMe
  },
  setVerified(state) {
    if (state.storedUser) {
      state.storedUser.verified = true
    }
  },
  setName(state, name: string) {
    if (state.storedUser) {
      state.storedUser.name = name
    }
  },
  setProfilePhoto(state, profilePhoto: Image) {
    if (state.storedUser) {
      state.storedUser.profilePhoto = profilePhoto
    }
  },

  addProvider(state, providerData: ProviderData) {
    if (state.storedUser && providerData) {
      state.storedUser.providers.push(providerData)
    }
  },
  removeProvider(state, providerType: ProviderType) {
    if (state.storedUser) {
      const index = state.storedUser.providers.findIndex((providerData) => providerData.providerType === providerType)

      if (index > -1) {
        state.storedUser.providers.splice(index, 1)
      }
    }
  }
}

export const actions: ActionTree<AuthState, RootState> = {
  async saveUser({ commit }, storedUser: StoredUser) {
    commit('setStoredUser', storedUser);
  },
  async saveRememberMe({ commit }, rememberMe: boolean) {
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
        // save user to db
        await saveUser({
          id: userCredential.user?.uid as string,
          name: credentials.name,
          profilePhoto: DefaultProfilePhoto,
          coverPhoto: DefaultCoverPhoto
        })
        return userCredential;
      })
      .then(async (userCredential: UserCredential) => {
        // update user display name on firebase authentication
        await userCredential?.user
          ?.updateProfile({
            displayName: credentials.name
          })
          .then(() => {
            commit('setName', credentials.name)
          })
        return userCredential;
      })
      .then(async (userCredential: UserCredential) => {
        // send verification mail
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

  async updateProfilePhoto({ commit, dispatch }, profilePhoto: Image) {
    await auth.currentUser
      ?.updateProfile({
        photoURL: profilePhoto.src
      })
      .then(() => {
        saveUser({
          id: auth.currentUser?.uid as string,
          profilePhoto
        })
      })
      .then(() => {
        commit('setProfilePhoto', profilePhoto)
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async updateCoverPhoto({ commit, dispatch }, coverPhoto: Image) {
    await saveUser({
      id: auth.currentUser?.uid,
      coverPhoto: coverPhoto
    }).then((user) => {
      console.log('updateCoverPhoto: ', user)
      // commit('setCoverPhoto', coverPhoto);
    })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async signInWithSocialProvider({ dispatch }, credentials: SocialLoginCredentials) {
    let authProvider = getAuthProvider(credentials.providerType);
    let persistence = credentials.rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
    await auth.setPersistence(persistence)
      .then(async () => {
        await auth.signInWithPopup(authProvider)
          .then(async (userCredential) => {
            await saveUser({
              id: userCredential.user?.uid as string,
              name: userCredential.user?.displayName as string,
              profilePhoto: DefaultProfilePhoto,
              coverPhoto: DefaultCoverPhoto
            })
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
      .then((userCredential) => {

        let userInfo = userCredential.user?.providerData
          ?.find((userInfo) => userInfo?.providerId == ProviderType.PASSWORD)

        commit('addProvider', getProviderData(userInfo))

        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.PASSWORD)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async linkSocialProvider({ dispatch, commit }, providerType: ProviderType) {
    let authProvider = getAuthProvider(providerType);
    return auth.currentUser?.linkWithPopup(authProvider)
      .then((userCredential) => {

        let userInfo = userCredential.user?.providerData
          ?.find((userInfo) => userInfo?.providerId == providerType)

        commit('addProvider', getProviderData(userInfo))

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
