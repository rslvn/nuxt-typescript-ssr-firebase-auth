import { namespace } from "vuex-class";
import { StoredUser } from "~/types/backend-types";
import { Image } from '~/types/firebase-types';

export interface AuthState {
  storedUser?: StoredUser,
  forceLogout: boolean,
  rememberMe: boolean
}

export interface ProfileState {
  coverPhoto?: Image
}

export interface NotificationState {
  message?: NotificationMessage
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
    setStoredUser: 'auth/setStoredUser',
    forceLogout: 'auth/forceLogout',
    logout: 'auth/logout',
    saveRememberMe: 'auth/saveRememberMe',
  },
  notification: {
    saveMessage: 'notification/saveMessage',
    clearMessage: 'notification/clearMessage'
  },
  loading: {
    saveLoading: 'loading/saveLoading',
    setLoading: 'loading/setLoading'
  }
}

