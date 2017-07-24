import * as angular from 'angular';
import 'angular-material';
import { StateProvider } from '@uirouter/angularjs';
import { StringParseService } from './../../services/parse-string-service';

export class ParseStringContainer {
  public static $inject = ['stringParseService', '$log'];
  public static bindings = {};
  public static tagName = 'parseStringContainer';
  public static template = require('./parseString.html');

  public textToParse: string;
  public parsedResponses: Array<object> = new Array<object>();

  constructor(protected stringParseService: StringParseService, protected $log: ng.ILogService) {

  }

  public parse() {
    this.stringParseService.parse(this.textToParse).then((response) => {
      this.parsedResponses = [response].concat(this.parsedResponses);
      this.textToParse = null;
    }, (err) => {
      this.$log.info('error with parse service');
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
