import { CookieSerializeOptions } from 'cookie'
import { Image } from '~/types/firebase-types'

export * from './api-types'
export * from './firebase-types'
export * from './state-types'
export * from './route-types'
export * from './seo-types'

export interface SupportedLanguage {
  name: string,
  code: string,
  alias: string,
  flag: Image
}

export const SupportedLanguages: SupportedLanguage[] = [
  {
    name: 'English',
    code: 'en',
    alias: 'EN',
    flag: {
      src: '/img/flag/rounded/uk.svg',
      alt: 'England flag',
      default: true
    }
  },
  {
    name: 'Turkce',
    code: 'tr',
    alias: 'TR',
    flag: {
      src: '/img/flag/rounded/tr.svg',
      alt: 'Turkiye bayragi',
      default: true
    }
  }
]

export enum AppCookie {
  TOKEN = '__session',
  REMEMBER_ME = 'rememberMe'
}

export const cookieOptions: CookieSerializeOptions = { sameSite: 'lax', path: '/' }

export const sessionCookieOptionsDev: CookieSerializeOptions = { sameSite: 'none', path: '/' }

export const sessionCookieOptionsProd: CookieSerializeOptions = { sameSite: 'none', secure: true, path: '/' }

export enum ModuleType {
  ABOUT_ME = 'profileAboutMe',
  LINKED_ACCOUNTS = 'linkedAccounts',
  SETTINGS = 'profileSettings',
  FOLLOWERS = 'profileFollowers',
  FOLLOWINGS = 'profileFollowings',
}

export enum SettingsType {
  GENERAL = 'general',
  PRIVACY = 'privacy',
}

export interface NavigatorConfig<T, M> {
  type: T,
  icon: string,
  component: M,
  componentProperties?: Object,
  private: boolean
}

export interface ModuleTabConfig extends NavigatorConfig<ModuleType, any> {

}

export interface SettingsMenuConfig extends NavigatorConfig<SettingsType, any> {

}
