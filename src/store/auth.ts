import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from 'firebase/app'
import { AppCookie, AuthUser, Image, PrivacyType, ProviderType } from 'types-module'
import {
  AuthState,
  cookieOptions,
  DefaultCoverPhoto,
  DefaultProfilePhoto,
  LocalStorageKey,
  LoginCredentials,
  RegistrationCredentials,
  RootState,
  Routes,
  SocialLoginCredentials
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
import { getProviderOption, refreshToken, updateProfile } from '~/service/firebase/firebase-service'
import { handleError } from '~/service/error-service'
import { reauthenticateObservable } from '~/service/rx-service'
import { getAvailableUsername, getUser, saveUser } from '~/service/firebase/firestore'
import { authClaims } from '~/service/api-service'
import { deleteUserDeviceByToken } from '~/service/firebase/firestore/user-device-collection'
import { generateUsername } from '~/service/global-service'
import UserCredential = firebase.auth.UserCredential
import ActionCodeInfo = firebase.auth.ActionCodeInfo
import Persistence = firebase.auth.Auth.Persistence
import EmailAuthProvider = firebase.auth.EmailAuthProvider

export const state = (): AuthState => ({
  authUser: undefined,
  forceLogout: false,
  rememberMe: true
})

export const getters: GetterTree<AuthState, RootState> = {
  authUser: state => state.authUser,
  rememberMe: state => state.rememberMe
}

export const mutations: MutationTree<AuthState> = {
  setAuthUser(state, authUser: AuthUser) {
    if (authUser && !authUser.profilePhoto) {
      authUser.profilePhoto = DefaultProfilePhoto
    }
    state.authUser = authUser
  },

  forceLogout(state, forceLogout: boolean) {
    state.forceLogout = forceLogout
  },

  setRememberMe(state, rememberMe: boolean) {
    state.rememberMe = rememberMe
  }
}

export const actions: ActionTree<AuthState, RootState> = {

  saveRememberMe({ commit }, rememberMe: boolean) {
    this.$cookies.set(AppCookie.REMEMBER_ME, rememberMe, cookieOptions)
    commit('setRememberMe', rememberMe)
  },

  async signInWithEmail({ dispatch }, credentials: LoginCredentials) {
    const persistence = credentials.rememberMe ? Persistence.LOCAL : Persistence.SESSION
    await auth.setPersistence(persistence)
      .then(async () => {
        await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async reauthenticateWithCredential({ dispatch }, credentials: LoginCredentials) {
    const authCredential = EmailAuthProvider.credential(credentials.email, credentials.password)
    await auth.currentUser?.reauthenticateWithCredential(authCredential)
      .then(() => {
        reauthenticateObservable.next()
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async signUpWithEmail({ dispatch }, credentials: RegistrationCredentials) {
    await auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (userCredential: UserCredential) => {
        // save user to db
        const id = userCredential.user?.uid as string
        const username = await getAvailableUsername(generateUsername(userCredential.user.email))
        await updateProfile(credentials.name, DefaultProfilePhoto.src)
          .then(async () => await authClaims(this.$axios, username))
          .then(() => refreshToken())

        await saveUser({
          id,
          name: credentials.name,
          email: credentials.email,
          username,
          privacy: PrivacyType.PUBLIC,
          followersPrivacy: PrivacyType.PUBLIC,
          followingPrivacy: PrivacyType.PUBLIC,
          profilePhoto: DefaultProfilePhoto,
          coverPhoto: DefaultCoverPhoto
        })

        return userCredential
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

  async updateProfilePhoto({ dispatch }, profilePhoto: Image) {
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
      .then(() => refreshToken())
      .catch((error: Error) => handleError(dispatch, error))
  },

  async signInWithSocialProvider({ dispatch }, socialLoginCredentials: SocialLoginCredentials) {
    const authProvider = getAuthProvider(socialLoginCredentials.providerType)
    const persistence = socialLoginCredentials.rememberMe ? Persistence.LOCAL : Persistence.SESSION
    await auth.setPersistence(persistence)
      .then(async () => {
        await auth.signInWithPopup(authProvider)
          .then(async (userCredential) => {
            const id = userCredential.user?.uid as string
            await getUser(id)
              .then(user => !!user)
              .then(async (userExists) => {
                if (userExists) {
                  return
                }

                const name = userCredential.user?.displayName as string
                const username = await getAvailableUsername(generateUsername(name))
                const photo = userCredential.user?.photoURL as string

                await authClaims(this.$axios, username)
                  .then(() => refreshToken())

                await saveUser({
                  id,
                  name,
                  username,
                  privacy: PrivacyType.PUBLIC,
                  followersPrivacy: PrivacyType.PUBLIC,
                  followingPrivacy: PrivacyType.PUBLIC,
                  profilePhoto: {
                    src: photo,
                    alt: `Profile photo of ${name}`
                  },
                  coverPhoto: DefaultCoverPhoto
                })
              })
          })
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async reauthenticateWithSocialProvider({ dispatch }, socialLoginCredentials: SocialLoginCredentials) {
    const authProvider = getAuthProvider(socialLoginCredentials.providerType)
    await auth.currentUser?.reauthenticateWithPopup(authProvider)
      .then(() => {
        reauthenticateObservable.next()
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

  handleSendingEmailVerificationCode({ dispatch }) {
    return auth.currentUser?.sendEmailVerification()
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.verifyMailSent', { email: auth.currentUser?.email }))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async sendPasswordResetEmail({ dispatch }, emailAddress: string) {
    return await auth.sendPasswordResetEmail(emailAddress)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.sendPasswordResetEmail'))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async confirmPasswordReset({ dispatch }, { actionCode, password }) {
    return await auth.confirmPasswordReset(actionCode, password)
      .then(async () => {
        await sendNotification(dispatch, getSuccessNotificationMessage(this.$i18n.t('notification.confirmPasswordReset')))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async handleVerifyEmail({ dispatch }, actionCode: string) {
    return await auth.applyActionCode(actionCode)
      .then(async () => {
        await refreshToken()
      })
      .then(async () => {
        await sendNotification(dispatch, getSuccessNotificationMessage(this.$i18n.t('notification.mailVerified')))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async handleVerifyPasswordResetCode({ dispatch }, actionCode: string) {
    return await auth.verifyPasswordResetCode(actionCode)
      .then(() => {
        showInfoToaster(this.$i18n.t('notification.passwordResetVerified'))
        return true
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async handleRecoverEmail({ dispatch }, actionCode: string) {
    return await auth.checkActionCode(actionCode)
      .then(async (info: ActionCodeInfo) => {
        await auth.applyActionCode(actionCode)
          .then(() => console.log('Action applied'))
        return info.data.email
      }).then((email: string|null|undefined) => {
        if (email) {
          auth.sendPasswordResetEmail(email)
            .then(() => console.log('PasswordResetEmail sent'))
        }
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  linkPassword({ dispatch }, credentials: LoginCredentials) {
    const authCredential = firebase.auth.EmailAuthProvider.credential(credentials.email, credentials.password)

    return auth.currentUser?.linkWithCredential(authCredential)
      .then(async (userCredential) => {
        await saveUser({
          id: userCredential.user?.uid as string,
          email: userCredential.user?.email as string
        })
      }).then(async () => {
        await refreshToken()
      }).then(() => {
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(ProviderType.PASSWORD)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async linkSocialProvider({ dispatch }, providerType: ProviderType) {
    const authProvider = getAuthProvider(providerType)
    return await auth.currentUser?.linkWithPopup(authProvider)
      .then(async () => {
        await refreshToken()
      })
      .then(() => {
        showSuccessToaster(this.$i18n.t('notification.providerLinked', getProviderOption(providerType)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async unlinkProvider({ dispatch }, providerType: ProviderType) {
    return await auth.currentUser?.unlink(providerType)
      .then(async () => {
        await refreshToken()
      }).then(() => {
        showSuccessToaster(this.$i18n.t('notification.providerUnlinked', getProviderOption(providerType)))
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async logout({ dispatch, commit }) {
    const fcmToken = localStorage.getItem(LocalStorageKey.FCM_TOKEN)
    if (fcmToken) {
      await deleteUserDeviceByToken(fcmToken)
    }

    return await auth.signOut()
      .then(() => {
        this.$router.push(Routes.LOGIN)
        commit('forceLogout', false)
      })
      .catch((error: Error) => handleError(dispatch, error))
  }

}
