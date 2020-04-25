import { auth } from '~/plugins/fire-init-plugin'
import { Plugin } from '@nuxt/types'
import { User } from 'firebase';
import { getStoredUser } from '~/lib/helper/firebaseHelper';
import { AppCookie, RouteType } from "~/types";
import { Store } from 'vuex';
import { Location, Route } from 'vue-router';
import { routesForNotLoggedInUsers } from "~/lib/helper/global-helpers";

const saveUserAction = 'auth/setUser'
const logoutAction = 'auth/logout'

const logout = (store: Store<any>) => {
  store.dispatch(logoutAction, true).then(() => {
    console.log('the user is forced to logout')
  });
}

const getNextRoute = (route: Route): Location => {

  let path: string = route.query.next as string;

  return path ? { path } :
    (routesForNotLoggedInUsers(route) ? RouteType.HOME : { path: route.fullPath })
}

const firebaseAuthListenerPlugin: Plugin = ({ store, app, route, redirect }) => {
  auth.onAuthStateChanged((firebaseUser: User | null) => {

    console.log('Route in plugin: ', route.fullPath, route.query)

    return new Promise((resolve) => {
      if (store.state.auth.forceLogout) {
        logout(store)
        resolve()
        return
      }

      const storedUser = getStoredUser(firebaseUser)
      // log('firebaseUser: ', firebase storedUser)
      store.commit(saveUserAction, storedUser)

      if (firebaseUser) {
        firebaseUser.getIdToken()
          .then((token: string) => app.$cookies.set(AppCookie.token, token, { sameSite: 'Lax' }))

        let next = getNextRoute(route);

        redirect(next)

      } else {
        app.$cookies.remove(AppCookie.token);
        if (route.path === RouteType.ACCOUNT.path) {
          redirect(RouteType.LOGIN)
        }
      }
      resolve()
    })
  })
}

export default firebaseAuthListenerPlugin
