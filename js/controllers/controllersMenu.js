'use strict';

/* Controllers */

angular.module('wookiesApp.controllersMenu', []).controller( 'controllersMenu', ['$scope', '$location', function( $scope, $location ) {
	
  	$scope.doCollapse = function( link ) {

  		$scope.isCollapsed = true;

  		$location.path(link).replace();

  	};

}
]);