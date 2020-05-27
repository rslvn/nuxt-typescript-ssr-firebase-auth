import { CookieSerializeOptions } from "cookie";
import { Image } from "~/types/firebase-types";

export * from './backend-types'
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
  token = '__session',
  rememberMe = 'rememberMe'
}

export const cookieOptions: CookieSerializeOptions = { sameSite: 'lax' }

export const sessionCookieOptionsDev: CookieSerializeOptions = { sameSite: 'none' }

export const sessionCookieOptionsProd: CookieSerializeOptions = { sameSite: 'none', secure: true }
