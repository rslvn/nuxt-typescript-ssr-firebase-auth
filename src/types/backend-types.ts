import { Image, ProviderType } from "~/types/firebase-types";

export const ProfilePhotoPlaceholder = '/img/default-profile.svg'
export const CoverPhotoPlaceholder = '/img/default-cover.jpg'

export const DefaultUserPhoto: Image = {
  src: ProfilePhotoPlaceholder,
  alt: 'default profile picture'
};

export const DefaultCoverPhoto: Image = {
  src: CoverPhotoPlaceholder,
  alt: 'default cover picture'
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
  profilePicture?: Image
  profilePhoto: Image
  userId: string,
  verified: boolean
  providers: ProviderData[]
}

export const ApiConfig = {
  auth: '/auth/'
}
