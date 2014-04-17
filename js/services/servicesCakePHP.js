'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var wookieServices = angular.module('wookiesApp.servicesCakePHP', []);

wookieServices.factory('cakePHP', ['$resource', function($resource) {

    return $resource('http://stats.shubacca.com/:playground/index.php', { playground: '@playground' }, {
    	getStats : { method : 'GET', isArray : false, cache : false },
    	getBookings : { method : 'GET', isArray : false, cache : false }
  	});

}]);

