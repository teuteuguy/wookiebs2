'use strict';

/* Filters */

var wookieFilters = angular.module('wookiesApp.filters', []);

wookieFilters.filter('interpolate', ['version', function(version) {

    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
    
}]);



wookieFilters.filter('isVirtual', function() {
	return function(items, options) {
		console.log(items);
		console.log(options);
		return true;
	}
});


wookieFilters.filter('ifIsLateVsTimeoutApplyClass', function() {

	return function(dateStr, vsTimeout, css) {

		if ( ! dateStr ) return css;

		var now = new Date();
		var nowUtc = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
		var date = new Date( "" + dateStr.replace( /-/g,'/' ) );
		var interval = Math.floor( Math.abs( nowUtc - date ) / 1000 );

		if ( interval > vsTimeout + 1.05 ) return css;

		return "";

	}

});

wookieFilters.filter('greenFrom1', function() {

	return function(value, css) {

		if ( value == 0 ) return "";
		else return css;
		
	}

});



wookieFilters.filter('convertDateStrToAgo', function() {
	//console.log( "Round 1" );
	return function(dateStr) {
		if ( ! dateStr ) return -1;

			var now = new Date();
		//	var now_utc =  Date.UTC(  now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds() );
			var nowUtc = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
		//	var now_in_secs = Math.floor( (new Date()).getTime() / 1000 );
			var date = new Date( "" + dateStr.replace( /-/g,'/' ) );
		//	var date_in_secs = Math.floor( (new Date( "" + dateStr.replace( /-/g,'/' ) )).getTime() / 1000 );

			//var date = new Date( "" + dateStr.replace( /-/g,'/' ) );
			//console.log( Math.floor( date.getTime() / 1000 ) );
			//var now = new Date();
			//console.log( Math.floor( now.getTime() / 1000 ) );
		//	console.log( now + " vs. " + nowUtc );
		//	console.log( now_utc + " vs. " + date_in_secs * 1000 + " = " + Math.abs( now_utc - date_in_secs * 1000 ) );
			//console.log( Math.abs( now_utc - date_in_secs ) );
			//console.log( Math.floor( Math.abs( nowUtc - date ) / 1000 ) );
			//return 1;

			var interval = Math.floor( Math.abs( nowUtc - date ) / 1000 );

			//console.log( interval );
			//return 1;

//			return intervalToAgo( interval );

			if ( interval < 60 ) {
		        return String( '00' + interval ).slice( -2 ) + " ago";
		    } else if ( interval < 60 * 60 ) {
		    	var secs = String( '00' + interval % 60 ).slice( -2 );
		    	var mins = String( '00' + Math.floor(interval / 60) ).slice( -2 );
		        return mins + ":" + secs + " ago";
		    } else if ( interval < 60 * 60 * 24 ) {
		    	var secs = String( '00' + interval % 60 ).slice( -2 );
		    	var mins = String( '00' + Math.floor(( interval % 3600 ) / 60) ).slice( -2 );
		    	var hours = String( '00' + Math.floor(interval / 3600) ).slice( -2 );
		        return hours + ":" + mins + ":" + secs + " ago";
		    } else {
		    	var secs = String( '00' + interval % 60 ).slice( -2 );
		    	var mins = String( '00' + Math.floor(( interval % 3600 ) / 60) ).slice( -2 );
		    	var hours = String( '00' + Math.floor((interval % (3600 * 24)) / 3600) ).slice( -2 );
		    	var days = String( '00' + Math.floor(interval / (3600 * 24)) ).slice( -2 );
		        return days + ":" + hours + ":" + mins + ":" + secs + " ago";
		    }
	}

});

wookieFilters.filter('intervalToAgo', function() {
	//console.log( "Round 1" );
	return function(interval) {

		if ( interval < 60 ) {
	        return String( '00' + interval ).slice( -2 ) + " ago";
	    } else if ( interval < 60 * 60 ) {
	    	var secs = String( '00' + interval % 60 ).slice( -2 );
	    	var mins = String( '00' + Math.floor(interval / 60) ).slice( -2 );
	        return mins + ":" + secs + " ago";
	    } else if ( interval < 60 * 60 * 24 ) {
	    	var secs = String( '00' + interval % 60 ).slice( -2 );
	    	var mins = String( '00' + Math.floor(( interval % 3600 ) / 60) ).slice( -2 );
	    	var hours = String( '00' + Math.floor(interval / 3600) ).slice( -2 );
	        return hours + ":" + mins + ":" + secs + " ago";
	    } else {
	    	var secs = String( '00' + interval % 60 ).slice( -2 );
	    	var mins = String( '00' + Math.floor(( interval % 3600 ) / 60) ).slice( -2 );
	    	var hours = String( '00' + Math.floor((interval % (3600 * 24)) / 3600) ).slice( -2 );
	    	var days = String( '00' + Math.floor(interval / (3600 * 24)) ).slice( -2 );
	        return days + ":" + hours + ":" + mins + ":" + secs + " ago";
	    }
	}

});
