export interface Image {
  src: string;
  alt: string;
  name?: string;
  default?: boolean
}

export enum ProviderType {
  PASSWORD = 'password',
  GOOGLE = 'google.com',
  TWITTER = 'twitter.com',
  FACEBOOK = 'facebook.com',
}

export interface ProviderData {
  providerType: string
}

export interface AuthUser {
  name: string
  email?: string
  profilePhoto?: Image
  userId: string
  username: string
  verified: boolean
  providers: ProviderData[]
}

export enum FirebaseClaimKey {
  USER_ID = 'user_id',
  USERNAME = 'username',
  NAME = 'name',
  EMAIL = 'email',
  EMAIL_VERIFIED = 'email_verified',
  PICTURE = 'picture',
  FIREBASE = 'firebase',
}

export interface FirebaseClaims {
  [FirebaseClaimKey.USERNAME]: string
}

export const ApiConfig = {
  healthy: '/healthy',
  auth: {
    verify: '/auth/verify',
    claims: '/auth/claims'
  },
  notification: {
    notify: {
      context: '/notification/notify/:notificationId',
      params: {
        notificationId: ':notificationId'
      }
    }
  }
}

export enum ApiErrorCode {
  INTERNAL_ERROR = 'Internal Error',
  FORBIDDEN = 'Forbidden',
  BAD_REQUEST = 'Bad Request'
}

export enum AppCookie {
  TOKEN = '__session',
}

// FIRESTORE types
export enum FirebaseQueryOperator {
  LT = '<',
  LE = '<=',
  EQ = '==',
  GE = '>=',
  GT = '>',
  IN = 'in',
  ARRAY_CONTAINS = 'array-contains',
  ARRAY_CONTAINS_ANY = 'array-contains-any'
}

export interface WhereClause {
  field: string,
  operator: FirebaseQueryOperator,
  value: any
}

export enum collection {
  USER = 'user',
  FOLLOWING = 'following',
  NOTIFICATION = 'notification',
  USER_DEVICE = 'userDevice'
}

export const CollectionField = {
  BASE: {
    id: 'id',
    createdAt: 'createdAt'
  },
  USER: {
    username: 'username',
    privacy: 'privacy',
    name: 'name'
  },
  USER_DEVICE: {
    userId: 'userId',
    deviceToken: 'deviceToken'
  },
  FOLLOWING: {
    follower: 'follower',
    following: 'following'
  },
  NOTIFICATION: {
    from: 'from',
    to: 'to',
    status: 'status'
  }
}

export enum PushNotificationType {
  FOLLOW = 'follow'
}

export enum PushNotificationStatus {
  NEW = 'new',
  READ = 'read',
  DELETED = 'deleted',
  IGNORED = 'ignored'
}

export interface BaseModel {
  id?: string,
  createdAt?: Date,
  createdBy?: string,
  updatedAt?: Date,
  updatedBy?: string
}

export interface User extends BaseModel {
  username: string
  name: string
  surname: string
  profilePhoto: Image
  coverPhoto: Image
}

export interface PushNotification extends BaseModel {
  from: string,
  to: string,
  notificationType: PushNotificationType,
  status: PushNotificationStatus
}

export interface UserDevice extends BaseModel {
  userId: string
  deviceToken: string
}
