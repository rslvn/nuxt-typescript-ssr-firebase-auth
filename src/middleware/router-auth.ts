import { Middleware } from "@nuxt/types";
import { RouteType } from "~/types";
import { routesForLoggedInUsers, routesForNotLoggedInUsers } from "~/service/helper/global-helpers";

const authRouterMiddleware: Middleware = ({ store, redirect, route }) => {
  if (store.state.auth.user) {
    // console.log('routesForNotLoggedInUsers: ', routesForNotLoggedInUsers(route), route.path);
    if (routesForNotLoggedInUsers(route)) {
      redirect(RouteType.ACCOUNT)
    }
  } else {
    // console.log('routesForLoggedInUsers: ', routesForLoggedInUsers(route), route.path);
    if (routesForLoggedInUsers(route)) {
      redirect({
          ...RouteType.LOGIN,
          query: {
            next: route.fullPath
          }
        }
      )
    }

  }
};

export default authRouterMiddleware
