import { Image } from 'types-module'

export enum SocialMetaType {
  FACEBOOK = 'is-facebook',
  TWITTER = 'is-twitter',
  WHATSAPP = 'is-whatsapp',
  EMAIL = 'is-email',
  SMS = 'is-sms',
  PINTEREST = 'is-pinterest'
}

export interface SocialMetaConfig {
  type: SocialMetaType,
  icon: string,
  shareLink: string
}

export const SocialMetaConfigs: SocialMetaConfig[] = [
  {
    type: SocialMetaType.FACEBOOK,
    icon: 'facebook',
    shareLink: 'https://www.facebook.com/sharer/sharer.php?u=@u&title=@t&description=@d&hashtag=@h'
  },
  {
    type: SocialMetaType.TWITTER,
    icon: 'twitter',
    shareLink: 'https://twitter.com/intent/tweet?text=@t&url=@u&hashtags=@h'
  },
  {
    type: SocialMetaType.WHATSAPP,
    icon: 'whatsapp',
    shareLink: 'https://api.whatsapp.com/send?text=@t%0D%0A@u%0D%0A@d'
  },
  {
    type: SocialMetaType.PINTEREST,
    icon: 'pinterest',
    shareLink: 'https://pinterest.com/pin/create/button/?url=@u&media=@m&description=@t'
  },
  {
    type: SocialMetaType.EMAIL,
    icon: 'email-send',
    shareLink: 'mailto:?subject=@t&body=@u%0D%0A@d'
  },
  {
    type: SocialMetaType.SMS,
    icon: 'message-text',
    shareLink: 'sms:?body=@t%0D%0A@u%0D%0A@d'
  }
]

export interface PageMeta {
  url: string,
  title: string,
  description: string,
  image: Image,
  tags?: string
}

export const DefaultMeta: PageMeta = {
  title: 'Nuxt TS Firebase Auth SSR',
  description: 'The description of Nuxt TS Firebase Auth SSR web',
  image: {
    src: process.env.WEBSITE_URL + '/icon.png',
    alt: 'The image of the Nuxt TS Firebase Auth SSR web'
  },
  url: process.env.WEBSITE_URL,
  tags: 'nuxtsocial,nuxt,ssr,firebase,firebaseauth,firebasefunctions,rslvn'
}
