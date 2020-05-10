export const RouteType = {
  HOME: { path: '/' },
  LOGIN: { path: '/login' },
  REGISTER: { path: '/register' },
  ACCOUNT: { path: '/account' },
  ACTION: { path: '/auth/action' },
  FORGET_PASSWORD: { path: '/auth/forget-password' },
  RESET_PASSWORD: { path: '/auth/reset-password' },
};

export enum RouteParameters {
  actionCode = 'actionCode'
}

export enum RouteQueryParameters {
  next = 'next'
}
