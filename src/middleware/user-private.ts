import { Middleware } from '@nuxt/types'
import { AuthUser, RouteParameters, Routes } from '~/types'

const userPrivateMiddleware: Middleware = ({ store, redirect, route }) => {
  const authUser = store.state.auth?.authUser as AuthUser
  const usernameParam = route.params[RouteParameters.USERNAME]
  console.log('userPrivateMiddleware', usernameParam, authUser)
  // The user not logged in or tries to go to the other user's private page
  if (!authUser || !usernameParam || (authUser.username !== usernameParam)) {
    console.log('The page is private')
    redirect(Routes.HOME)
  }
}

export default userPrivateMiddleware
