import admin from 'firebase-admin'

if (admin.apps.length === 0) {
  // firebase setup
  const serviceAccount = require('../config/firebase-admin-credentials.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export default admin
