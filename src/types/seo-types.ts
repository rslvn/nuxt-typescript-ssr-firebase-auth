import { Image } from "~/types/firebase-types";
export interface PageMeta {
  title: string
  description: string
  image: Image
  url: string
}

export const DefaultMeta: PageMeta = {
  title: 'Nuxt TS Firebase Auth SSR',
  description: 'The description of Nuxt TS Firebase Auth SSR web',
  image: {
    src: process.env.WEBSITE_URL + '/icon.png',
    alt: 'The image of the Nuxt TS Firebase Auth SSR web'
  },
  url: process.env.WEBSITE_URL as string
}
