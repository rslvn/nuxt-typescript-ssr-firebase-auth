import { auth } from '~/plugins/fire-init-plugin'
import { Plugin } from '@nuxt/types'
import { User } from 'firebase';
import { Store } from 'vuex';
import { Location, Route } from 'vue-router';
import { AppCookie, RouteQueryParameters, RouteType, sessionCookieOptions, StoreConfig } from '~/types';
import { authenticatedAllowed, authenticatedNotAllowed } from '~/service/helper/global-helpers';
import { getStoredUser } from '~/service/helper/firebaseHelper';

const logout = (store: Store<any>) => {
  store.dispatch(StoreConfig.auth.logout, true).then(() => {
    console.log('the user is forced to logout')
  });
}

const getNextRoute = (route: Route): Location => {
  let path: string = route.query[RouteQueryParameters.next] as string;
  if (path) {
    return { path }
  }

  if (authenticatedNotAllowed(route) || route.path == RouteType.ACTION.path) {
    return RouteType.ACCOUNT
  }

  return { path: route.fullPath }
}

const firebaseAuthListenerPlugin: Plugin = ({ store, app, route, redirect }) => {

  let rememberMe = app.$cookies.get(AppCookie.rememberMe);
  store.dispatch(StoreConfig.auth.saveRememberMe, rememberMe === undefined ? true : rememberMe);

  auth.onAuthStateChanged((firebaseUser: User | null) => {
    return new Promise((resolve) => {
      if (store.state.auth.forceLogout) {
        logout(store)
        return resolve()
      }

      let storedUser = getStoredUser(firebaseUser)
      store.commit(StoreConfig.auth.setUser, storedUser)

      if (firebaseUser) {
        firebaseUser.getIdToken()
          .then((token: string) => app.$cookies.set(AppCookie.token, token, sessionCookieOptions))

        redirect(getNextRoute(route))

      } else {
        app.$cookies.remove(AppCookie.token);
        if (authenticatedAllowed(route)) {
          redirect(RouteType.LOGIN)
        }
      }
      resolve()
    })
  })
}

export default firebaseAuthListenerPlugin
