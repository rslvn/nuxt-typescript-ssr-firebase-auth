export interface Image {
  src: string;
  alt: string
}

export const AnonymousUserImage: Image = {
  src: '/img/anonymous-user.svg',
  alt: 'anonymous user picture'
};

export interface StoredUser {
  name: string | null
  email: string | null
  profilePicture: Image
  userId: string,
  verified: boolean
  providers: (string | undefined)[]
}
