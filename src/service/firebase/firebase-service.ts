import { User, UserInfo } from 'firebase'
import { DefaultCoverPhoto, DefaultProfilePhoto, ProviderData, ProviderType, StoredUser } from '~/types'

export const getProviderData = (userInfo: UserInfo | null | undefined): ProviderData | null => {
  return userInfo ? {
    providerType: userInfo.providerId as ProviderType,
    displayName: userInfo.displayName as string,
    email: userInfo.email as string,
    phoneNumber: userInfo.phoneNumber as string,
    photoURL: userInfo.photoURL as string,
    uid: userInfo.uid
  } : null
}

export const getStoredUser = (firebaseUser: User | null): StoredUser | null => {
  return firebaseUser
    ? {
      name: firebaseUser.displayName as string,
      email: firebaseUser.email as string,
      profilePhoto: {
        src: firebaseUser.photoURL || DefaultProfilePhoto.src,
        alt: firebaseUser.displayName ? 'Picture of ' + firebaseUser.displayName : DefaultProfilePhoto.alt
      },
      userId: firebaseUser.uid,
      verified: firebaseUser.emailVerified,
      providers: firebaseUser.providerData?.filter(value => !!value).map((value) => getProviderData(value)) as ProviderData[]
    } : null
};

export const getProviderOption = (provider: ProviderType) => {
  return {
    provider: provider.replace('.com', '')
  }
}
