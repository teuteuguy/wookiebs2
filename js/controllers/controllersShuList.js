'use strict';

/* Controllers */

angular.module('wookiesApp.controllersShuList', []).controller('controllersShuList', function($scope, shubacca, $resource) {

  $scope.getData = function( refresh ) {    
    shubacca.getAllSHUs( { 'limit': 50, 'forceupdate': ( new Date().getTime() ) * refresh }, function ( shus ) {

      $scope.shus = shus;

//      console.log( shus );

      $scope.shus.forEach( function(shu) {
        

        shubacca.getSHUStatusWithConfig( { shuId: shu.id, status: 'status', 'limit': 1, 'forceupdate': ( new Date().getTime() ) * refresh }, function( status ) {

          //console.log( shu.description );
          //console.log( status );
          if ( status[0] != null ) {

            shu.status = status[0];
            shu.config = shu.status.config;
            delete shu.status.config;

          }

        });

      });
    
    });

  }

  $scope.getData( false );

  $scope.orderProp = 'description';

});




// angular.module('wookiesApp.controllersShuList', []).controller('controllersShuList', function($scope, shubacca) {

//   function setCustomerName( shu ) {
//     if ( shu.config.config_uid === shu.status.config_uid ) {
//       shu.booking_customer_firstname = shu.config.booking_customer_firstname;
//       shu.booking_customer_lastname = shu.config.booking_customer_lastname;
//     }
//   }

// //  $scope.getData = function() {
//   function getData() {

//     console.log( "Getting the data for the SHUs" );

//     var shus = [];

//   	shubacca.getAllSHUs().success(function(temp_shus) {

//       //console.log( temp_shus.length );

//       temp_shus.forEach(function(shu) {  			

//         // if ( shu.virtual == 1 ) {

//         //   //delete shu;

//         // }
//         // else {
          
//         //   //console.log( shu.description );

//           shu.statusLoaded = false;

//           shubacca.getSHULastStatusWithConfig(shu.id).success(function(status) {

//             shu.status = status[0];
//             shu.config = shu.status.config;
//             delete shu.status.config;
            
//             shu.statusLoaded = true;

//           });

//           shus.push( shu );
//         // }
        
//         // var data = google.visualization.arrayToDataTable([
//         //   ['Year', 'Sales', 'Expenses'],
//         //   ['2004', 1000, 400],
//         //   ['2005', 1170, 460],
//         //   ['2006', 660, 1120],
//         //   ['2007', 1030, 540]
//         // ]);
//         // var options = {
//         //   title: 'Company Performance'
//         // };
//         //var chart = new google.visualization.LineChart( document.getElementById( 'chartdiv' ) );
   
//         //chart.draw(data, options);

//       });

//       $scope.shus = shus;
    
//     });

//   };

//   getData();

//   //$scope.getData();

//   $scope.orderProp = 'description';

// });//]);