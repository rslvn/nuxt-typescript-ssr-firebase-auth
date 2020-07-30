# handlers-module

## build
    npm i
    npm run build
    
## pack (to create handlers-module-<version>.tgz)
    npm pack
    
## install
    npm i <relative-path-from-target-package>
    
    # or
    npm i <relative-path-from-target-package>/handlers-module-1.0.0.tgz

`on function`
    
    npm i <relative-path-from-target-package>/handlers-module-1.0.0.tgz
    
    # or
    npm i ../modules/handlers-module

`on src (nuxt)`
   
    npm i ../functions/modules/handlers-module
    
    # or
    npm i ../functions/modules/handlers-module/handlers-module-1.0.0.tgz

## remove local modules
    npm remove handlers-module
