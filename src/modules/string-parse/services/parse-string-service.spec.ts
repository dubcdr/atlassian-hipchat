import { } from 'jasmine';
import { StringParseService, ParseStringHelpers, IParsedLink, IParseResponse } from './parse-string-service';
import * as angular from 'angular';
import 'angular-mocks';
// import 'angular-material';
describe('service::Parse-String-Service', () => {
  let stringParseService: StringParseService;
  beforeEach(angular.mock.module('stringParse'));
  beforeEach(angular.mock.module('app'));
  // tslint:disable-next-line
  beforeEach(angular.mock.inject((__stringParseService__) => {
    stringParseService = __stringParseService__;
  }));

  // check that tests are running
  it('should add 1+1', () => {
    expect(1 + 1).toBe(2);
  });

  // unit test
  it('should find user mentions in string', () => {
    let str = '@chris you around?';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.mentionRegEx)
    expect(result).toContain('chris');
  });

  // unit test
  it('should find emoticons in string', () => {
    let str = 'Good morning! (megusta) (coffee)';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.emoticonRegEx);
    expect(result).toContain('megusta');
    expect(result).toContain('coffee');
  });

  // unit test
  it('should find urls in string', () => {
    let str = 'Olympics are starting soon; http://www.nbcolympics.com';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.linkRegEx, 0);
    expect(result).toContain('http://www.nbcolympics.com');
  });

  // // int test
  // it('should return an object with user mentions, emoticons and urls', () => {
  //   let str = '@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016';

  // });
});
