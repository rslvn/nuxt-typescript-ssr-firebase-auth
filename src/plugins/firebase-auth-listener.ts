import { auth } from '~/plugins/fire-init-plugin'
import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { User } from 'firebase';
import { Store } from 'vuex';
import { Location, Route } from 'vue-router';
import {
  AppCookie,
  AuthUser,
  FirebaseClaimKey,
  QueryParameters,
  Routes,
  sessionCookieOptionsDev,
  sessionCookieOptionsProd,
  StoreConfig
} from '~/types';
import { authenticatedAllowed, authenticatedNotAllowed } from '~/service/global-service';
import { getAuthUser } from '~/service/firebase/firebase-service';

const logout = (store: Store<any>) => {
  store.dispatch(StoreConfig.auth.logout, true).then(() => {
    console.log('the user is forced to logout')
  });
}

const getNextRoute = (route: Route): Location => {
  let path: string = route.query[QueryParameters.NEXT] as string;
  if (path) {
    return { path }
  }

  if (authenticatedNotAllowed(route) || route.path == Routes.ACTION.path) {
    return Routes.PROFILE
  }

  return { path: route.fullPath }
}

const setRememberMe = (store: Store<any>, app: NuxtAppOptions) => {
  let rememberMe = app.$cookies.get(AppCookie.REMEMBER_ME);
  store.dispatch(StoreConfig.auth.saveRememberMe, rememberMe === undefined ? true : rememberMe);
}

const updateAuthStore = (firebaseUser: User | null, store: Store<any>) => {
  if (!firebaseUser) {
    store.commit(StoreConfig.auth.setAuthUser, null)
  }
  firebaseUser?.getIdTokenResult()
    .then((idTokenResult) => {
      let authUser = getAuthUser(firebaseUser) as AuthUser
      if (authUser) {
        console.log('idTokenResult.claims', idTokenResult.claims)
        authUser.username = idTokenResult.claims[FirebaseClaimKey.USERNAME]
        store.commit(StoreConfig.auth.setAuthUser, authUser)
      }
    })
}

let cookieOptions = process.env.NODE_ENV === 'development' ? sessionCookieOptionsDev : sessionCookieOptionsProd;

const firebaseAuthListenerPlugin: Plugin = ({ store, app, route, redirect }) => {

  setRememberMe(store, app);

  auth.onAuthStateChanged((firebaseUser: User | null) => {
    return new Promise((resolve) => {
      if (store.state.auth.forceLogout) {
        logout(store)
        return resolve()
      }

      console.log('firebaseAuthListenerPlugin called with a user: ', !!firebaseUser)

      updateAuthStore(firebaseUser, store);

      if (firebaseUser) {
        // console.log('Firebase user: ', firebaseUser)
        //
        firebaseUser.getIdToken()
          .then((token: string) => {
            app.$axios.setToken(token, 'Bearer')
            app.$cookies.set(AppCookie.TOKEN, token, cookieOptions)
          })

        redirect(getNextRoute(route))

      } else {
        app.$cookies.remove(AppCookie.TOKEN);
        app.$axios.setToken(false)
        if (authenticatedAllowed(route)) {
          redirect(Routes.LOGIN)
        }
      }
      resolve()
    })
  })

  auth.onIdTokenChanged((firebaseUser: User | null) => {
    console.log('onIdTokenChanged with a user: ', !!firebaseUser)
    if (!firebaseUser) {
      return;
    }
    updateAuthStore(firebaseUser, store);

    firebaseUser.getIdToken()
      .then((token: string) => {
        app.$axios.setToken(token, 'Bearer')
        app.$cookies.set(AppCookie.TOKEN, token, cookieOptions)
      })
  })
}

export default firebaseAuthListenerPlugin
