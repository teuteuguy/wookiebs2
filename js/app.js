'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('wookiesApp', [
  'ngAnimate',
  'ngRoute',
  'wookiesApp.filters',
  'wookiesApp.progressBarColorFilters',
  'wookiesApp.servicesDefault',
  'wookiesApp.directivesDefault',
  'wookiesApp.controllersShuList'
]);

myApp.config(function($routeProvider, $locationProvider) {
//  $routeProvider.when('/map', {templateUrl: 'views/map.html', controller: 'controllerMap'});
  $routeProvider.when('/shus', {templateUrl: 'views/shus.html', controller: 'controllersShuList'});
  $routeProvider.otherwise({redirectTo: '/shus'});
});
