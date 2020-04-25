import moment from 'moment';
import { Route } from "vue-router";
import { RouteType } from "~/lib/types";

let timestampFormat: string = 'MM/DD/YYYY HH:mm:ss.SSS';

export const log = (...anyMessages: any[]) => {
  console.log(`${moment().format(timestampFormat)} | `, ...anyMessages)
};

export const routesForLoggedInUsers = (route: Route) => {
  return route.matched.some(record => record.path.startsWith(RouteType.ACCOUNT.path))
};

export const routesForNotLoggedInUsers = (route: Route) => {
  return (
    route.path == RouteType.LOGIN.path || route.path == RouteType.REGISTER.path
    || route.path == RouteType.FORGET_PASSWORD.path || route.path == RouteType.RESET_PASSWORD.path
  )
};

