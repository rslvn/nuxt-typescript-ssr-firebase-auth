import moment from 'moment'
import slug from 'slug'
import { v4 as uuidv4 } from 'uuid';
import { Route } from "vue-router"
import { AppMeta, NotificationMessage, RouteType, StoreConfig } from "~/types"
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
  await dispatch(StoreConfig.notification.saveMessage, notificationMessage, {
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

export const getHead = (appMeta: AppMeta, pageTitle ?: string) => {

  let title = pageTitle ? pageTitle + ' | ' + appMeta.title: appMeta.title;

  return {
    title,
    meta: [
      {hid: 'description', name: 'description', content: appMeta.description},
      // Open Graph
      {name: 'og:title', content: appMeta.title},
      {name: 'og:description', content: appMeta.description},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: appMeta.url},
      {name: 'og:image', content: appMeta.image.src},

      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:site', content: '@nuxt_js'},
      {name: 'twitter:title', content: appMeta.title},
      {name: 'twitter:description', content: appMeta.description},
      {name: 'twitter:image', content: appMeta.image.src},
      {name: 'twitter:image:alt', content: 'Orange Make-Up Website logo'},

      // Google / Schema.org markup:
      {itemprop: 'name', content: appMeta.title},
      {itemprop: 'description', content: appMeta.description},
      {itemprop: 'image', content: appMeta.image.src}
    ]
  }
}
