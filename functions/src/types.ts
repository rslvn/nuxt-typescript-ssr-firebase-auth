export interface Image {
    src: string;
    alt: string;
    name?: string;
    default?: boolean
}

export const DefaultUserPhoto: Image = {
    src: '/img/default-profile.svg',
    alt: ' user default picture'
}

export interface ProviderData {
    providerType: string
}

export interface StoredUser {
    name: string
    email: string
    profilePhoto: Image
    userId: string,
    verified: boolean
    providers: ProviderData[]
}
