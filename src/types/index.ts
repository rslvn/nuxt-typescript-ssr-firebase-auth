import { CookieSerializeOptions } from 'cookie'
import { Image, PrivacyType, PushNotification, User } from 'types-module'

export * from './firebase-types'
export * from './state-types'
export * from './route-types'
export * from './seo-types'
export * from './rx-types'

export const ProfilePhotoPlaceholder = '/img/default-profile.png'
export const CoverPhotoPlaceholder = '/img/default-cover.jpg'

export const DefaultProfilePhoto: Image = {
  src: ProfilePhotoPlaceholder,
  alt: 'default profile picture',
  default: true
}

export const DefaultCoverPhoto: Image = {
  src: CoverPhotoPlaceholder,
  alt: 'default cover picture',
  default: true
}

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

export enum LocalStorageKey {
  FCM_TOKEN = 'fcmToken'
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

export interface PushNotificationEnriched {
  fromUser: User,
  pushNotification: PushNotification
}

export interface PrivacyConfig {
  privacyType: PrivacyType,
  colorType: string,
  icon: string,
  type: string,
  iconPack?: string
}

export const PrivacyConfigList: PrivacyConfig[] = [
  {
    privacyType: PrivacyType.PRIVATE,
    colorType: 'is-danger',
    icon: 'account-lock',
    type: 'is-danger'
  },
  {
    privacyType: PrivacyType.PUBLIC,
    colorType: 'is-primary',
    icon: 'earth',
    type: 'is-primary'
  }
]
