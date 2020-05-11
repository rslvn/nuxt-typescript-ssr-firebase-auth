import { namespace } from "vuex-class";
import { StoredUser } from "~/types/backend-types";

export interface AuthState {
  user: StoredUser | null,
  forceLogout: boolean,
  rememberMe: boolean
}

export interface NotificationState {
  message: NotificationMessage | null
}

export interface RootState {
  auth?: AuthState
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
};

