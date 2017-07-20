var loaders = require("./loaders");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './../back/public')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        ),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ],
    module:{
        loaders: loaders
    }
};