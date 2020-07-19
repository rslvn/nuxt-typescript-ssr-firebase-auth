import { Image, PrivacyType, ProviderData, ProviderType } from 'types-module'

export enum FirebaseAuthAction {
  VERIFY_EMAIL = 'verifyEmail',
  RECOVERY_EMAIL = 'recoverEmail',
  RESET_PASSWORD = 'resetPassword'
}

export enum FirebaseAuthActionParams {
  ACTION = 'mode',
  ACTION_CODE = 'oobCode',
}

export interface RegistrationCredentials {
  name: string,
  email: string,
  password: string
}

export interface LoginCredentials {
  email: string,
  password: string,
  rememberMe: boolean
}

export interface SocialLoginCredentials {
  providerType: ProviderType,
  rememberMe: boolean
}

export interface ProviderConfig {
  providerType: ProviderType,
  colorType: string,
  icon: string,
  iconPack: string
}

export const SupportedProviders: ProviderConfig[] = [
  {
    providerType: ProviderType.PASSWORD,
    colorType: 'is-primary',
    icon: 'at',
    iconPack: 'fas'
  },
  {
    providerType: ProviderType.GOOGLE,
    colorType: 'is-danger',
    icon: 'google',
    iconPack: 'fab'
  },
  {
    providerType: ProviderType.TWITTER,
    colorType: 'is-info',
    icon: 'twitter',
    iconPack: 'fab'
  },
  {
    providerType: ProviderType.FACEBOOK,
    colorType: 'is-link',
    icon: 'facebook',
    iconPack: 'fab'
  }
]

export interface ProviderLink {
  providerConfig: ProviderConfig,
  providerData?: ProviderData,
  linked: boolean,
  linkMethod: () => void
}

export interface SearchData {
  name: string,
  username: string,
  profilePhoto: Image,
  coverPhoto: Image,
  privacy: PrivacyType
}

export interface PagingResponse<T> {
  total: number,
  totalPages: number,
  data: T[],
}

/**
 Firebase Storage Types
 */
export interface StorageRef {
  folderRef: string,
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
