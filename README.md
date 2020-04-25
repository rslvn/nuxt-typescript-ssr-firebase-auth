<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [nuxt-typescript-ssr-firebase-auth](#nuxt-typescript-ssr-firebase-auth)
  - [DETAILED DOCUMENTATION](#detailed-documentation)
  - [Build Setup](#build-setup)
  - [Features](#features)
  - [Prepare for build](#prepare-for-build)
    - [firebase](#firebase)
      - [create project(s)](#create-projects)
      - [firebase credentials files](#firebase-credentials-files)
        - [firebase credentials file for `development` env](#firebase-credentials-file-for-development-env)
        - [firebase credentials file for `production` env](#firebase-credentials-file-for-production-env)
    - [dotenv](#dotenv)
      - [development](#development)
      - [production](#production)
  - [Build Setup](#build-setup-1)
  - [localization](#localization)
    - [change language](#change-language)
  - [Contribution](#contribution)
  - [hints](#hints)
    - [nuxt Failed to execute 'appendChild' on 'Node': This node type does not support this method.](#nuxt-failed-to-execute-appendchild-on-node-this-node-type-does-not-support-this-method)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# nuxt-typescript-ssr-firebase-auth

## DETAILED DOCUMENTATION
> Coming soon

## Build Setup

```bash
# install dependencies
$ npm --prefix functions install && npm --prefix src install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Features
- [x] nuxtjs - universal mode
- [x] typescript
- [x] firebase
    - [x] firebase-hosting
    - [x] firebase-functions
        - [x] the url same as hosting
    - [x] firebase-auth
        - [x] firebase-auth password
            - [x] register
            - [x] login
            - [x] forget-password
            - [x] reset-password
            - [x] send verification code
                - [x] processing display when the button clicked
            - [x] verify action with mail verification code
        - [x] firebase-auth google
        - [x] firebase-auth twitter
        - [x] firebase-auth facebook
        - [x] link/unlink password authenticator
        - [x] link/unlink google authenticator
        - [x] link/unlink twitter authenticator
        - [x] link/unlink facebook authenticator
- [x] buefy
- [x] nuxt-i18n
    - [x] English
    - [x] Turkish
- [x] vee-validate
    - [x] integration with nuxt-i18n
- [x] redirect to next url after login
- [x] dotenv - development and production config for local usage.
- [ ] better formatting
- [ ] backend-frontend types in a npm package
- [x] custom error page - simple
- [x] global notification
- [x] toaster notification
- [x] tooltips

Have a look [Trello Board](https://trello.com/b/6JN23G7A/boiler-plate) for more coming functionality


## Prepare for build

### firebase

#### create project(s)
needs 2 projects on firebase; one of them for `development` and the other one for `production`.
> you can create/use one project for both as well. But still, you need to create firebase credentials files for `development` and `production`.


more: TBD

> If you already have a project you can use it too.

#### firebase credentials files

##### firebase credentials file for `development` env 
- export the credentials files from you `development` firebase project.
- copy the file to 
    - `server/service/firebase-admin-credentials-development.json`
    - `functions/src/service/firebase-admin-credentials-production.json`

> if you don't have a development env, you can export the credential files from your `production` and copy the files as `server/service/firebase-admin-credentials-development.json`

##### firebase credentials file for `production` env 
- export the credentials files from you `production` firebase project.
- copy the file to `server/service/firebase-admin-credentials-production.json`

> if you don't have a development env, you can export the credential files from your `development` and copy the files as `server/service/firebase-admin-credentials-production.json`

### dotenv

create `.env` file with below content

```.env
# axios config
API_URL= https://nuxt-ts-firebase-auth-ssr.firebaseapp.com/api

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

#### development
create a `development` branch and use that branch for development 

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## references

-

## Contribution

Please feel free to send a pull request. Welcome :)
- you see a mistake ( excepted, totally my mistake :) )
- you know a better/best practice
- you can add more functionality
- you found a bug
- you think you have time to fix/implement a card from [Trello Board](https://trello.com/b/6JN23G7A/boiler-plate)



## hints

### If you deploy it locally with `firebase serve`, It does not work at first 2 times and then it works.
> first deploy it with `firebase deploy`, and then call the website url.

---

### localization

#### change language

> strategy: 'no_prefix', 

```typescript
changeLocale() {
  this.$i18n.setLocale(this.$i18n.locale === 'en' ? 'tr' : 'en')
}
```
---
> for the other strategy
```html
<nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
<nuxt-link :to="switchLocalePath('tr')">Turkish</nuxt-link>
```

---

### nuxt Failed to execute 'appendChild' on 'Node': This node type does not support this method.
add `client-only` tag

    <client-only> 
       ...
    </client-only>
    
