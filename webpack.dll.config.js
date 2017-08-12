/**
 * Description: webpack dll
 * Author: Eilvein
 * Update: 2017/06/15
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const dist = path.resolve(process.cwd(), 'dist');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const lib = require('./build/lib.dependencies');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dllConfig = {
    devtool: 'eval',
    entry: {
        lib: lib
    },
    output: {
        path: path.resolve(__dirname, 'dist/static'),
        filename: 'js/[name].dll.js',

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]',
        publicPath: '/static/'
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist/index.html','dist/static','dist/dll'], {
                root: path.resolve(__dirname),
                verbose: true,
                dry: false
            }
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: path.join(dist, 'dll/[name].manifest.json'),

            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]',
            context: __dirname
        }),
        new HtmlWebpackPlugin({
            filename: '../../src/template/index.html',
            template: './src/template/index_base.html',
            inject: 'body',
            hash: false
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true
            // }
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')]
    }

}

module.exports = dllConfig;
