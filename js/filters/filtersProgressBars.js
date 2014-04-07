'use strict';

/* Filters */

var progressBarColorFilters = angular.module('wookiesApp.progressBarColorFilters', []);


progressBarColorFilters.filter('progressBarColor', function() {

	return function(percentage) {

		if ( percentage < 25 ) {
			return "progress-bar-danger";
		} else if ( percentage < 50 ) {
			return "progress-bar-warning";
		} else {
			return "progress-bar-success";
		}
	}
});

progressBarColorFilters.filter('progressBarStrict', function() {

	return function(percentage) {

		if ( percentage > 100 ) {
			return 100
		} else {
			return percentage;
		}
	}
});

