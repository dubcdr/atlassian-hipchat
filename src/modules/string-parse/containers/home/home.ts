import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

export class HomeContainer implements ng.IComponentController {
  public static $inject = [];
  public static bindings = {};
  public static tagName = 'home';
  public static template = require('./home.html');

}

// Define the route for this container
function homeRoute($stateProvider: StateProvider) {
  $stateProvider.state('home', {
    component: HomeContainer.tagName,
    url: '/'
  });
}

angular.module('app')
  .component('home', {
    bindings: HomeContainer.bindings,
    controller: HomeContainer,
    template: HomeContainer.template
  })
  .config(['$stateProvider', homeRoute]);
