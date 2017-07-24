import * as angular from 'angular';

// load our default (non specific) css
import 'angular-material/angular-material.css';
import './styles/screen.scss';

// load additional libraries
import '@uirouter/angularjs';
import 'angular-animate';
import 'angular-mocks';
import 'angular-material';
import 'angular-loading-bar';

require('angular-loading-bar/build/loading-bar.css');

import './modules';
angular.module('app', ['ui.router', 'ngAnimate', 'ngMaterial', 'stringParse', 'angular-loading-bar']);

import './app.router';

angular.bootstrap(document, ['app'], {
  strictDi: true
});
