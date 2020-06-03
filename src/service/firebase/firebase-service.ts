import { User, UserInfo } from 'firebase'
import jwtDecode from 'jwt-decode'
import { DefaultProfilePhoto, Image, ProviderData, ProviderType, StoredUser } from '~/types'

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

export const decodeToken = (token: string): StoredUser => {
  let decodedToken: any = jwtDecode(token);
  let profilePhoto: Image = {
    src: decodedToken.picture,
    alt: `Cover photo of ${decodedToken.name}`
  }
  let providers: ProviderData[] = Object.keys(decodedToken.firebase?.identities).map((provider: string) => {
    return {
      providerType: provider as ProviderType
    }
  })

  return {
    userId: decodedToken.user_id as string,
    name: decodedToken.name as string,
    verified: decodedToken.email_verified as boolean,
    profilePhoto,
    providers
  }
}
