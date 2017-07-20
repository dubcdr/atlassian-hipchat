var preloaders = require("./preloaders");
var loaders = require("./loaders");
var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: ['./src/index.ts'],
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './../tmp')
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: "source-map-inline",
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.jquery': 'jquery'
    })
  ],
  module: {
    loaders: loaders
  }
};