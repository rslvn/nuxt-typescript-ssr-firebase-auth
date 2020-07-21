# types-module

## build
    npm i
    npm run build

## pack ( to create types-module-1.0.0.tgz)
    npm pack

## install
    npm i <relative-path-from-target-package>
    
    # or
    npm i <relative-path-from-target-package>/types-module-1.0.0.tgz

`on function`
    
    npm i ../modules/types-module/types-module-1.0.0.tgz
    
    # or
    npm i ../modules/types-module

`on src (nuxt)`
   
    npm i ../functions/modules/types-module
    
    # or 
    npm i ../functions/modules/types-module/types-module-1.0.0.tgz

## remove local modules
    npm remove types-module
