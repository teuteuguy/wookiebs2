'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var wookieServices = angular.module('wookiesApp.servicesDefault', []);

wookieServices.value('version', '0.49');

wookieServices.value('utils', function() {

});


wookieServices.factory('shubacca', ['$resource', function($resource) {
    
    return $resource('http://api.shubacca.com/shu/:shuId/:status', { shuId: '@shuId', status: '@status', 'consumer_key': '4a8e628392a504eb746c37e1b0044f0f', 'sort': 'id,desc' }, {
    	getAllSHUs : { method : 'GET', isArray : true, cache : false },
    	getSHUStatusWithConfig : { method : 'GET', isArray : true, cache : false }
  	});

}])

wookieServices.factory('shubacca_old', function($http) {

	return {
		getAllSHUs: function() {
			
			var url = "http://api.shubacca.com/shu?consumer_key=4a8e628392a504eb746c37e1b0044f0f&sort=id,desc&limit=100";
			
			return $http.get(url);

		}, 
		getSHULastStatus: function( id ) {

			var url = "http://api.shubacca.com/shu/" + id + "/status?consumer_key=4a8e628392a504eb746c37e1b0044f0f&sort=id,desc&limit=1";

			return $http.get(url);
		},
		getSHULastConfig: function( id ) {

			var url = "http://api.shubacca.com/shu/" + id + "/config?consumer_key=4a8e628392a504eb746c37e1b0044f0f&sort=id,desc&limit=1";

			return $http.get(url);
		},
		getSHULastStatusWithConfig: function( id ) {

			var url = "http://api.shubacca.com/shu/" + id + "/status?consumer_key=4a8e628392a504eb746c37e1b0044f0f&sort=id,desc&limit=1&with=config";

			return $http.get(url);

		}

	};
});
// myAppServices.factory('Search',function(){
// 	console.log
//   return {text:''};
// });
