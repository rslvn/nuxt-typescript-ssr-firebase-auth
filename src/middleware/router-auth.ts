import { Middleware } from '@nuxt/types'
import { AuthUser, QueryParameters, Routes } from '~/types'
import { authenticatedAllowed, authenticatedNotAllowed, getUserRoute, } from '~/service/global-service'

const routerAuthMiddleware: Middleware = ({ store, redirect, route }) => {
  console.log('routerAuthMiddleware fullPath', route.fullPath)
  const authUser = store.state.auth?.authUser as AuthUser;
  if (authUser) {
    if (authenticatedNotAllowed(route)) {
      redirect(getUserRoute(Routes.PROFILE_DYNAMIC, authUser.username))
    }
    console.log('let it go')
  } else {
    if (authenticatedAllowed(route)) {
      redirect({
        ...Routes.LOGIN,
        query: {
          [QueryParameters.NEXT]: route.fullPath,
        },
      })
    }
  }
}

export default routerAuthMiddleware
