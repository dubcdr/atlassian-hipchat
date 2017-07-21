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
  public static $inject = ['$http', '$log', '$q'];

  public baseUrl: string;

  constructor(protected $http: ng.IHttpService, protected $log: ng.ILogService, protected $q: ng.IQService) {

  }

  public parse(str: string): ng.IPromise<IParseResponse> {
    return new this.$q((resolve, reject) => {
      let parsedResult = {} as IParseResponse;
      // Finding the links is the only criteria that requires any ajax call
      // therefore there are no nasty promise chaining issues.
      let links = ParseStringHelpers.findLinks(str);
      // Find Mentions
      let mentions = ParseStringHelpers.findMentions(str);
      // Find Emoticons
      let emoticons = ParseStringHelpers.findEmoticons(str);

      if (emoticons && emoticons.length > 0) {
        parsedResult.emoticons = emoticons;
      }
      if (mentions && mentions.length > 0) {
        parsedResult.mentions = mentions;
      }
      if (links && links.length > 0) {
        this.getHtmlHeaders(links).then((resp: ng.IHttpPromiseCallbackArg<Array<IParsedLink>>) => {
          parsedResult.links = resp.data;
        }, (err) => {
          // Error Handling
          // Would navigate to error page
        });
      }
      resolve(parsedResult);
    });
  }

  public getHtmlHeaders(urls: Array<string>): ng.IHttpPromise<Array<IParsedLink>> {
    return this.$http.post('/getUrlTitles', { urls });
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


}

/**
 * This class is used in the actual service so that the functions can be unit tested
 *
 * @class ParseStringHelpers
 */
export class ParseStringHelpers {
  public static mentionRegEx = /(?:[@])(\w{1,})/g;
  public static emoticonRegEx = /(?:[(])(\w{1,15})(?:[)])/g;
  // source: https://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text
  // note: removed ftp - didnt think it was neccessary
  // tslint:disable-next-line
  public static linkRegEx = new RegExp('(http|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?', 'g');
  /**
   *
   *
   *
   * @param {string} str
   * @returns {Array<string>}
   * @memberof StringParseService
   */
  public static findMentions(str: string): Array<string> {
    return ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.mentionRegEx);
  }

  /**
   *
   *
   * @param {string} str
   * @returns {Array<string>}
   * @memberof StringParseService
   */
  public static findEmoticons(str: string): Array<string> {
    return ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.emoticonRegEx);
  }

  /**
   *
   *
   * @param {string} str
   * @returns {Promise<Array<IParsedLink>>}
   * @memberof StringParseService
   */
  public static findLinks(str: string): Array<string> {
    return ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.linkRegEx);
  }
  /**
   *  Method that takes in a string and regEx and outputs
   *  an array of strings. Non capturing
   *
   * @private
   * @param {string} str
   * @param {RegExp} regEx
   * @returns {Array<string>}
   * @memberof StringParseService
   */
  public static findAllRegEx(str: string, regEx: RegExp): Array<string> {
    let matches = new Array<string>();
    let match = regEx.exec(str);
    while (match != null) {
      // match index 1 does not include the non capturing characters
      matches.push(match[1]);
      match = regEx.exec(str);
    }
    return matches;
  }
}

angular.module('stringParse')
  .service('StringParseService', StringParseService);
