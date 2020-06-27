<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [functions of nuxt-typescript-ssr-firebase-auth](#functions-of-nuxt-typescript-ssr-firebase-auth)
  - [build](#build)
  - [serve](#serve)
  - [deploy](#deploy)
    - [deploy all](#deploy-all)
    - [deploy nuxtOnFunction](#deploy-nuxtonfunction)
    - [deploy authApi](#deploy-authapi)
    - [deploy sitemapApp](#deploy-sitemapapp)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# functions of nuxt-typescript-ssr-firebase-auth

## build
    npm run build

## serve
    npm run serve

## deploy

### deploy all
    firebase deploy
    
> `firebase deploy --only functions` may not work properly. `.nuxt` is mandatory to run `nuxtOnFunction` function.
    
### deploy nuxtOnFunction
    firebase deploy --only functions:nuxtOnFunction
    firebase deploy --only hosting
    
### deploy authApi
    firebase deploy --only functions:apiApp
    
### deploy sitemapApp
    firebase deploy --only functions:sitemapApp
