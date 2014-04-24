'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('wookiesApp', [
  'ngAnimate',
  'ngRoute',
  'ngResource',
  'google-maps',
  'ngTouch',
  
  'wookiesApp.servicesDefault',
  'wookiesApp.servicesTiming',
  'wookiesApp.servicesCakePHP',
  'wookiesApp.servicesMapping',
  'wookiesApp.servicesCache',

  'wookiesApp.directivesDefault',

  'wookiesApp.filters',
  'wookiesApp.filtersTiming',
  'wookiesApp.filtersProgressBarColor',

  'wookiesApp.controllersMenu',
  'wookiesApp.controllersShuList',
  'wookiesApp.controllersMap',
  'wookiesApp.controllersStats',
  'wookiesApp.controllersFirmwares',
  'wookiesApp.controllersBookings',
  'wookiesApp.controllersTests'
]);

myApp.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider.when('/map', {templateUrl: 'views/map.html', controller: 'controllersMap'})
                .when('/shus', {templateUrl: 'views/shus.html', controller: 'controllersShuList'})
                .when('/stats', {templateUrl: 'views/stats.html', controller: 'controllersStats'})
                .when('/firmwares', {templateUrl: 'views/firmwares.html', controller: 'controllersFirmwares'})
                .when('/bookings', {templateUrl: 'views/bookings.html', controller: 'controllersBookings'})
                .when('/tests', {templateUrl: 'views/tests.html', controller: 'controllersTests'})
  
                .otherwise({redirectTo: '/bookings'});

  // use the HTML5 History API
  //$locationProvider.html5Mode(true);

}
]);
