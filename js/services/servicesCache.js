'use strict';

/* Services */

var wookiesFactory = angular.module( 'wookiesApp.servicesCache', [] );

wookiesFactory.factory('wookiesCache', [ '$cacheFactory', 'shubacca', function( $cacheFactory, shubacca ) {

 		var TAG = "wookiesApp.wookiesCache";
		var cache = $cacheFactory('wookies-default-cache');

		console.log( TAG, "Getting cache" );

		return cache;
	
	}

]);


wookiesFactory.factory( 'wookiesCacheRefresher', [ '$interval',  'wookiesCache', 'shubacca',  'cakePHP', 'utilsTiming', function( $interval, wookiesCache, shubacca, cakePHP, utilsTiming ) {

		var TAG = "wookiesApp.wookiesCacheRefresher";
		
		function getScopeShu( scope, id ) {

			var shu = null;
			var index = 0;

			for ( index = 0; index < scope.shus.length; index++ ) {

				if ( scope.shus[index].id == id ) {
					shu = scope.shus[index];
					break;
				}

			}

			if ( shu == null ) return -1;
			else return index;
		}

		function refresh( scope ) {

			var shus = shubacca.getAllSHUs( { 'limit': 100, 'sort': 'description,asc' }, function () {

				//var markers = [];
				//scope.map_markers = markers;
				var calculated_bounds = new google.maps.LatLngBounds();
				//scope.map.bounds = new google.maps.LatLngBounds();
				//scope.map.polylines = new Array();

				var b = cakePHP.getBookings( { playground: 'playground', 'bookings': 'all' }, function () {

					scope.bookings = b.bookings;

				});

				shus.forEach( function( shu ) {

					var scopeshuindex = getScopeShu( scope, shu.id );
						
					if ( scopeshuindex != -1 ) {
						// SHU Already exists.

						// Must update fields.
						var d1 = utilsTiming.timestampFromAPIDateTime( scope.shus[scopeshuindex].last_known_status_datetime );
						var d2 = utilsTiming.timestampFromAPIDateTime( shu.last_known_status_datetime );

						if ( d1 != d2 ) {

					 		scope.shus[scopeshuindex] = shu;

						}

					} else {

					 	scope.shus.push( shu );

					}

					if ( shu.last_known_gps_coordinates != null && shu.last_known_gps_coordinates != "0,0" ) {//&& shu.virtual != "1" ) {

						var latlng = new google.maps.LatLng(
							shu.last_known_gps_coordinates.split(",")[0],
							shu.last_known_gps_coordinates.split(",")[1]
						);

						//scope.map.bounds.extend( latlng );
						if ( shu.virtual != "1" )
							calculated_bounds.extend( latlng );

						var coords = {
							latitude: shu.last_known_gps_coordinates.split(",")[0],
							longitude: shu.last_known_gps_coordinates.split(",")[1]
						}

						var marker = new google.maps.Marker( {
							title: shu.description,
							position: latlng,
							coords: coords,
							icon: "assets/blue_car_51.png",
							showWindow: true,
							virtual: shu.virtual,
							last_known_gps_datetime: shu.last_known_gps_datetime,
						});

						shu.marker = marker;
						//markers.push( marker );
						
					} else {
						shu.marker = null;
					}					

					if ( typeof scope.map.bounds_calculated === 'undefined' ) {

						//console.log( TAG, shu.description, calculated_bounds.getNorthEast(), "Bounded" );
						
						scope.map.bounds = {
							"northeast": {
								"latitude": calculated_bounds.getNorthEast().lat(), //scope.map_bounds.getNorthEast().lat(),
								"longitude": calculated_bounds.getNorthEast().lng() //scope.map_bounds.getNorthEast().lng()
							}, 
							"southwest": {
								"latitude": calculated_bounds.getSouthWest().lat(), //scope.map_bounds.getSouthWest().lat(),
								"longitude": calculated_bounds.getSouthWest().lng() //scope.map_bounds.getSouthWest().lng()
							}
						};

					}

					shu.latemotor = false;

					var status_array = shubacca.getSHUStatusWithConfig( { shuId: shu.id, status: 'status', 'with': 'config', 'limit': 10, 'sort': 'id,desc' }, function() {

						if ( status_array[0] != null ) {

							shu.status = status_array[0];
							//console.log( shu.status.config );
							//shu.config = shu.status.config;
							//delete shu.status.config;
							
							if ( shu.last_known_motor_on_datetime != null ) {
							
								shu.interval_last_known_motor_on_datetime = utilsTiming.nbSecondsBetweenNowAnd( utilsTiming.timestampFromAPIDateTime( shu.last_known_motor_on_datetime ) );
								shu.latemotor = ( shu.interval_last_known_motor_on_datetime > 36 * 3600 );
							
							} else {
							
								shu.interval_last_known_motor_on_datetime = 34 * 3600;
								shu.latemotor = false;

							}

							shu.interval_last_known_status_datetime = utilsTiming.nbSecondsBetweenNowAnd( utilsTiming.timestampFromAPIDateTime( shu.last_known_status_datetime ) );
							shu.interval_last_known_gps_datetime = Math.floor( Math.abs( utilsTiming.timestampFromAPIDateTime( shu.last_known_status_datetime ) - utilsTiming.timestampFromAPIDateTime( shu.last_known_gps_datetime ) ) / 1000 );
							
							shu.latecheckin = ( shu.interval_last_known_status_datetime > shu.status.config.checkin_timeout * 1.05 );
							shu.lategps = ( shu.interval_last_known_gps_datetime > 10 );

						}
							
						var path = new Array();
						//path.push( shu.marker.coords );
						//path.push( shu.marker.coords );

						if ( shu.marker != null ) {
							var previous_position = shu.marker.position;

							status_array.forEach( function( s ) {

								if ( s.gps === null ) {
									//console.log( TAG, shu.description, "GPS object non existant" );
								} else {

									var coord = {
										latitude: s.gps.latitude,
										longitude: s.gps.longitude
									};

									var position = new google.maps.LatLng( s.gps.latitude, s.gps.longitude );

									var distance = google.maps.geometry.spherical.computeDistanceBetween (previous_position, position).toFixed(2); // in meters

									//console.log( "Distance =", distance );

									if ( distance > 30 ) path.push( coord );

									previous_position = angular.copy( position );

								}

							});
						}

						shu.path = path;

						// if ( path.length > 0 ) {
						// 	//console.log( "pushed coords", path );
						// 	scope.map_polylines.push( path );
						// } else {
						// 	//console.log( TAG, shu.description, "No Path")
						// }

						// var scopeshuindex = getScopeShu( scope, shu.id );
						
						// if ( scopeshuindex != -1 ) {
						// 	// SHU Already exists.

						// 	// Must update fields.
						// 	var d1 = utilsTiming.timestampFromAPIDateTime( scope.shus[scopeshuindex].last_known_status_datetime );
						// 	var d2 = utilsTiming.timestampFromAPIDateTime( shu.last_known_status_datetime );

						// 	if ( d1 != d2 ) {

						//  		scope.shus[scopeshuindex] = shu;

						// 	}

						// } else {

						//  	scope.shus.push( shu );

						// }

					});

				});					

				scope.map.bounds_calculated = true;
			});

			scope.tickerFunction();

		}

		return {

			init: function( scope ) {

				var shus = wookiesCache.get( 'shus' );

				if ( typeof shus === 'undefined' ) {

					console.log( TAG, "cache shus is undefined" );
					// If it hasn't yet been defined, define the shus part of the scope.
					//scope.shus = shus;
					scope.shus = new Array();
					//scope.map = {};
					
					// Store the shus table in the cache for other pages to access it instantly.
					wookiesCache.put( 'shus', scope.shus );

				} else {

					console.log( TAG, "cache shus exists, lets get it from the cache");
					scope.shus = shus;

				}

scope.map = {};
				refresh( scope );

				scope.$on('$destroy', function(e) {
					console.log( TAG, "view is destroyed, clearing timer" );
        			$interval.cancel( wookiesCache.get( 'timer' ) );
        			wookiesCache.remove( 'timer' );
        		});

				wookiesCache.put( 'timer', $interval( function( ) { refresh( scope ); }, 10000 ) );

			},

			test: function( text ) {
				console.log( TAG, "This is the test function.");
				//console.log( "wookiesApp.wookiesCacheRefresher", "This is the test function.");
			}

		};

	}

]);

