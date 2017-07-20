import * as angular from 'angular';

export interface IParseResponse {
  mentions?: Array<string>;
  emoticons?: Array<string>;
  links?: Array<IParsedLink>;
}

export interface IParsedLink {
  url: string;
  title: string;
}

export class StringParseService {
  public static $inject = ['$http', '$log'];

  public baseUrl: string;

  constructor(protected $http: ng.IHttpService, protected $log: ng.ILogService) {

  }

  public parse(str: string): Promise<IParseResponse> {
    return new Promise((resolve, reject) => {
      let parsedResult = {} as IParseResponse;
      // Find Links
      // Finding the links is the only criteria that requires any ajax call
      // therefore there are no nasty promise chaining issues.
      this.findLinks(str).then((links) => {
        // Find Mentions
        let mentions = this.findMentions(str);
        // Find Emoticons
        let emoticons = this.findEmoticons(str);

        if (emoticons && emoticons.length > 0) {
          parsedResult.emoticons = emoticons;
        }
        if (mentions && mentions.length > 0) {
          parsedResult.mentions = mentions;
        }
        if (links && links.length > 0) {
          parsedResult.links = links;
        }
        resolve(parsedResult);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public findMentions(str: string): Array<string> {
    const regEx = /[@]\w{1,}/;

  }

  public findEmoticons(str: string): Array<string> {

  }

  public findLinks(str: string): Promise<Array<IParsedLink>> {
    return new Promise((resolve, reject) => {

    })
  }

  public parseHeaderFromHtml(html: string): string {

  }

  public getHtmlForUrl(url: string): ng.IHttpPromise<string> {
    return this.$http.get(`https://cors-anywhere.herokuapp.com/${url}`);
  }


}

angular.module('stringParse')
  .service('StringParseService', StringParseService);
