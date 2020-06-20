import { Configuration } from '@nuxt/types'

require('dotenv').config({ path: '.env' })

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: "google-site-verification",
        content: "7KSGr_zujhmsc2fhu0iAfR_L0e5--J_QwD5EeePB1yM"
      }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#9400d3' },
  loading: './components/Loading.vue',

  /*
   ** Global CSS
   */
  css: [
    'assets/style'
  ],
  env: {
    WEBSITE_URL: process.env.WEBSITE_URL as string,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY as string,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN as string,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL as string,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET as string,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID as string,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID as string
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/fire-init-plugin',
    // this should be ssr: false
    { src: '~/plugins/firebase-auth-listener', ssr: false },
    { src: '~/plugins/buefy-plugin', ssr: true },
    '~/plugins/vee-validate-plugin',
    '~/plugins/vue-lazyload-plugin',
    '~/plugins/rxjs-plugin',
  ],
  router: {
    middleware: ['clear-messages', 'router-auth']
  },

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-i18n',
    ['@nuxtjs/google-analytics', {
      id: 'UA-74295415-1'
    }],
  ],

  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en.ts'
      },
      {
        name: 'Turkish',
        code: 'tr',
        iso: 'tr-TR',
        file: 'tr.ts'
      }
    ],
    defaultLocale: 'en',
    fallbackLocale: 'en',
    // rootRedirect: 'en',
    langDir: 'i18n/',
    lazy: true,
    strategy: 'no_prefix',
    vuex: {
      // Module namespace
      moduleName: 'i18n',

      // If enabled, current app's locale is synced with nuxt-i18n store module
      syncLocale: false,

      // If enabled, current translation messages are synced with nuxt-i18n store module
      syncMessages: false,

      // Mutation to commit to set route parameters translations
      syncRouteParams: true
    },
    seo: true
  },
  axios: {
    baseURL: process.env.API_URL
  },
  serverMiddleware: [
    '~/server/api',
    '~/server/sitemap'
  ],

  /*
   ** Build configuration
   */
  build: {
    analyze: false, // env variables are strings
    publicPath: '/assets/',
    extractCSS: true,
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // },
    // filenames: {
    //   chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[contenthash].js'
    // },
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    transpile: ['vee-validate/dist/rules'],
  },
}

export default config
