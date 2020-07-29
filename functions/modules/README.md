# modules
The code has nuxt frontend application and firebase functions as backend. Additionally, nuxt application has `serverMiddleware`. That `serverMiddleware` has same functionality as `firebase-functions`. That means there are some shared types and functions.

The `modules` has been created to keep consistency, clean code and reduce the maintenance.

The modules:
- [types-module](./types-module): has all shared types (enums, interfaces, constants)
- [handlers-module](./handlers-module): has all express handlers. Also, has all backend services like firebase-admin and firestore

## npm install on all modules
    npm run install

## build all modules
    npm run build
