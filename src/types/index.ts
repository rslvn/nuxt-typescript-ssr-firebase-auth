import { Image } from "~/types/backend-types";

export * from './backend-types'
export * from './firebase-types'
export * from './state-types'
export * from './route-types'


export interface SupportedLanguage {
  name: string;
  code: string;
  alias: string;
  flag: Image;
}

export const SupportedLanguages: SupportedLanguage[] = [
  {
    name: 'English',
    code: 'en',
    alias: 'EN',
    flag: {
      src: '/img/flag/rounded/uk.svg',
      alt: 'England flag'
    }
  },
  {
    name: 'Turkce',
    code: 'tr',
    alias: 'TR',
    flag: {
      src: '/img/flag/rounded/tr.svg',
      alt: 'Turkiye bayragi'
    }
  }
];
