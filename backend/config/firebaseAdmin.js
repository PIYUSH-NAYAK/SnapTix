const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (serviceAccountPath) {
    const resolved = path.resolve(serviceAccountPath);
    if (fs.existsSync(resolved)) {
      const serviceAccount = require(resolved);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin initialized');
    } else {
      console.warn('Firebase service account file not found:', resolved);
      admin.initializeApp();
    }
  } else {
    console.warn('FIREBASE_SERVICE_ACCOUNT_PATH not set');
    admin.initializeApp();
  }
}

module.exports = admin;
