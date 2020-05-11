export enum AppCookie {
  token = '__session',
  rememberMe = 'rememberMe'
}

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
  callback?: () => void
}

export interface SocialLoginCredentials {
  providerType: ProviderType,
  rememberMe: boolean
  callback?: () => void
}

export interface StorageRef {
  folderRef: string,
  parameters?: any
}

export const ProfilePictureStorageRef: StorageRef = {
  folderRef: 'user/:userId/profilePicture/',
  parameters: {
    userId: ':userId'
  }
}

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
  iconPack: string,
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
