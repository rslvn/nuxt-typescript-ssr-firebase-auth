import { auth } from '~/plugins/fire-init-plugin'
import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { User } from 'firebase';
import { Store } from 'vuex';
import { Location, Route } from 'vue-router';
import {
  AppCookie,
  RouteQueryParameters,
  RouteType,
  sessionCookieOptionsDev,
  sessionCookieOptionsProd,
  StoreConfig
} from '~/types';
import { authenticatedAllowed, authenticatedNotAllowed } from '~/service/global-service';
import { getStoredUser } from '~/service/firebase/firebase-service';

const logout = (store: Store<any>) => {
  store.dispatch(StoreConfig.auth.logout, true).then(() => {
    console.log('the user is forced to logout')
  });
}

const getNextRoute = (route: Route): Location => {
  let path: string = route.query[RouteQueryParameters.NEXT] as string;
  if (path) {
    return { path }
  }

  if (authenticatedNotAllowed(route) || route.path == RouteType.ACTION.path) {
    return RouteType.PROFILE
  }

  return { path: route.fullPath }
}

const setRememberMe = (store: Store<any>, app: NuxtAppOptions) => {
  let rememberMe = app.$cookies.get(AppCookie.REMEMBER_ME);
  store.dispatch(StoreConfig.auth.saveRememberMe, rememberMe === undefined ? true : rememberMe);
}

const firebaseAuthListenerPlugin: Plugin = ({ store, app, route, redirect }) => {

  setRememberMe(store, app);

  auth.onAuthStateChanged((firebaseUser: User | null) => {
    return new Promise((resolve) => {
      if (store.state.auth.forceLogout) {
        logout(store)
        return resolve()
      }

      let storedUser = getStoredUser(firebaseUser)
      store.commit(StoreConfig.auth.setStoredUser, storedUser)

      if (firebaseUser) {
        // console.log('Firebase user: ', firebaseUser)
        let cookieOptions = process.env.NODE_ENV === 'development' ? sessionCookieOptionsDev : sessionCookieOptionsProd;
        firebaseUser.getIdToken()
          .then((token: string) => app.$cookies.set(AppCookie.TOKEN, token, cookieOptions))

        redirect(getNextRoute(route))

      } else {
        app.$cookies.remove(AppCookie.TOKEN);
        if (authenticatedAllowed(route)) {
          redirect(RouteType.LOGIN)
        }
      }
      resolve()
    })
  })
}

export default firebaseAuthListenerPlugin
