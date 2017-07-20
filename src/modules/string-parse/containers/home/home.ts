import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';
import { StringParseService } from './../../services/parse-string-service';

export class HomeContainer implements ng.IComponentController {
  public static $inject = ['StringParseService'];
  public static bindings = {};
  public static tagName = 'home';
  public static template = require('./home.html');

  public textToParse: string;

  constructor(protected stringParseService: StringParseService) {

  }

  public parse() {
    this.stringParseService.parse(this.textToParse);
  }

}

// Define the route for this container
function homeRoute($stateProvider: StateProvider) {
  $stateProvider.state('home', {
    component: HomeContainer.tagName,
    url: '/'
  });
}

angular.module('stringParse')
  .component('home', {
    bindings: HomeContainer.bindings,
    controller: HomeContainer,
    template: HomeContainer.template
  })
  .config(['$stateProvider', homeRoute]);
