import { ProviderType } from "~/types/firebase-types";

export interface Image {
  src: string;
  alt: string
}

export const AnonymousUserImage: Image = {
  src: '/img/anonymous-user.svg',
  alt: 'anonymous user picture'
};

export interface ProviderData {
  providerType: ProviderType
  displayName?: string
  email?: string
  phoneNumber?: string
  photoURL?: string
  uid?: string
}

export interface StoredUser {
  name: string | undefined
  email: string
  profilePicture: Image
  userId: string,
  verified: boolean
  providers: ProviderData[]
}

export const ApiConfig = {
  auth: '/auth/'
}
