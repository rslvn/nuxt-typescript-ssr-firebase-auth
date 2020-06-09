<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [nuxt-typescript-ssr-firebase-auth](#nuxt-typescript-ssr-firebase-auth)
  - [DETAILED DOCUMENTATION](#detailed-documentation)
  - [Features](#features)
  - [Prepare for build](#prepare-for-build)
    - [firebase configuration](#firebase-configuration)
      - [create project](#create-project)
      - [update `.firebaserc`](#update-firebaserc)
      - [firebase credentials file](#firebase-credentials-file)
      - [action configurations](#action-configurations)
      - [development env](#development-env)
      - [more: TBD](#more-tbd)
    - [dotenv](#dotenv)
  - [Build & Run & Deploy](#build--run--deploy)
    - [install dependencies](#install-dependencies)
    - [deploy](#deploy)
    - [run locally with firebase](#run-locally-with-firebase)
    - [for locally development](#for-locally-development)
      - [hosting on local and api on firebase](#hosting-on-local-and-api-on-firebase)
      - [hosting and api on local](#hosting-and-api-on-local)
        - [enable nuxt `serverMiddleware` in `src/nuxt.config.ts`](#enable-nuxt-servermiddleware-in-srcnuxtconfigts)
        - [update `.env`](#update-env)
        - [and run](#and-run)
  - [references](#references)
  - [Contribution](#contribution)
  - [hints](#hints)
    - [locally run with firebase](#locally-run-with-firebase)
    - [localization](#localization)
      - [change language](#change-language)
    - [Errors and fixes](#errors-and-fixes)
      - [nuxt Failed to execute 'appendChild' on 'Node': This node type does not support this method.](#nuxt-failed-to-execute-appendchild-on-node-this-node-type-does-not-support-this-method)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# nuxt-typescript-ssr-firebase-auth

`nuxt generate` is really sucks!!! We lost `nuxtServerInit`, dynamic routing stuff etc. We need a good alternative to deploy our applications to the cloud without VPS and SSL configuration.

This repository is created as a sample of using nuxt on firebase-functions+firebase-hosting and still SSR and has the `nuxtServerInit` functionality as active.

Firebase full password authentication (register, login, forget password, reset password), google authentication, twitter authentication, facebook authentication in `nuxt`.

DEMO: [https://nuxt-ts-firebase-auth-ssr.firebaseapp.com/](https://nuxt-ts-firebase-auth-ssr.firebaseapp.com/)

See the [Features](#features) for more functionalities

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" alt="" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Fprofile.png?alt=media&token=d650a96f-a7de-47ae-8666-78d730ff28fd"> |  <img width="1604" alt="" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Flightbox.png?alt=media&token=853b84a1-454c-48ff-a560-e6a740402b1b">|<img width="1604" alt="" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Fcrop.png?alt=media&token=e3d72dca-08c4-444e-b02d-b81ce8667101">|
|<img width="1604" alt="" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Flogin.png?alt=media&token=00b53ac5-27ca-49f3-8104-165d32e56d7d">  |  <img width="1604" alt="screen shot 2017-08-07 at 12 18 15 pm" src="https://firebasestorage.googleapis.com/v0/b/nuxt-ts-firebase-auth-ssr.appspot.com/o/github%2Fregister.png?alt=media&token=aa2c9807-b456-41f3-a7ea-12eacb239e7e">||

![login screen](doc/login.png) 
---
![register screen](doc/register.png) 
---
![account sc](doc/account.png) 

## DETAILED DOCUMENTATION
> Coming soon

## Features
- [x] nuxtjs - universal mode
- [x] typescript
- [x] firebase
    - [x] firebase-hosting
    - [x] firebase-functions
        - [x] performance configuration
        - [x] the url same as hosting
        - [x] dynamic sitemap
    - [x] firebase-storage
        - [x] profile photo
        - [x] cover photo
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
- [x] buefy
- [x] nuxt-i18n
    - [x] English
    - [x] Turkish
- [x] vee-validate
    - [x] integration with nuxt-i18n
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
- [x] dotenv
- [x] custom error page - simple
- [x] global notification
- [x] toaster notification
- [x] tooltips
- [x] force logout if token is invalid
- [x] uuid
- [x] slug
- [ ] better formatting
- [ ] backend-frontend types in a npm package

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
create a `development` branch and use that branch for development. Create a new project on firebase and setup `development' branch with the new firebase project
> don't confuse yourself to work on multi-environment in one repository/branch


#### more: TBD

### dotenv

create `.env` file with below content or rename `.env.template` file

```.env
WEBSITE_URL=https://nuxt-ts-firebase-auth-ssr.firebaseapp.com
# axios config
#API_URL=http://localhost:3000/api
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

A global `package.json` has been created to manage easy build and deployment.
All `predeploy` refer to scripts `package.json` in `predeploy`

### install dependencies
```bash
$ npm --prefix functions install
$ npm --prefix src install
```

### deploy
This command builds and deploys firebase-functions from functions and firebase-hosting from src
```bash
$ firebase deploy
```

### run locally with firebase

    $ npm run build

or

    $ npm run predeploy:function && npm run predeploy:hosting
    
and then 

    $ firebase serve
> you will see the links as output of the command

### for locally development

#### hosting on local and api on firebase

first, deploy functions to firebase
```bash
$ npm run predeploy:function
$ firebase deploy --only functions
```

and then 
```bash
cd src
npm run dev
```

#### hosting and api on local

##### enable nuxt `serverMiddleware` in `src/nuxt.config.ts`
```typescript
  serverMiddleware: [
     '~/server/api'
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
    
