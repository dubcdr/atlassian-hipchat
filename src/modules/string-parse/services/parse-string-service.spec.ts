import { } from 'jasmine';
import { ParseStringHelpers } from './parse-string-service';
import * as angular from 'angular';
import 'angular-mocks';
// import 'angular-material';
describe('service::Parse-String-Service', () => {

  // check that tests are running
  it('should add 1+1', () => {
    expect(1 + 1).toBe(2);
  });

  // unit test
  it('should find user mentions in string', () => {
    let str = '@chris you around?';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.mentionRegEx);
    expect(result).toContain('chris');
    expect(result.length).toBe(1);
  });

  // unit test
  it('should find emoticons in string', () => {
    let str = 'Good morning! (megusta) (coffee)';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.emoticonRegEx);
    expect(result).toContain('megusta');
    expect(result).toContain('coffee');
    expect(result.length).toBe(2);
  });

  // unit test
  it('should find urls in string', () => {
    let str = 'Olympics are starting soon; http://www.nbcolympics.com';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.linkRegEx, 0);
    expect(result).toContain('http://www.nbcolympics.com');
    expect(result.length).toBe(1);
  });

  it('should find urls, strings and emoticons', () => {
    let str = '@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016';
    let emoticons = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.emoticonRegEx);
    let mentions = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.mentionRegEx);
    let urls = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.linkRegEx, 0);

    expect(emoticons).toContain('success');
    expect(emoticons.length).toBe(1);

    expect(mentions).toContain('bob');
    expect(mentions).toContain('john');
    expect(mentions.length).toBe(2);

    expect(urls).toContain('https://twitter.com/jdorfman/status/430511497475670016');
    expect(urls.length).toBe(1);
  })
});
