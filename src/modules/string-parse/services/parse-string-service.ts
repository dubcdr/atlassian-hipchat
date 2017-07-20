import * as angular from 'angular';

export class StringParseService {
  public static $inject = ['$http', '$log'];

  public baseUrl: string;

  constructor(protected $http: ng.IHttpService, protected $log: ng.ILogService) {

  }

  public parseText(str: string): ng.IHttpPromise<any> {
    return this.$http.get(str);
  }
}

angular.module('stringParse')
  .service('StringParseService', StringParseService);
