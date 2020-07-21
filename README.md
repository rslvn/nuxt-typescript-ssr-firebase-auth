# nuxt-typescript-ssr-firebase-auth

[![BUILD](https://circleci.com/gh/rslvn/nuxt-typescript-ssr-firebase-auth.svg?style=shield)](https://circleci.com/gh/rslvn/nuxt-typescript-ssr-firebase-auth)

`nuxt generate` is really sucks!!! We lost `nuxtServerInit`, dynamic routing stuff etc. We need a good alternative to deploy our applications to the cloud without VPS and SSL configuration.

This repository is created as a sample of using nuxt on firebase-functions+firebase-hosting and still SSR and has the `nuxtServerInit` functionality as active.

Firebase full password authentication (register, login, forget password, reset password), google authentication, twitter authentication, facebook authentication in `nuxt`.

DEMO: [https://nuxt-ts-firebase-auth-ssr.firebaseapp.com/](https://nuxt-ts-firebase-auth-ssr.firebaseapp.com/)

See the [Features](#features) for more functionalities

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" alt="Profile" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Fprofile.png?alt=media&token=b14fd223-1248-44bc-8f9f-92f45273c716"> |  <img width="1604" alt="Ligthbox" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Flightbox.png?alt=media&token=347fe927-f425-49dd-8d2b-05c626de48cf">|<img width="1604" alt="Ligthbox view" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Flightbox-view.png?alt=media&token=d6e31892-c0cb-4708-9b9f-d53d52644e9e">|
|<img width="1604" alt="Crop" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Fcrop.png?alt=media&token=d547fe2e-fe51-4904-8e22-f3c4a6d6e886">  |  <img width="1604" alt="login" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Flogin.png?alt=media&token=08d3333c-d54f-495a-937b-fa178d22b21d">|<img width="1604" alt="register" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Fregister.png?alt=media&token=2cd96b4d-3f34-4a4c-a4a5-0de7b72c3d6a">|

## Folder Structure

- [functions](./functions): source folder for firebase-functions
    - [modules](./functions/modules): Shared types and functions between front-end and back-end (firebase-functions and nuxt serverMiddleware)
        - [types-module](./functions/modules/types-module): has all shared types (enums, interfaces, constants)
        - [handlers-module](./functions/modules/handlers-module): has all express handlers. Also, has all backend services like firebase-admin and firestore
    - src: the source of the functions
- [src](./src): nuxt application

```shell script
|-- functions
|   |-- modules
|   |   |-- handlers-module
|   |   |   `-- src
|   |   `-- types-module
|   |       `-- src
|   `-- src
`-- src
    |-- assets
    |-- components
    |-- i18n
    |-- layouts
    |-- middleware
    |-- mixin
    |-- pages
    |-- plugins
    |-- server
    |-- service
    |-- static
    |-- store
    |-- types

```


## DETAILED DOCUMENTATION
> Coming soon

## Features
- [x] nuxtjs - universal mode
    - [x] dynamic profile page with username
- [x] typescript
- [x] local npm modules for shared types and functions
- [x] firebase
    - [x] firebase-hosting
    - [x] firebase-functions
        - [x] performance configuration
        - [x] the url same as hosting
        - [x] dynamic sitemap
        - [x] send notification to user devices
    - [x] firebase-storage
        - [x] profile photo
        - [x] cover photo
        - [x] upload single validated image
    - [x] firestore
        - [x] user collection
    - [x] firebase-auth
        - [x] firebase-auth password
            - [x] register
            - [x] login
            - [x] forget-password
            - [x] reset-password
            - [x] send verification code
                - [x] processing display when the button clicked
            - [x] verify action with mail verification code
            - [x] update password
        - [x] firebase-auth google
        - [x] firebase-auth twitter
        - [x] firebase-auth facebook
        - [x] link/unlink password authenticator
            - [x] set password
        - [x] link/unlink google authenticator
        - [x] link/unlink twitter authenticator
        - [x] link/unlink facebook authenticator
        - [x] remember me
        - [x] user custom claims
    - [x] messaging (FCM)
        - send push notification
        - listen push notification
        - [x] token
            - save deviceToken on login
            - remove device token on logout
- [x] buefy
- [x] nuxt-i18n
    - [x] English
    - [x] Turkish
- [x] vee-validate
    - [x] integration with nuxt-i18n
    - [x] custom validation for image
    - [x] switch language by queryParam `lang`
- [x] SEO
    - [x] Google meta
    - [x] Facebook meta
    - [x] Twitter card meta
- [x] redirect to next url after login
- [x] custom loading component
- [x] image
    - [x] lazy load (vue-lazyload)
    - [x] crop with cropperjs
    - [x] lightbox with buefy/bulma
    - [x] hover button on profile photo
    - [x] square/round background image
- [x] privacy
    - [x] Account Privacy: Make a profile public/private for other authenticated users
    - [x] Followers Privacy: Even if authenticated users cannot see the followers
    - [x] Following Privacy: Even if authenticated users cannot see the following
- [x] custom error page - simple
- [x] global notification
- [x] toaster notification
- [x] tooltips
- [x] force logout if token is invalid    
- [x] dotenv
- [x] rxJS
- [x] uuid
- [x] slug
- [ ] better formatting
- [ ] backend contracts in a npm package

Have a look [Trello Board](https://trello.com/b/6JN23G7A/boiler-plate) for more coming functionality


## Prepare for build

### firebase configuration

#### create project
create a firebase project on https://console.firebase.google.com/

#### update `.firebaserc`
update `.firebaserc` with the project created/owned by you

> If you already have a project you can use it too.

#### firebase credentials file
> This configuration is necessary for nuxt `serverSiddle`, If you use firebase-functions skip this step.
- export the credentials files from your firebase project.
- copy the file to `server/config/firebase-admin-credentials.json`

#### provider config

#### password
- https://firebase.google.com/docs/auth/web/password-auth

#### google
- https://firebase.google.com/docs/auth/web/google-signin

#### twitter
- https://firebase.google.com/docs/auth/web/twitter-login

##### facebook
- https://www.robinwieruch.de/firebase-facebook-login
- https://firebase.google.com/docs/auth/web/facebook-login
- https://hackernoon.com/vue-nuxt-firebase-auth-database-ssr-example-tutorial-facebook-login-setup-authentication-starter-app-a6dfde0133fc

#### action configurations
TBD

- - https://firebase.google.com/docs/auth/custom-email-handler

#### development env
create a `development` branch and use that branch for development. Create a new project on firebase and setup `development` branch with the new firebase project
> don't confuse yourself to work on multi-environment in one repository/branch


#### more: TBD

### dotenv

create `.env` file with below content or rename `.env.template` file

```.env
WEBSITE_URL=https://nuxt-ts-firebase-auth-ssr.firebaseapp.com

# axios config
#API_URL=http://localhost:3000/api
#API_URL=http://localhost:5000/api
API_URL=https://nuxt-ts-firebase-auth-ssr.firebaseapp.com/api

# firebase config
FIREBASE_API_KEY= ***
FIREBASE_AUTH_DOMAIN= ***
FIREBASE_DATABASE_URL= ***
FIREBASE_PROJECT_ID= ***
FIREBASE_STORAGE_BUCKET= ***
FIREBASE_MESSAGING_SENDER_ID= ***
FIREBASE_APP_ID= ***
FIREBASE_MEASUREMENT_ID= ***
```

## Build & Run & Deploy

the root `package.json` has been created to manage build and deployment easily. 

### install dependencies (not `npm install` or `npm i` )
```bash
$ npm run install
```

### deploy
This command builds and deploys firebase-functions from functions and firebase-hosting from src
```bash
$ firebase deploy
```

### run locally with firebase
The following command prepares what are necessary to run the application locally. It builds `src` and `function` and generates the `public` folder.

    $ npm run build
    
and then 

    $ firebase serve
    
> you will see the links as output of the command

### for `local` development

#### hosting on local and api on firebase

Firstly, deploy functions to firebase

    $firebase deploy --only functions:apiApp

and then 

> be sure the API_URL configured as `firebase-functions` like `API_URL=https://nuxt-ts-firebase-auth-ssr.firebaseapp.com/api`

```bash
cd src
npm run dev
```

#### hosting and APIs on local

It is possible to run the project as just a `nuxt` application. With the following instructions, `firebase-function` is never be in use

> Ignore `functions`, just work on `src`

##### enable nuxt `serverMiddleware` in `src/nuxt.config.ts`
```typescript
  serverMiddleware: [
    '~/server/api',
    '~/server/sitemap'
   ],
```

##### update `.env`
```.env
API_URL=https://localhost:3000/api
```

##### and run
```bash
cd src
npm run dev
```

## references

- https://firebase.google.com/docs/auth/web/firebaseui
- https://dev.to/kiritchoukc/deploy-nuxt-on-firebase-4ad8
- https://github.com/KiritchoukC/nuxt-on-firebase-example
- https://www.robinwieruch.de/firebase-facebook-login
- https://qiita.com/simochee/items/e5b77af4aa36bd0f32e5
- https://buefy.org/extensions/veevalidate

## Contribution

Please feel free to send a pull request. Welcome :)
- you see a mistake ( excepted, totally my mistake :) )
- you know a better/best practice
- you can add more functionality
- you found a bug
- you think you have time to fix/implement a card from [Trello Board](https://trello.com/b/6JN23G7A/boiler-plate)



## hints

### localization

#### change language

> strategy: 'no_prefix', 

```typescript
changeLocale() {
  this.$i18n.setLocale(this.$i18n.locale === 'en' ? 'tr' : 'en')
}
```

> for the other strategy
```html
<nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
<nuxt-link :to="switchLocalePath('tr')">Turkish</nuxt-link>
```

---

### Errors and fixes

#### nuxt Failed to execute 'appendChild' on 'Node': This node type does not support this method.
add `client-only` tag

    <client-only> 
       ...
    </client-only>

### npm dependency fixes

To list outdated libraries

    npm install -g npm-check-updates
    
to update the outdated libraries

    ncu -u
    npm install
    
