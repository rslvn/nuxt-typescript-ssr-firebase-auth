import { User, UserInfo } from 'firebase'
import jwtDecode from 'jwt-decode'
import { AuthUser, DefaultProfilePhoto, FirebaseClaimKey, Image, ProviderData, ProviderType } from '~/types'
import { auth } from '~/plugins/fire-init-plugin'

export const getProviderData = (userInfo: UserInfo | null | undefined): ProviderData | null => {
  return userInfo ? {
    providerType: userInfo.providerId as ProviderType,
    displayName: userInfo.displayName,
    email: userInfo.email,
    phoneNumber: userInfo.phoneNumber,
    photoURL: userInfo.photoURL,
    uid: userInfo.uid
  } : null
}

export const getAuthUser = (firebaseUser: User): AuthUser => {
  return {
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    profilePhoto: {
      src: firebaseUser.photoURL || DefaultProfilePhoto.src,
      alt: firebaseUser.displayName ? 'Picture of ' + firebaseUser.displayName : DefaultProfilePhoto.alt
    },
    userId: firebaseUser.uid,
    username: '',
    verified: firebaseUser.emailVerified,
    providers: firebaseUser.providerData?.filter(value => !!value).map(value => getProviderData(value))
  }
}

export const getProviderOption = (provider: ProviderType) => {
  return {
    provider: provider.replace('.com', '')
  }
}

export const decodeToken = (token: string): AuthUser => {
  const decodedToken: any = jwtDecode(token)
  const name = decodedToken[FirebaseClaimKey.NAME]
  const profilePhoto: Image = {
    src: decodedToken[FirebaseClaimKey.PICTURE],
    alt: `Cover photo of ${name}`
  }
  const providers: ProviderData[] = Object.keys(decodedToken[FirebaseClaimKey.FIREBASE]?.identities)
    .map((provider: string) => {
      return {
        providerType: provider as ProviderType
      }
    })

  return {
    userId: decodedToken[FirebaseClaimKey.USER_ID],
    username: decodedToken[FirebaseClaimKey.USERNAME],
    name,
    email: decodedToken[FirebaseClaimKey.EMAIL],
    verified: decodedToken[FirebaseClaimKey.EMAIL_VERIFIED],
    profilePhoto,
    providers
  }
}

export const refreshToken = async () => {
  await auth.currentUser?.getIdToken(true)
}

export const updateProfileName = async (displayName: string) => {
  await auth.currentUser?.updateProfile({ displayName })
}

export const updateProfilePhotoUrl = async (photoURL: string) => {
  await auth.currentUser?.updateProfile({ photoURL })
}

export const updateProfile = async (displayName: string, photoURL: string) => {
  await auth.currentUser?.updateProfile({ displayName, photoURL })
}
