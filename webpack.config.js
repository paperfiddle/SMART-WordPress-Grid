const path = require('path');
const webpack = require('webpack');


module.exports = {
    mode: 'production',

    // Entry
    // https://webpack.js.org/configuration/entry-context/#entry
    // key name here becommes dir/file [name] in output
    // key name here becomes chunk name in plugins
    entry: {

        'modal-prep': './src/js/AriaModalPrep.js',
        'modal-utils': './src/js/AriaUtils.js',
        'modal': './src/js/AriaModal.js',
        'test': './src/entry/index.testBabel.js'
    },  

    output: {
        path: path.resolve(__dirname, 'smart-vanilla/webpack'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [         
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }                              
            },

            {
                test: /flickity.pkgd/,
                loader: 'imports-loader?define=>false&this=>window'               
            },                   
        ]
    }
};