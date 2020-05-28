export enum collection {
    USER = 'user'
}

export interface Image {
    src: string;
    alt: string;
    name?: string;
    default?: boolean
}

export interface ProviderData {
    providerType: string
}

export interface UserDTO {
    name: string
    email: string
    profilePhoto: Image
    userId: string,
    verified: boolean
    providers: ProviderData[]
}

export interface User {
    id: string
    name: string
    surname: string
    profilePhoto: Image
    coverPhoto: Image
}
