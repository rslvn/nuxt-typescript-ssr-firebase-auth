import { namespace } from "vuex-class";
import { AuthUser } from "~/types/api-types";

export interface AuthState {
  authUser?: AuthUser,
  forceLogout: boolean,
  rememberMe: boolean
}

export interface ProfileState {
}

export interface NotificationState {
  notificationMessage?: NotificationMessage
}

export interface LoadingState {
  loading: boolean
}

export interface RootState {
  auth?: AuthState
  notification?: NotificationState
  loading?: LoadingState
  profile?: ProfileState
}

export interface NotificationMessage {
  type: NotificationType
  message: string
  hasIcon?: boolean
}

export enum NotificationType {
  DANGER = 'is-danger',
  WARNING = 'is-warning',
  INFO = 'is-info',
  SUCCESS = 'is-success'
}

export const StateNamespace = {
  auth: namespace('auth'),
  notification: namespace('notification'),
  loading: namespace('loading'),
  profile: namespace('profile'),
};

export const StoreConfig = {
  auth: {
    setAuthUser: 'auth/setAuthUser',
    forceLogout: 'auth/forceLogout',
    logout: 'auth/logout',
    saveRememberMe: 'auth/saveRememberMe',
    saveName: 'auth/saveName',
  },
  notification: {
    saveNotificationMessage: 'notification/saveNotificationMessage',
    clearNotificationMessage: 'notification/clearNotificationMessage'
  },
  loading: {
    setLoading: 'loading/setLoading'
  }
}

