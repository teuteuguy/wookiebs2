'use strict';

/* Controllers */

angular.module('wookiesApp.controllersMap', []).controller('controllersMap', [ '$scope', 'shubacca', 'mapping', 'wookiesCacheRefresher', function($scope, shubacca, mapping, wookiesCacheRefresher) {

	var myMap = null;
	
	$scope.GenerateMapMarkers = function() {

		shubacca.getAllSHUs( { 'limit': 50, 'sort': 'description,asc', 'forceupdate': ( new Date().getTime() ) * true }, function ( shus ) {

			var markers = [];

			var tempmarker = new google.maps.Marker();
			console.log( tempmarker );

			for ( var i = 0; i < shus.length; i++ ) {

				if ( shus[i].last_known_gps_coordinates != null && shus[i].virtual != "1" ) {

					var latlng = new google.maps.LatLng(
						shus[i].last_known_gps_coordinates.split(",")[0],
						shus[i].last_known_gps_coordinates.split(",")[1]
					);
					var coords = {
						latitude: shus[i].last_known_gps_coordinates.split(",")[0],
						longitude: shus[i].last_known_gps_coordinates.split(",")[1]
					}

					var marker = new google.maps.Marker( {
						title: shus[i].description,
						position: latlng,
						coords: coords,
						icon: "assets/blue_car_51.png",
						showWindow: true,
						virtual: shus[i].virtual,
						//map: $scope.map.control.getGMap()
					});

					markers.push( marker );

					$scope.map.bounds.extend( latlng );
				}
			}

			$scope.markers = markers;

			$scope.map.angularbounds = {
				"northeast": {
					"latitude": $scope.map.bounds.getNorthEast().lat(),
					"longitude": $scope.map.bounds.getNorthEast().lng()
				}, 
				"southwest": {
					"latitude": $scope.map.bounds.getSouthWest().lat(),
					"longitude": $scope.map.bounds.getSouthWest().lng()
				}
			};

			//console.log( "Bounds", $scope.map.bounds );

		});

	}

	//$scope.GenerateMapMarkers();
	var TAG = "wookiesApp.controllersShuList";  
	$scope.tickerFunction = function( ) {
      console.log( TAG, "tickerFunction" );
    }
    wookiesCacheRefresher.init( $scope );

	$scope.map.map = {
		center: {
		latitude: 1.31455315,
		longitude: 103.843994
		},
		zoom: 12,
		control: {},
		options: {
		disableDefaultUI: true,
		styles: mapping.style()
		},
		events: {
			idle: function (map) {
				$scope.$apply(function () {
					//console.log('this is the map instance', map);
					myMap = map;
					//map.fitBounds( $scope.map.bounds );
				});
			}
		},
		//bounds: new google.maps.LatLngBounds(),
		//angularbounds: {}
	};

	$scope.orderProp = 'description';

}
]);