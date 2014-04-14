'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('wookiesApp', [
  'ngAnimate',
  'ngRoute',
  'ngResource',
  'google-maps',
  'wookiesApp.filters',
  'wookiesApp.progressBarColorFilters',
  'wookiesApp.servicesDefault',
  'wookiesApp.directivesDefault',
  'wookiesApp.controllersShuList',
  'wookiesApp.controllersMap',
  'wookiesApp.controllersStats',
  'wookiesApp.controllersFirmwares',
]);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/map', {templateUrl: 'views/map.html', controller: 'controllersMap'});
  $routeProvider.when('/shus', {templateUrl: 'views/shus.html', controller: 'controllersShuList'});
  $routeProvider.when('/stats', {templateUrl: 'views/stats.html', controller: 'controllersStats'});
  $routeProvider.when('/firmwares', {templateUrl: 'views/firmwares.html', controller: 'controllersFirmwares'});
  $routeProvider.otherwise({redirectTo: '/shus'});
});
