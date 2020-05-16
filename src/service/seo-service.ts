import { AppMeta } from "~/types";

export const getHead = (appMeta: AppMeta, pageTitle ?: string) => {

  let title = pageTitle ? pageTitle + ' | ' + appMeta.title : appMeta.title;

  return {
    title,
    meta: [
      { hid: 'description', name: 'description', content: appMeta.description },
      // Open Graph
      { name: 'og:title', content: appMeta.title },
      { name: 'og:description', content: appMeta.description },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: appMeta.url },
      { name: 'og:image', content: appMeta.image.src },

      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@nuxt_js' },
      { name: 'twitter:title', content: appMeta.title },
      { name: 'twitter:description', content: appMeta.description },
      { name: 'twitter:image', content: appMeta.image.src },
      { name: 'twitter:image:alt', content: 'Orange Make-Up Website logo' },

      // Google / Schema.org markup:
      { itemprop: 'name', content: appMeta.title },
      { itemprop: 'description', content: appMeta.description },
      { itemprop: 'image', content: appMeta.image.src }
    ]
  }
}
