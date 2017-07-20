import * as angular from 'angular';

// load our default (non specific) css
import 'bootstrap/dist/css/bootstrap.css';
import './styles/screen.scss';

angular.module('app', []);
angular.bootstrap(document, ['app'], {
  strictDi: true
});

import './app.router';
import './modules';
