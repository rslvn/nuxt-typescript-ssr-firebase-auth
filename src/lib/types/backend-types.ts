export interface Image {
  src: string;
  alt: string
}

export const AnonymousUserImage: Image = {
  src: '/img/anonymous-user.svg',
  alt: 'anonymous user picture'
};

export interface StoredUser {
  name: string | undefined
  email: string
  profilePicture: Image
  userId: string,
  verified: boolean
  providers: string[]
}
