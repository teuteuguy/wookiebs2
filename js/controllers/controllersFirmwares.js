'use strict';

/* Controllers */

angular.module('wookiesApp.controllersFirmwares', []).controller('controllersFirmwares', function($scope, shubacca, $resource) {

  $scope.getData = function( refresh ) {

    shubacca.getAllSHUs( { 'limit': 50, 'forceupdate': ( new Date().getTime() ) * refresh }, function ( shus ) {

      $scope.lastestfw = 0;

      shus.forEach( function(shu) {

        if ( $scope.lastestfw < shu.firmware_version && shu.virtual != "1" ) {
          $scope.lastestfw = shu.firmware_version;
        }
        //var d = new Date(0);
        //d.setUTCSeconds(shu.firmware_version);
        //shu.firmware_version_in_time = d.getUTCFullYear() +"/"+ (d.getUTCMonth()+1) +"/"+ d.getUTCDate() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
        
      });

      shus.forEach( function(shu) {
        
        shu.time_since_lastestfw = Math.abs( shu.firmware_version - $scope.lastestfw );        
        
        console.log( shu.description, shu.firmware_version, $scope.lastestfw, shu.time_since_lastestfw, shu );

      });


      $scope.shus = shus;

    });

  }

  $scope.getData( true );

  $scope.orderProp = 'description';

});

