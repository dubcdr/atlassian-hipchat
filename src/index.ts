import * as angular from 'angular';

// load our default (non specific) css
// import 'bootstrap/dist/css/bootstrap.css';
import './styles/screen.scss';

// load additional libraries
import '@uirouter/angularjs';

import './modules';
angular.module('app', ['ui.router', 'stringParse']);

import './app.router';

angular.bootstrap(document, ['app'], {
  strictDi: true
});
