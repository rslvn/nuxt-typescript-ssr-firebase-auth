import { Middleware } from "@nuxt/types";
import { RouteQueryParameters, RouteType } from "~/types";
import { authenticatedAllowed, authenticatedNotAllowed } from "~/service/helper/global-helpers";

const routerAuthMiddleware: Middleware = ({ store, redirect, route }) => {
  if (store.state.auth.user) {
    if (authenticatedNotAllowed(route)) {
      redirect(RouteType.ACCOUNT)
    }
  } else {
    if (authenticatedAllowed(route)) {
      redirect({
          ...RouteType.LOGIN,
          query: {
            [RouteQueryParameters.next]: route.fullPath
          }
        }
      )
    }
  }
};

export default routerAuthMiddleware
