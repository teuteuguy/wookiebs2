'use strict';

/* Directives */


angular.module('wookiesApp.directivesDefault', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
