import admin from 'firebase-admin'

if (admin.apps.length === 0) {
  // firebase setup
  let serviceAccount = require('../../server/config/firebase-admin-credentials.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;



