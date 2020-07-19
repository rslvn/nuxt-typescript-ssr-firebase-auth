import admin from 'firebase-admin'

export class HandlerConfig {

  static initializer: () => void

  static defaultInitializer () {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })
  }

  static setInitializer (initializer: () => void) {
    this.initializer = initializer
  }

  static initialize () {
    console.log('CUSTOM initializer: ', JSON.stringify(this.initializer))

    if (admin.apps.length === 0) {
      this.initializer ? this.initializer() : this.defaultInitializer()
    }
  }

}
