/**
 * Description: webpack base
 * Author: Eilvein
 * Update: 2017/06/15
 */

'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    module: {
        rules: [
            { test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use :'css-loader'
                }) },

            // 只对src目录里的less文件应用CSS Module,自动添加hash后缀
            { test: /\.less$/,
                include: [path.resolve(__dirname, 'src')],
                loader: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules:true,
                            localIdentName : '[local]_[hash:base64:5]'
                        }
                    }
                }) },

            { test: /\.less$/,
                exclude: [path.resolve(__dirname, 'src')],
                loader: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                        {
                            loader: 'autoprefixer-loader',
                            options:{
                                browsers:'last 2 version'
                            }
                        },{
                            loader:'less-loader',
                            options:{
                                sourceMap:true
                            }
                        }
                    ]
                }) },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',

                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]

            },
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.scss', '.sass', '.json'],
        alias: {
            util: path.resolve(__dirname, 'src/js/util/util'),
        }
    }
};

module.exports = config;
