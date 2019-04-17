# NPM

This porject uses Node.js for these tasks:

* Babel - Transpiles and minifies modern Javascript
* Sass - Compiles `.scss` to `.css`, adds vendor prefixes, minifies
* Copy - Moves unporcessed files into the `/dist` directory

## Start

1. Clone the repo
2. `cd` into project root
3. `npm init` to install dev dependencies

## package.json scripts

    npm run build

    "scripts": {
        "build-task:babel": "babel src -d dist",
        "build-task:sass": "node-sass src/sass/ --output-style compressed -o dist/css",
        "build-task:autoprefixer": "postcss dist/css/*.css --use autoprefixer -d dist/css",
        "build": "npm-run-all -p build-task:*"
    },

## Packages

Project

    npm i -D make-dir
    https://github.com/sindresorhus/make-dir
    Make directories

    npm i -D make-dir-cli
    https://github.com/sindresorhus/make-dir-cli
    Make directories

    npm i -D del-cli
    https://github.com/sindresorhus/del-cli
    Delete directories

    npm i -D npm-run-all
    https://github.com/mysticatea/npm-run-all
    Execute multiple scripts

Babel

    npm i -D @babel/core
    https://babeljs.io/docs/en/babel-core 
    The core runtime

    npm i -D @babel/cli
    https://babeljs.io/docs/en/babel-cli 
    Transpile ES6 into ES5
    
    npm i -D @babel/preset-env
    https://babeljs.io/docs/en/babel-preset-env
    Target specific browser versions with transpiled code

    npm i -D @babel/polyfill
    https://babeljs.io/docs/en/babel-polyfill
    Support older browsers

    npm i -D babel-preset-minify
    https://babeljs.io/docs/en/babel-preset-minify
    Better minification than the `minified: true` option

Sass

    npm i -D node-sass
    https://github.com/sass/node-sass

    npm i -D autoprefixer
    https://github.com/postcss/autoprefixer

    npm i -D postcss-cli
    https://github.com/postcss/postcss-cli

