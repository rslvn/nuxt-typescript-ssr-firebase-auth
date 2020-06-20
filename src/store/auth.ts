import { ActionTree, GetterTree, MutationTree } from 'vuex'
import firebase from 'firebase'
import {
  AppCookie,
  AuthState,
  AuthUser,
  cookieOptions,
  DefaultCoverPhoto,
  DefaultProfilePhoto,
  Image,
  LoginCredentials,
  ProviderData,
  ProviderType,
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
import { getProviderData, getProviderOption, refreshToken, updateProfile } from "~/service/firebase/firebase-service";
import { handleError } from "~/service/error-service";
import { reauthenticateObservable } from '~/service/rx-service';
import { getUser, saveUser } from '~/service/firebase/firestore';
import { authClaims } from '~/service/api-service';
import UserCredential = firebase.auth.UserCredential;
import ActionCodeInfo = firebase.auth.ActionCodeInfo;
import Persistence = firebase.auth.Auth.Persistence;
import EmailAuthProvider = firebase.auth.EmailAuthProvider;

export const state = (): AuthState => ({
  authUser: undefined,
  forceLogout: false,
  rememberMe: true,
})

export const getters: GetterTree<AuthState, RootState> = {
  authUser: (state) => state.authUser,
  rememberMe: (state) => state.rememberMe
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
  },
  setVerified(state) {
    if (state.authUser) {
      state.authUser.verified = true
    }
  },
  setName(state, name: string) {
    if (state.authUser) {
      state.authUser.name = name
    }
  },

  setProfilePhoto(state, profilePhoto: Image) {
    if (state.authUser) {
      state.authUser.profilePhoto = profilePhoto
      let provider = state.authUser.providers.find((providerData) => providerData.providerType === ProviderType.PASSWORD)
      if (provider) {
        provider.photoURL = profilePhoto.src
      }
    }
  },

  addProvider(state, providerData: ProviderData) {
    if (state.authUser && providerData) {
      state.authUser.providers.push(providerData)
    }
  },
  removeProvider(state, providerType: ProviderType) {
    if (state.authUser) {
      const index = state.authUser.providers.findIndex((providerData) => providerData.providerType === providerType)

      if (index > -1) {
        state.authUser.providers.splice(index, 1)
      }
    }
  },
}

export const actions: ActionTree<AuthState, RootState> = {

  async saveRememberMe({ commit }, rememberMe: boolean) {
    this.$cookies.set(AppCookie.REMEMBER_ME, rememberMe, cookieOptions)
    commit('setRememberMe', rememberMe);
  },

  async saveName({ dispatch, commit }, name: string) {
    await auth.currentUser
      ?.updateProfile({
        displayName: name
      })
      .then(() => commit('setName', name))
  },

  async signInWithEmail({ dispatch }, credentials: LoginCredentials) {
    let persistence = credentials.rememberMe ? Persistence.LOCAL : Persistence.SESSION;
    await auth.setPersistence(persistence)
      .then(async () => {
        await auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async reauthenticateWithCredential({ dispatch }, credentials: LoginCredentials) {
    let authCredential = EmailAuthProvider.credential(credentials.email, credentials.password);
    await auth.currentUser?.reauthenticateWithCredential(authCredential)
      .then(() => {
        reauthenticateObservable.next()
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async signUpWithEmail({ commit, dispatch }, credentials: RegistrationCredentials) {
    await auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (userCredential: UserCredential) => {
        // save user to db
        let id = userCredential.user?.uid as string;
        await updateProfile(credentials.name, DefaultProfilePhoto.src)
          .then(async () => await authClaims(this.$axios, id))
          .then(() => refreshToken())

        await saveUser({
          id,
          name: credentials.name,
          email: credentials.email,
          username: id,
          profilePhoto: DefaultProfilePhoto,
          coverPhoto: DefaultCoverPhoto
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
      .then(() => commit('setProfilePhoto', profilePhoto))
      .catch((error: Error) => handleError(dispatch, error))
  },

  async signInWithSocialProvider({ dispatch }, socialLoginCredentials: SocialLoginCredentials) {
    let authProvider = getAuthProvider(socialLoginCredentials.providerType);
    let persistence = socialLoginCredentials.rememberMe ? Persistence.LOCAL : Persistence.SESSION;
    await auth.setPersistence(persistence)
      .then(async () => {
        await auth.signInWithPopup(authProvider)
          .then(async (userCredential) => {
            let id = userCredential.user?.uid as string;
            await getUser(id)
              .then((user) => !!user)
              .then(async (userExists) => {
                if (userExists) {
                  return;
                }

                let name = userCredential.user?.displayName as string
                let photo = userCredential.user?.photoURL as string

                await authClaims(this.$axios, id)
                  .then(() => refreshToken())

                await saveUser({
                  id,
                  name,
                  username: id,
                  profilePhoto: {
                    src: photo,
                    alt: `Profile photo of ${name}`
                  },
                  coverPhoto: DefaultCoverPhoto,
                })
              })
          })
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

  async reauthenticateWithSocialProvider({ dispatch }, socialLoginCredentials: SocialLoginCredentials) {
    let authProvider = getAuthProvider(socialLoginCredentials.providerType);
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
      .then(async (userCredential) => {
        await saveUser({
          id: userCredential.user?.uid as string,
          email: userCredential.user?.email as string
        })
        return userCredential

      }).then(async (userCredential) => {
        let userInfo = userCredential.user?.providerData
          ?.find((userInfo) => userInfo?.providerId == ProviderType.PASSWORD)
        commit('addProvider', getProviderData(userInfo))

      }).then(async () => {
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
        this.$router.push(Routes.LOGIN)
        commit('forceLogout', false);
      })
      .catch((error: Error) => handleError(dispatch, error))
  },

}
