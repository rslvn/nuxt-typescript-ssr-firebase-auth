import { Middleware } from '@nuxt/types'
import { QueryParameters, Routes } from '~/types'
import { authenticatedAllowed, authenticatedNotAllowed, } from '~/service/global-service'

const routerAuthMiddleware: Middleware = ({ store, redirect, route }) => {
  console.log('routerAuthMiddleware', route.fullPath, route.query)
  if (store.state.auth.authUser) {
    if (authenticatedNotAllowed(route)) {
      redirect(Routes.PROFILE)
    }
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
