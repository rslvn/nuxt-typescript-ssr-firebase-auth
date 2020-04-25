import { User } from 'firebase'
import { AnonymousUserImage, FirebaseAuthAction, StoredUser } from '~/lib/types'

export const getStoredUser = (firebaseUser: User | null): StoredUser | null => {
  return firebaseUser
    ? {
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      profilePicture: {
        src: firebaseUser.photoURL || AnonymousUserImage.src,
        alt: firebaseUser.displayName ? 'Picture of ' + firebaseUser.displayName : AnonymousUserImage.alt
      },
      userId: firebaseUser.uid,
      verified: firebaseUser.emailVerified,
      providers: firebaseUser.providerData?.map(value => value?.providerId)
    } : null
};


export const getFirebaseAuthActionByValue = (actionText: string): FirebaseAuthAction | null => {
  return (
    Object.keys(FirebaseAuthAction)
      .map((key) => FirebaseAuthAction[key as keyof typeof FirebaseAuthAction])
      .find((authAction: FirebaseAuthAction) => authAction === actionText)) || null;
};
