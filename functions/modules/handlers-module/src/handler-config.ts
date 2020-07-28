import admin from 'firebase-admin'

export class HandlerConfig {

  private static credentials = ''
  private static websiteUrl = 'https://nuxt-ts-firebase-auth-ssr.web.app/'

  private static readonly defaultInitializer = () => {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })
    console.log('firebase admin is initialized by default credentials')
    return admin
  }

  private static readonly credentialsInitializer = () => {
    const serviceAccount = HandlerConfig.credentials
    // const serviceAccount = require(HandlerConfig.credentials)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    console.log('firebase admin is initialized by custom credentials')
  }

  static setCredentials (credentials: string) {
    HandlerConfig.credentials = credentials
  }

  static setWebSiteUrl (websiteUrl: string) {
    HandlerConfig.websiteUrl = websiteUrl
  }

  static getWebsiteUrl () {
    return HandlerConfig.websiteUrl
  }

  static getAdmin () {
    if (admin.apps.length === 0) {
      this.credentials ? this.credentialsInitializer() : this.defaultInitializer()
    }
    return admin;
  }

}
