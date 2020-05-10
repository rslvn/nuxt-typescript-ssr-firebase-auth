import moment from 'moment'
import slug from 'slug'
import { v4 as uuidv4 } from 'uuid';
import { Route } from "vue-router"
import { NotificationMessage, RouteType } from "~/types"
import { Dispatch } from "vuex";
import { errorToNotificationMessage } from "~/service/notification-service";

let timestampFormat: string = 'MM/DD/YYYY HH:mm:ss.SSS'

export const log = (...anyMessages: any[]) => {
  console.log(`${moment().format(timestampFormat)} | `, ...anyMessages)
}

/**
 *
 * @param fileName
 * @returns {*}
 */
export const getNewFileName = (fileName: string): string => {
  if (fileName) {
    return slugify(basename(fileName)) + '-' + uuidv4() + '.' + fileName.split('.').pop();
  }
  return fileName
};

/**
 *
 * @param fileName
 * @returns {*|void|string|never}
 */
export const basename = (fileName: string): string => {
  return fileName.split('.').slice(0, -1).join('.')
};


export const slugify = (text: string): string => {
  return slug(text, '-')
}

export const authenticatedAllowed = (route: Route): boolean => {
  return route.matched.some(record => record.path.startsWith(RouteType.ACCOUNT.path))
}

export const authenticatedNotAllowed = (route: Route): boolean => {
  return (
    route.path == RouteType.LOGIN.path || route.path == RouteType.REGISTER.path
    || route.path == RouteType.FORGET_PASSWORD.path || route.path == RouteType.RESET_PASSWORD.path
  )
}

export const sendNotification = async (dispatch: Dispatch, notificationMessage: NotificationMessage) => {
  await dispatch('notification/saveMessage', notificationMessage, {
    root: true
  })
};

export const sendErrorNotification = async (dispatch: Dispatch, error: Error) => {
  await sendNotification(dispatch, errorToNotificationMessage(error))
}

export const handleError = async (dispatch: Dispatch, error: Error) => {
  log(error)
  await sendErrorNotification(dispatch, error)
}
