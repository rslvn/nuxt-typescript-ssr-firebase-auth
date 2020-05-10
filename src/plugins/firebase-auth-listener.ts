import { auth } from '~/plugins/fire-init-plugin'
import { Plugin } from '@nuxt/types'
import { User } from 'firebase';
import { Store } from 'vuex';
import { Location, Route } from 'vue-router';
import { AppCookie, RouteQueryParameters, RouteType } from "~/types";
import { authenticatedAllowed, authenticatedNotAllowed } from "~/service/helper/global-helpers";
import { getStoredUser } from '~/service/helper/firebaseHelper';
import { CookieSerializeOptions } from "cookie";

const saveUserAction = 'auth/setUser'
const logoutAction = 'auth/logout'

const logout = (store: Store<any>) => {
  store.dispatch(logoutAction, true).then(() => {
    console.log('the user is forced to logout')
  });
}

const getNextRoute = (route: Route): Location => {
  console.log('getNextRoute', route.fullPath, route.query)
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

  let cookieOptions: CookieSerializeOptions = { sameSite: 'lax' }

  let rememberMe = app.$cookies.get(AppCookie.rememberMe);
  if (rememberMe == undefined) {
    app.$cookies.set(AppCookie.rememberMe, true, cookieOptions)
  }

  auth.onAuthStateChanged((firebaseUser: User | null) => {
    return new Promise((resolve) => {
      if (store.state.auth.forceLogout) {
        logout(store)
        return resolve()
      }

      let storedUser = getStoredUser(firebaseUser)
      store.commit(saveUserAction, storedUser)

      if (firebaseUser) {
        firebaseUser.getIdToken()
          .then((token: string) => app.$cookies.set(AppCookie.token, token, cookieOptions))

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
