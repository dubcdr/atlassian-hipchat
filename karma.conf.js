'use strict';

var webpackConfig = require('./webpack/webpack.test.js');
require('phantomjs-polyfill')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    webpack: webpackConfig,
    autoWatchBatchDelay: 300,
    files: [
      './src/**/*.spec.ts'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    preprocessors: {
      './src/**/*.spec.ts': ['webpack']
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    reporters: [
      'verbose'
    ],
    plugins: [
      require('karma-webpack'),
      ('karma-jasmine'),
      ('karma-phantomjs-launcher'),
      ('karma-verbose-reporter')
    ]
  });
};
