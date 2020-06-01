import { Middleware } from '@nuxt/types'
import { RouteQueryParameters, RouteType } from '~/types'
import {
  authenticatedAllowed,
  authenticatedNotAllowed,
} from '~/service/global-service'

const routerAuthMiddleware: Middleware = ({ store, redirect, route }) => {
  console.log('routerAuthMiddleware', route.fullPath, route.query)
  if (store.state.auth.storedUser) {
    if (authenticatedNotAllowed(route)) {
      redirect(RouteType.PROFILE)
    }
  } else {
    if (authenticatedAllowed(route)) {
      redirect({
        ...RouteType.LOGIN,
        query: {
          [RouteQueryParameters.NEXT]: route.fullPath,
        },
      })
    }
  }
}

export default routerAuthMiddleware
