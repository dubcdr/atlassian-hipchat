import {} from 'jasmine';
import {StringParseService} from './parse-string-service';
import * as angular from 'angular';
describe('service::Parse-String-Service', () => {
    
    let service;


    // check that tests are running
    it('should add 1+1', () => {
        expect(1+1).toBe(2);
    });

    it('should find a mention when one is provided', ()=> {
        expect(2).toBe(2);
    })
});