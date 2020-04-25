import admin from 'firebase-admin'

if (admin.apps.length === 0) {
  // firebase setup
  let serviceAccount = require(`./firebase-admin-credentials-${process.env.NODE_ENV}.json`);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;



