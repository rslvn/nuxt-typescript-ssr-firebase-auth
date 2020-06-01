export const RouteType = {
  HOME: { path: '/' },
  LOGIN: { path: '/login' },
  REGISTER: { path: '/register' },
  PROFILE: { path: '/profile' },
  ACTION: { path: '/auth/action' },
  FORGET_PASSWORD: { path: '/auth/forget-password' },
  RESET_PASSWORD: { path: '/auth/reset-password' },
  CORP: { path: '/crop' },
  LIGHT_BOX: { path: '/lightbox' },
  TERMS: { path: '/terms' },
  PRIVACY_POLICY: { path: '/privacy-policy' },
}

export enum RouteParameters {
  ACTION_CODE = 'ACTION_CODE',
}

export enum RouteQueryParameters {
  NEXT = 'NEXT',
}
