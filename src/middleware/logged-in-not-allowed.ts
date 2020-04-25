import { Middleware } from "@nuxt/types";
import { Route } from 'vue-router'
import { RouteType } from "~/types";
import { log } from "~/lib/helper/global-helpers";

const routesForNotLoggedInUsers = (route: Route) => {
  return (
    route.path == RouteType.LOGIN.path
    || route.path == RouteType.REGISTER.path
    || route.path == RouteType.FORGET_PASSWORD.path
    || route.path == RouteType.RESET_PASSWORD.path
  )
};

const loggedInNotAllowedMiddleware: Middleware = ({ store, redirect, route }) => {
  log('loggedInNotAllowedMiddleware called', store.state.auth.user, route.path, routesForNotLoggedInUsers(route));
  if (store.state.auth.user && routesForNotLoggedInUsers(route)) {
    log('redirection')
    redirect(RouteType.ACCOUNT)
  }
};

export default loggedInNotAllowedMiddleware
