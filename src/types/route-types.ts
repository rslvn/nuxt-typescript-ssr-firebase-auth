export interface RouteType {
  label: string,
  path: string
}

export const HOME: RouteType = { label: 'home', path: '/' }
export const LOGIN: RouteType = { label: 'login', path: '/login' }
export const REGISTER: RouteType = { label: 'register', path: '/register' }
export const PROFILE: RouteType = { label: 'profile', path: '/profile' }
export const PROFILE_SETTINGS: RouteType = { label: 'profileSettings', path: '/profile/settings' }
export const ACTION: RouteType = { label: 'action', path: '/auth/action' }
export const FORGET_PASSWORD: RouteType = { label: 'forgetPassword', path: '/auth/forget-password' }
export const RESET_PASSWORD: RouteType = { label: 'resetPassword', path: '/auth/reset-password' }
export const CROP: RouteType = { label: 'crop', path: '/crop' }
export const IMAGES: RouteType = { label: 'images', path: '/images' }
export const LIGHT_BOX: RouteType = { label: 'lightbox', path: '/lightbox' }
export const TERMS: RouteType = { label: 'terms', path: '/terms' }
export const PRIVACY_POLICY: RouteType = { label: 'privacyAndPolicy', path: '/privacy-policy' }

export const Routes = {
  HOME,
  LOGIN,
  REGISTER,
  PROFILE,
  PROFILE_SETTINGS,
  ACTION,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  CROP,
  IMAGES,
  LIGHT_BOX,
  TERMS,
  PRIVACY_POLICY,
}

export enum RouteParameters {
  ACTION_CODE = 'ACTION_CODE',
}

export enum RouteQueryParameters {
  NEXT = 'NEXT',
}
