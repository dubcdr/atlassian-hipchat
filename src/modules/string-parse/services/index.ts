import * as angular from 'angular';

import './parse-string-service';
import { StringParseService } from './parse-string-service';

angular.module('stringParse')
  .service('stringParseService', StringParseService);
