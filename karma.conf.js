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
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    webpack: webpackConfig,
    autoWatchBatchDelay: 300,
    files: [
      './src/index.ts',
      './src/**/*.spec.ts'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    preprocessors: {
      './src/index.ts': ['webpack'],
      './src/**/*.ts': ['webpack']
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
