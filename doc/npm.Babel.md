# Babel 

Processes Javascript files.

* Convert ES6 => ES5 for older browsers
* Minify for file size
* TODO: Bundle some related JS files together for fewer requests

## Resources

* https://babeljs.io/ 
* https://babeljs.io/docs/en/
* https://babeljs.io/setup#installation 

## Packages

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


## Not Installed

    npm i -D babel-plugin-minify-mangle-names
    https://babeljs.io/docs/en/babel-plugin-minify-mangle-names

    npm i -D @wordpress/babel-preset-default
    https://github.com/WordPress/gutenberg/tree/master/packages/babel-preset-default
    Preset for WordPress development

## .babelrc

The Babel configuration file. Tells Babel which browsers to target when transpiling modern JS and has minification settings. 

## package.json - npm run babel

Run Babel on the `./src` directory and out to `./dist`.

    "scripts": {
        "babel": "babel src -d dist",
    },

## Why not Webpack?

I personally do not write in ES6. When I use something that is, I get the browser-ready version. 

Right now, converting my files to ES6 modules isn't an option. So the main benefits of Webpack - bundling and tree-shaking - aren't available. 

As is, Webapack breaks my files because of how it mangles function and class names.

TODO: Look at `babel-preset-minify` at the `keepFnName` and `keepClassName` options passed to  `babel-plugin-minify-mangle-names`. Does this fix Webpack breaks?

