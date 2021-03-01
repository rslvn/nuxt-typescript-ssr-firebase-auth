import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { User } from 'firebase'
import { Store } from 'vuex'
import { Location, Route } from 'vue-router'
import { AppCookie, AppTokenType, AuthUser, FirebaseClaimKey } from 'types-module'
import { auth } from '~/plugins/fire-init-plugin'
import {
  LocalStorageKey,
  LOGIN,
  QueryParameters,
  Routes,
  sessionCookieOptionsDev,
  sessionCookieOptionsProd,
  StoreConfig
} from '~/types'
import { authenticatedAllowed, authenticatedNotAllowed, getUserRoute } from '~/service/global-service'
import { getAuthUser } from '~/service/firebase/firebase-service'
import { configureAxiosObservable, configureFcmObservable, loadNotificationObservable } from '~/service/rx-service'

const forceLogout = (store: Store<any>) => {
  store.dispatch(StoreConfig.auth.logout, true)
    .then(() => {
      console.log('the user is forced to logout')
    })
}

const getNextRoute = (route: Route, authUser: AuthUser): Location => {
  const path: string = route.query[QueryParameters.NEXT] as string
  console.log(`firebaseAuthListenerPlugin next: ${path}, fullPath: ${route.fullPath}, route.path: ${route.path}`)
  if (path) {
    return { path }
  }

  if (authenticatedNotAllowed(route) || route.path === Routes.ACTION.path) {
    return getUserRoute(Routes.PROFILE_DYNAMIC, authUser.username)
  }

  return { path: route.fullPath }
}

const setRememberMe = async (store: Store<any>, app: NuxtAppOptions) => {
  const rememberMe = app.$cookies.get(AppCookie.REMEMBER_ME)
  await store.dispatch(StoreConfig.auth.saveRememberMe, rememberMe === undefined ? true : rememberMe)
}

const updateAuthStore = async (firebaseUser: User, store: Store<any>) => {
  if (!firebaseUser) {
    store.commit(StoreConfig.auth.setAuthUser, null)
    return null
  }

  return await firebaseUser.getIdTokenResult()
    .then((idTokenResult) => {
      const authUser = getAuthUser(firebaseUser) as AuthUser
      if (authUser) {
        authUser.username = idTokenResult.claims[FirebaseClaimKey.USERNAME]
        store.commit(StoreConfig.auth.setAuthUser, authUser)
      }
      return authUser
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

  auth.onAuthStateChanged((firebaseUser: User) => {
    return store.dispatch(StoreConfig.loading.saveLoading, true)
      .then(async () => {
        if (store.state.auth.forceLogout) {
          forceLogout(store)
          return
        }

        console.log('firebaseAuthListenerPlugin called with a user: ', !!firebaseUser)
        const authUser = await updateAuthStore(firebaseUser, store)

        if (firebaseUser) {
          await firebaseUser.getIdToken()
            .then((token: string) => {
              app.$axios.setToken(token, AppTokenType)
              app.$cookies.set(AppCookie.TOKEN, token, cookieOptions)
              loadNotificationObservable.next()
              configureFcmObservable.next()
            })

          redirect(getNextRoute(route, authUser))
        } else {
          logoutActions(store, app)
          if (authenticatedAllowed(route)) {
            location.replace(LOGIN.path)
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
