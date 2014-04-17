'use strict';

/* Controllers */

angular.module('wookiesApp.controllersStats', []).controller('controllersStats', function($scope, cakePHP) {

  $scope.stats = {};

  $scope.parseStats = function( s ) {

    console.log(s);
    if ( s.signups_last7days != null ) {
      $scope.stats.s1 = { "title": "signups", "now": s.signups_last7days, "before": s.signups_last7days_before };
    }
    if ( s.trips_last7days != null ) {
      $scope.stats.s2 = { "title": "trips",  "now": s.trips_last7days, "before": s.trips_last7days_before };
    }
    if ( s.charges_last7days != null ) {
      $scope.stats.s3 = { "title": "revenue",  "now": "$" + s.charges_last7days, "before": "$" + s.charges_last7days_before };
    }
    if ( s.current_future_bookings != null ) {
      $scope.stats.s4 = { "title": "bookings",  "now": s.current_future_bookings, "before": "-" };
    }

  }

  $scope.GetStats = function() {

    cakePHP.getStats( { 'json': '' }, function ( s ) {

      //console.log( stats );
      $scope.parseStats( s );

      //$scope.stats = stats;

    });

  }

  $scope.GetStats();
//   $scope.parseStats( {
// signups_last7days: "18",
// signups_last7days_before: "13",
// trips_last7days: "24",
// trips_last7days_before: "22",
// charges_last7days: "1201.00",
// charges_last7days_before: "1486.50",
// current_future_bookings: "3"
// } );

});