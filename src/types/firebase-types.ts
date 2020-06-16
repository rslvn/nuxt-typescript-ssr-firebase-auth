import { ProviderData } from "~/types/backend-types";

export enum FirebaseAuthAction {
  VERIFY_EMAIL = 'verifyEmail',
  RECOVERY_EMAIL = 'recoverEmail',
  RESET_PASSWORD = 'resetPassword'
}

export enum FirebaseAuthActionParams {
  ACTION = 'mode',
  ACTION_CODE = 'oobCode'
}

export interface RegistrationCredentials {
  name: string
  email: string
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface SocialLoginCredentials {
  providerType: ProviderType
  rememberMe: boolean
}

export interface StorageRef {
  folderRef: string
  parameters?: any
}

export const ProfilePhotoStorageRef: StorageRef = {
  folderRef: 'user/:userId/profilePhoto/',
  parameters: {
    userId: ':userId'
  }
}

export const CoverPhotoStorageRef: StorageRef = {
  folderRef: 'user/:userId/coverPhoto/',
  parameters: {
    userId: ':userId'
  }
}

export enum ProviderType {
  PASSWORD = 'password',
  GOOGLE = 'google.com',
  TWITTER = 'twitter.com',
  FACEBOOK = 'facebook.com',
}

export interface ProviderConfig {
  providerType: ProviderType
  colorType: string
  icon: string
  iconPack: string
}

export const SupportedProviders: ProviderConfig[] = [
  {
    providerType: ProviderType.PASSWORD,
    colorType: 'is-primary',
    icon: 'at',
    iconPack: 'fas',
  },
  {
    providerType: ProviderType.GOOGLE,
    colorType: 'is-danger',
    icon: 'google',
    iconPack: 'fab',
  },
  {
    providerType: ProviderType.TWITTER,
    colorType: 'is-info',
    icon: 'twitter',
    iconPack: 'fab',
  },
  {
    providerType: ProviderType.FACEBOOK,
    colorType: 'is-link',
    icon: 'facebook',
    iconPack: 'fab',
  },
];

export interface ProviderLink {
  providerConfig: ProviderConfig
  providerData?: ProviderData
  linked: boolean
  method: () => void
}

export interface Image {
  src: string
  alt: string
  name?: string
  default?: boolean
  preview?: Image
}

/**
 * firestore collection models
 */
export enum collection {
  USER = 'user',
}

export interface BaseModel {
  id?: string
  createdAt?: Date
  createdBy?: string
  updatedAt?: Date
  updatedBy?: string
}

export interface User extends BaseModel {
  username?: string
  name?: string
  surname?: string
  email?: string
  biography?: string
  profilePhoto?: Image
  coverPhoto?: Image
}
