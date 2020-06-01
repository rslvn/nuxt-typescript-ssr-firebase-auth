import { Image, ProviderType } from "~/types/firebase-types";

export const ProfilePhotoPlaceholder = '/img/default-profile.png'
export const CoverPhotoPlaceholder = '/img/default-cover.jpg'

export const DefaultProfilePhoto: Image = {
  src: ProfilePhotoPlaceholder,
  alt: 'default profile picture',
  default: true
};

export const DefaultCoverPhoto: Image = {
  src: CoverPhotoPlaceholder,
  alt: 'default cover picture',
  default: true
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
  name: string
  email?: string
  profilePhoto?: Image
  userId: string
  verified: boolean
  providers: ProviderData[]
}

export const ApiConfig = {
  auth: '/auth/'
}
