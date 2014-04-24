'use strict';

/* Controllers */
var wookiesApp = angular.module('wookiesApp.controllersTests', []);

wookiesApp.controller( 'controllersTests', [ '$scope', 'wookiesCache', 'wookiesCacheRefresher', function( $scope, wookiesCache, wookiesCacheRefresher ) {

		//[ '$scope', 'wookiesCacheRefresh', function( $scope, value ) {
		var TAG = "wookiesApp.controllersTests";  

		console.log( TAG, "Start" );

		$scope.tickerFunction = function( ) {
			console.log( TAG, "tickerFunction" );
		}

		$scope.testFunction = function( param ) {
			console.log( TAG, 'testFunction: ', param );
			wookiesCache.put( 'shit', { "fuck": "me" } );
		}

		wookiesCacheRefresher.init( $scope );


		// $scope.$on('$destroy', function(e) {
		// 	console.log( TAG, "view is destroyed" );
  //       	//$timeout.cancel(cancelRefresh);
  //       });

	}
]);
