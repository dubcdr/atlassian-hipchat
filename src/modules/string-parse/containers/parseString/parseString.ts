import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';
import { StringParseService } from './../../services/parse-string-service';

export class ParseStringContainer implements ng.IComponentController {
  public static $inject = ['StringParseService'];
  public static bindings = {};
  public static tagName = 'parseStringContainer';
  public static template = require('./parseString.html');

  public textToParse: string;
  public parsedResponse: object;

  constructor(protected stringParseService: StringParseService) {

  }

  public parse() {
    this.stringParseService.parse(this.textToParse).then((response) => {
      this.parsedResponse = response;
    });
  }

}

// Define the route for this container
function homeRoute($stateProvider: StateProvider) {
  $stateProvider.state('home', {
    component: ParseStringContainer.tagName,
    url: '/parseString'
  });
}

angular.module('stringParse')
  .component(ParseStringContainer.tagName, {
    bindings: ParseStringContainer.bindings,
    controller: ParseStringContainer,
    template: ParseStringContainer.template
  })
  .config(['$stateProvider', homeRoute]);
