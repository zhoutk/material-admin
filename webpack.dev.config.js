const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackBaseConf = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lib = require('./src/lib.dependencies');

const devConfig = webpackMerge(webpackBaseConf,{
    devtool: 'cheap-module-eval-source-map',
    entry: {
        hot:'webpack-hot-middleware/client?reload=true',
        main:path.join(process.cwd(), 'src/index.js'),
        vendors:lib
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015',"stage-2", 'react'],
                    plugins: [['react-transform', {
                        transforms: [{
                            transform: 'react-transform-hmr',
                            imports: ['react'],
                            // this is important for Webpack HMR:
                            locals: ['module']
                        }],
                    }]],
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js',
            minChunks: Infinity
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
            templateContent: templateContent(),
        })
    ],
});

function templateContent() {
    return fs.readFileSync(
        path.resolve(process.cwd(), 'src/index.html')
    ).toString();
}

module.exports = devConfig;