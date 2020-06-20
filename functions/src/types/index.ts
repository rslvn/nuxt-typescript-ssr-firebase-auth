export enum collection {
    USER = 'user'
}

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
    auth: {
        healthy: '/auth/healthy',
        verify: '/auth/verify',
        claims: '/auth/claims',
    },
}

export enum ApiErrorCode {
    INTERNAL_ERROR = 'Internal Error',
    FORBIDDEN = 'Forbidden',
    BAD_REQUEST = 'Bad Request'
}

export enum AppCookie {
    TOKEN = '__session',
}

// Collection Types
export interface User {
    id: string
    username: string
    name: string
    surname: string
    profilePhoto: Image
    coverPhoto: Image
}
