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
        this.$log.info('parse result from service', parsedResult);
        resolve(parsedResult);
      }).catch((err) => {
        reject(err);
      });
    });

  }

  public testParse(str: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mentions = this.findMentions(str);
      resolve(mentions);
    });
  }

  /**
   *
   *
   *
   * @param {string} str
   * @returns {Array<string>}
   * @memberof StringParseService
   */
  public findMentions(str: string): Array<string> {
    const regEx = /(?:[@])(\w{1,})/g;
    return this.findAllRegEx(str, regEx);
  }

  /**
   *
   *
   * @param {string} str
   * @returns {Array<string>}
   * @memberof StringParseService
   */
  public findEmoticons(str: string): Array<string> {
    const regEx = /(?:[(])(\w{1,15})(?:[)])/g;
    return this.findAllRegEx(str, regEx);
  }

  /**
   *
   *
   * @param {string} str
   * @returns {Promise<Array<IParsedLink>>}
   * @memberof StringParseService
   */
  public findLinks(str: string): Promise<Array<IParsedLink>> {
    this.$log.info('')
    return new Promise((resolve, reject) => {
      resolve(new Array<IParsedLink>());
    });
  }

  /**
   *
   *
   * @param {string} html
   * @returns {string}
   * @memberof StringParseService
   */
  public parseHeaderFromHtml(html: string): string {
    return '';
  }

  /**
   *
   *
   * @param {string} url
   * @returns {ng.IHttpPromise<string>}
   * @memberof StringParseService
   */
  public getHtmlForUrl(url: string): ng.IHttpPromise<string> {
    return this.$http.get(`https://cors-anywhere.herokuapp.com/${url}`);
  }

  // Utility Methods
  private findAllRegEx(str: string, regEx: RegExp): Array<string> {
    let matches = new Array<string>();
    let match = regEx.exec(str);
    while (match != null) {
      // match index 1 does not include the non grouping characters
      matches.push(match[1]);
      match = regEx.exec(str);
    }
    return matches;
  }

}

angular.module('stringParse')
  .service('StringParseService', StringParseService);
