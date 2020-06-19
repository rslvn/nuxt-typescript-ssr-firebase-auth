import { CookieSerializeOptions } from "cookie";
import { Image } from "~/types/firebase-types";

export * from './api-types'
export * from './firebase-types'
export * from './state-types'
export * from './route-types'
export * from './seo-types'

export interface SupportedLanguage {
  name: string
  code: string
  alias: string
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
