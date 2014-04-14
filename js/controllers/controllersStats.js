'use strict';

/* Controllers */

angular.module('wookiesApp.controllersStats', []).controller('controllersStats', function($scope, stats) {

  $scope.stats = {};

  $scope.parseStats = function( stats ) {

    console.log(stats);
    if ( stats.signups_last7days != null ) {
      $scope.stats.s1 = { "title": "signups", "now": stats.signups_last7days, "before": stats.signups_last7days_before };
    }
    if ( stats.trips_last7days != null ) {
      $scope.stats.s2 = { "title": "trips",  "now": stats.trips_last7days, "before": stats.trips_last7days_before };
    }
    if ( stats.charges_last7days != null ) {
      $scope.stats.s3 = { "title": "revenue",  "now": "$" + stats.charges_last7days, "before": "$" + stats.charges_last7days_before };
    }
    if ( stats.current_future_bookings != null ) {
      $scope.stats.s4 = { "title": "bookings",  "now": stats.current_future_bookings, "before": "-" };
    }

  }

  $scope.GetStats = function() {

    stats.getAll( {}, function ( stats ) {

      //console.log( stats );
      $scope.parseStats( stats );

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