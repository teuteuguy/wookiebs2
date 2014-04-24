'use strict';

/* Controllers */

angular.module('wookiesApp.controllersBookings', []).controller( 'controllersBookings', ['$scope', 'cakePHP', 'shubacca', '$interval', 'utilsTiming', function( $scope, cakePHP, shubacca, $interval, utilsTiming ) {

	function bookingTimeFromNow( booking_time ) {

//		var now = new Date();
//        var nowUtc = new Date( now.getTime() );//+ (now.getTimezoneOffset() * 60000));
//        var temp = booking_time * 1000;
//        var result = Math.floor( Math.abs( nowUtc - temp ) / 1000 );
//        //console.log( nowUtc, temp, result );
//        return result;
        var result = utilsTiming.nbSecondsBetweenNowAnd( ( booking_time * 1000 + ( new Date().getTimezoneOffset() * 60000 ) ) / 1000 );
        //console.log( result );

		return result;
	}


	$scope.getBookings = function() {

	    cakePHP.getBookings( { playground: 'playground', 'bookings': 'all' }, function ( b ) {
	        //console.log( b.bookings );
	        $scope.bookings = b.bookings;

	        $scope.shus = null;

	        var shus = null;

	        shubacca.getAllSHUs( { 'limit': 50, 'sort': 'description,asc' }, function ( s ) {

	        	b.bookings.forEach( function( booking ) {

	        		booking.bookingTimeFromNow = bookingTimeFromNow( booking.book_start_timestamp );
	        		booking.duration = booking.book_end_timestamp - booking.book_start_timestamp;

		        	s.forEach( function( shu ) {

	        			if ( booking.suid == shu.suid ) {
	        				
	        				booking.shu = shu;

	        				shubacca.getSHUStatusWithConfig( { shuId: shu.id, status: 'status', 'with': 'config', 'limit': 1, 'sort': 'id,desc' }, function( status ) {
	        					
	        					if ( booking.can_number == status[0].config.booking_ezlink_can ) {
	        						booking.configloadedinshu = true;
	        						//booking.trip_ongoing = status[0].trip_ongoing;
	        					}

	        					if ( booking.can_number == status[0].trip_ezlink_can ) {
	        						booking.trip_ongoing = status[0].trip_ongoing;	
	        					}

	        					booking.loaded = true;
	        					booking.shu.status = status[0];

	        				});

	        			}

	        		});

	        	});

	        });


	     //    shubacca.getSHUStatusWithConfig( { shuId: shu.id, status: 'status', 'with': 'config', 'limit': 1, 'forceupdate': ( new Date().getTime() ) * refresh }, function( status ) {
	     //    //$scope.parseStats( s );        

	    	// });

	  	});

	};

  	$scope.getBookings();

}
]);