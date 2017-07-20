import { } from 'jasmine';
import { StringParseService, ParseStringHelpers, IParsedLink, IParseResponse } from './parse-string-service';
import * as angular from 'angular';
describe('service::Parse-String-Service', () => {

  // check that tests are running
  it('should add 1+1', () => {
    expect(1 + 1).toBe(2);
  });

  it('should find user mentions in string', () => {
    let str = '@chris you around?';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.mentionRegEx)
    expect(result).toContain('chris');
  });

  it('should find emoticons in string', () => {
    let str = 'Good morning! (megusta) (coffee)';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.emoticonRegEx);
    expect(result).toContain('megusta');
    expect(result).toContain('coffee');
  });

  it('should find urls in string', () => {
    let str = 'Olympics are starting soon; http://www.nbcolympics.com';
    let result = ParseStringHelpers.findAllRegEx(str, ParseStringHelpers.linkRegEx);
    expect(result).toContain('http://www.nbcolympics.com');
  });
});
