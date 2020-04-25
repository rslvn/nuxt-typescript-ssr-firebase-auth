import { RuntimeOptions } from "firebase-functions";

export interface Image {
    src: string;
    alt: string
}

export const AnonymousUserImage: Image = {
    src: '/img/anonymous-user.svg',
    alt: 'anonymous user picture'
};

export interface StoredUser {
    name: string
    email: string
    profilePicture: Image
    userId: string,
    verified: boolean
    providers: string[]
}

export const runtimeOpts: RuntimeOptions = {
    timeoutSeconds: 300,
    memory: '1GB',
    maxInstances: 1
};
