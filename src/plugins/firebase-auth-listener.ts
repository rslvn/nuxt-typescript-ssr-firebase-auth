import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { User } from 'firebase'
import { Store } from 'vuex'
import { Location, Route } from 'vue-router'
import { AppCookie, AppTokenType, AuthUser, FirebaseClaimKey } from 'types-module'
import { auth } from '~/plugins/fire-init-plugin'
import {
  LocalStorageKey,
  QueryParameters,
  Routes,
  sessionCookieOptionsDev,
  sessionCookieOptionsProd,
  StoreConfig
} from '~/types'
import { authenticatedAllowed, authenticatedNotAllowed } from '~/service/global-service'
import { getAuthUser } from '~/service/firebase/firebase-service'
import { configureAxiosObservable, configureFcmObservable, loadNotificationObservable } from '~/service/rx-service'

const forceLogout = (store: Store<any>) => {
  store.dispatch(StoreConfig.auth.logout, true).then(() => {
    console.log('the user is forced to logout')
  })
}

const getNextRoute = (route: Route): Location => {
  const path: string = route.query[QueryParameters.NEXT] as string
  if (path) {
    return { path }
  }

  if (authenticatedNotAllowed(route) || route.path === Routes.ACTION.path) {
    return Routes.PROFILE
  }

  return { path: route.fullPath }
}

const setRememberMe = async (store: Store<any>, app: NuxtAppOptions) => {
  const rememberMe = app.$cookies.get(AppCookie.REMEMBER_ME)
  await store.dispatch(StoreConfig.auth.saveRememberMe, rememberMe === undefined ? true : rememberMe)
}

const updateAuthStore = async (firebaseUser: User|null, store: Store<any>) => {
  if (!firebaseUser) {
    store.commit(StoreConfig.auth.setAuthUser, null)
  }
  return await firebaseUser?.getIdTokenResult()
    .then((idTokenResult) => {
      const authUser = getAuthUser(firebaseUser) as AuthUser
      if (authUser) {
        authUser.username = idTokenResult.claims[FirebaseClaimKey.USERNAME]
        store.commit(StoreConfig.auth.setAuthUser, authUser)
      }
    })
}

const clearStore = (store: Store<any>) => {
  store.dispatch(StoreConfig.notification.clearNotificationMessage)
}

const logoutActions = (store: Store<any>, app: NuxtAppOptions) => {
  app.$cookies.remove(AppCookie.TOKEN)
  app.$axios.setToken(false)
  clearStore(store)
  localStorage.removeItem(LocalStorageKey.FCM_TOKEN)
  configureAxiosObservable.next()
}
const cookieOptions = process.env.NODE_ENV === 'development' ? sessionCookieOptionsDev : sessionCookieOptionsProd

const firebaseAuthListenerPlugin: Plugin = ({ store, app, route, redirect }) => {
  setRememberMe(store, app)
    .catch((error: Error) => {
      console.log(error)
    })

  auth.onAuthStateChanged((firebaseUser: User|null) => {
    return store.dispatch(StoreConfig.loading.saveLoading, true)
      .then(async () => {
        if (store.state.auth.forceLogout) {
          forceLogout(store)
          return
        }

        console.log('firebaseAuthListenerPlugin called with a user: ', !!firebaseUser)

        await updateAuthStore(firebaseUser, store)
          .catch((error: Error) => {
            console.log(error)
          })

        if (firebaseUser) {
          await firebaseUser.getIdToken()
            .then((token: string) => {
              app.$axios.setToken(token, AppTokenType)
              app.$cookies.set(AppCookie.TOKEN, token, cookieOptions)
              loadNotificationObservable.next()
              configureFcmObservable.next()
            })

          redirect(getNextRoute(route))
        } else {
          logoutActions(store, app)
          if (authenticatedAllowed(route)) {
            redirect(Routes.LOGIN)
          }
        }
      })
      .finally(() => store.dispatch(StoreConfig.loading.saveLoading, false))
  })

  auth.onIdTokenChanged((firebaseUser: User|null) => {
    store.dispatch(StoreConfig.loading.saveLoading, true)
      .then(() => {
        console.log('onIdTokenChanged with a user: ', !!firebaseUser)
        if (!firebaseUser) {
          return
        }
        updateAuthStore(firebaseUser, store)

        firebaseUser.getIdToken()
          .then((token: string) => {
            app.$axios.setToken(token, AppTokenType)
            app.$cookies.set(AppCookie.TOKEN, token, cookieOptions)
          })
      })
      .finally(() => store.dispatch(StoreConfig.loading.saveLoading, false))
  })
}

export default firebaseAuthListenerPlugin
