'use strict';

/* Filters */

var wookieTimingFilters = angular.module('wookiesApp.filtersTiming', []);


wookieTimingFilters.filter( 'intervalToAgo', [ 'utilsTiming', function( utilsTiming ) {

	return function( interval ) {

		return utilsTiming.intervalToAgo( interval );
		// var str = "";

		// if ( interval < 0 ) str += "in ";

		// var abs_interval = Math.abs( interval );

		// if ( abs_interval < 60 ) {

	 //        str += String( '00' + abs_interval ).slice( -2 ) + "s";

	 //    } else if ( abs_interval < 60 * 60 ) {

	 //    	var secs = String( '00' + abs_interval % 60 ).slice( -2 );
	 //    	var mins = String( '00' + Math.floor(abs_interval / 60) ).slice( -2 );
	 //    	str += mins + "mins";
	 //        //return mins + ":" + secs + "s";

	 //    } else if ( abs_interval < 60 * 60 * 24 ) {

	 //    	var secs = String( '00' + abs_interval % 60 ).slice( -2 );
	 //    	var mins = String( '00' + Math.floor(( abs_interval % 3600 ) / 60) ).slice( -2 );
	 //    	var hours = String( '00' + Math.floor(abs_interval / 3600) ).slice( -2 );
	 //        str += hours + "h" + mins;
	 //        //return hours + ":" + mins + ":" + secs + "s";

	 //    } else {

	 //    	var secs = String( '00' + abs_interval % 60 ).slice( -2 );
	 //    	var mins = String( '00' + Math.floor(( abs_interval % 3600 ) / 60) ).slice( -2 );
	 //    	var hours = String( '00' + Math.floor((abs_interval % (3600 * 24)) / 3600) ).slice( -2 );
	 //    	var days = String( '00' + Math.floor(abs_interval / (3600 * 24)) ).slice( -2 );
	 //        str += days + "day " + hours + "h" + mins;
	 //        //return days + ":" + hours + ":" + mins + ":" + secs + "s";

	 //    }

		// if ( interval >= 0 ) str += " ago";

		// return str;
	}

}
]);
