# functions of nuxt-typescript-ssr-firebase-auth

## build
    npm run build

## serve


## deploy

### deploy all
    firebase deploy
    
> `firebase deploy --only functions` can not work properly. `.nuxt` is mandatory to run `nuxtOnFunction` function.
    
### deploy nuxtOnFunction
    firebase deploy --only functions:nuxtOnFunction

### deploy authApi
    firebase deploy --only functions:authApi
    
### deploy sitemapApp
    firebase deploy --only functions:sitemapApp
    

