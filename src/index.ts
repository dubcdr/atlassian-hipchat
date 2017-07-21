import * as angular from 'angular';

// load our default (non specific) css
import 'angular-material/angular-material.css';
import './styles/screen.scss';

// load additional libraries
import '@uirouter/angularjs';
import 'angular-animate';
import 'angular-mocks';
import 'angular-material';

import './modules';
angular.module('app', ['ui.router', 'ngAnimate', 'ngMaterial', 'stringParse']);

import './app.router';

angular.bootstrap(document, ['app'], {
  strictDi: true
});
