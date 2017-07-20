import * as angular from 'angular';
import { UrlRouterProvider } from '@uirouter/angularjs';

function otherRoute($urlRouterProvider: UrlRouterProvider) {
  $urlRouterProvider.otherwise('/parseString');
}

angular.module('app').config(['$urlRouterProvider', otherRoute]);
