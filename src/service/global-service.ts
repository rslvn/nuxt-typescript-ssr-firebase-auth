import moment from 'moment'
import slug from 'slug'
import { v4 as uuidv4 } from 'uuid'
import { Route } from 'vue-router'
import { RouteType } from '~/types'

let timestampFormat: string = 'MM/DD/YYYY HH:mm:ss.SSS'
const slugDelimiter = '-'

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
    let baseNameSlug = slugify(basename(fileName))
    let extension = fileName.split('.').pop()
    return `${baseNameSlug}${slugDelimiter}${uuidv4()}.${extension}`
  }
  return fileName
}

/**
 *
 * @param fileName
 * @returns {*|void|string|never}
 */
export const basename = (fileName: string): string => {
  return fileName.split('.').slice(0, -1).join('.')
}

export const slugify = (text: string): string => {
  return slug(text, slugDelimiter)
}

export const authenticatedAllowed = (route: Route): boolean => {
  return route.matched.some((record) =>
    record.path.startsWith(RouteType.PROFILE.path)
  )
}

export const authenticatedNotAllowed = (route: Route): boolean => {
  return (
    route.path == RouteType.LOGIN.path ||
    route.path == RouteType.REGISTER.path ||
    route.path == RouteType.FORGET_PASSWORD.path ||
    route.path == RouteType.RESET_PASSWORD.path
  )
}
