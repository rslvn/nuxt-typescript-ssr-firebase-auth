import { Image } from './backend-types'

export enum AppCookie {
  token = '__session'
}

export interface SupportedLanguage {
  name: string;
  code: string;
  alias: string;
  flag: Image;
}

export const SupportedLanguages: SupportedLanguage[] = [
  {
    name: 'English',
    code: 'en',
    alias: 'EN',
    flag: {
      src: '/img/flag/rounded/uk.svg',
      alt: 'England flag'
    }
  },
  {
    name: 'Turkce',
    code: 'tr',
    alias: 'TR',
    flag: {
      src: '/img/flag/rounded/tr.svg',
      alt: 'Turkiye bayragi'
    }
  }
];

export enum ProviderType {
  password = 'password',
  google = 'google.com',
  twitter = 'twitter.com',
  facebook = 'facebook.com',
}

export interface ProviderConfig {
  providerType: ProviderType
  colorType: string
  icon: string
  iconPack: string
}

export const SupportedProviders: ProviderConfig[] = [
  {
    providerType: ProviderType.password,
    colorType: 'is-primary',
    icon: 'at',
    iconPack: 'fas'
  },
  {
    providerType: ProviderType.google,
    colorType: 'is-danger',
    icon: 'google',
    iconPack: 'fab'
  },
  {
    providerType: ProviderType.twitter,
    colorType: 'is-info',
    icon: 'twitter',
    iconPack: 'fab'
  },
  {
    providerType: ProviderType.facebook,
    colorType: 'is-link',
    icon: 'facebook',
    iconPack: 'fab'
  },
];

export interface ProviderLink {
  providerConfig: ProviderConfig
  linked: boolean,
  method: () => void
}
