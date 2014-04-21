'use strict';

/* Controllers */

angular.module('wookiesApp.controllersMap', []).controller('controllersMap', function($scope, shubacca, mapping, $interval) {

  var temp = [
    // {
    //     "featureType": "landscape",
    //     "stylers": [
    //         {
    //             "color": "#6c8080"
    //         },
    //         {
    //             "visibility": "simplified"
    //         }
    //     ]
    // },
    // {
    //     "featureType": "administrative",
    //     "elementType": "labels.text",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
    // // {
    // //     "featureType": "road",
    // //     "stylers": [
    // //         {
    // //             "visibility": "simplified"
    // //         }
    // //     ]
    // // },
    // {
    //     "featureType": "poi",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
    // // {
    // //     "featureType": "road.highway",
    // //     "elementType": "labels",
    // //     "stylers": [
    // //         {
    // //             "visibility": "off"
    // //         }
    // //     ]
    // // },
    // // {
    // //     "featureType": "road.highway",
    // //     "elementType": "labels",
    // //     "stylers": [
    // //         {
    // //             "visibility": "off"
    // //         }
    // //     ]
    // // },
    // // {
    // //     "featureType": "road",
    // //     "elementType": "labels.icon",
    // //     "stylers": [
    // //         {
    // //             "visibility": "off"
    // //         }
    // //     ]
    // // },
    // {
    //     "featureType": "transit",
    //     "elementType": "labels",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
    // {
    //     "elementType": "labels",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
    // // {
    // //     "featureType": "road.highway",
    // //     "stylers": [
    // //         {
    // //             "color": "#d98080"
    // //         },
    // //         {
    // //             "hue": "#eeff00"
    // //         },
    // //         {
    // //             "lightness": 100
    // //         },
    // //         {
    // //             "weight": 1.5
    // //         }
    // //     ]
    // // }
];

  var myMap = null;

  $scope.map = {
    center: {
        latitude: 1.31455315,
        longitude: 103.843994
    },
    zoom: 12,
    markers: [],
    control: {},
    options: {
      disableDefaultUI: true,
      styles: mapping.style()
    },
    events: {
        idle: function (map) {
            $scope.$apply(function () {
                console.log('this is the map instance', map);
                myMap = map;
                //map.fitBounds( $scope.map.bounds );
            });
        }
    },
    bounds: new google.maps.LatLngBounds(),
    angularbounds: {}
  };
  //$scope.markers = [];

  //var map = $scope.map.control.getGMap();
  //console.log( map );

  $scope.GenerateMapMarkers = function() {

    shubacca.getAllSHUs( { 'limit': 50, 'forceupdate': ( new Date().getTime() ) * true }, function ( shus ) {

      var markers = [];
      //var bounds = new google.maps.LatLngBounds();

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

          // var contentString = shus[i].description;

          // var infowindow = new google.maps.InfoWindow({
          //     content: contentString
          // });

          var marker = new google.maps.Marker( {
            title: shus[i].description,
            position: latlng,
            coords: coords,
            icon: "assets/blue_car_51.png",
            showWindow: true,
            virtual: shus[i].virtual,
            //map: $scope.map.control.getGMap()

          });

          // google.maps.event.addListener(marker, 'click', function() {
          //   marker.infowindow.open( $scope.map.control.getGMap(), marker );
          // });

          markers.push( marker );
          
          $scope.map.bounds.extend( latlng );
          //bounds.extend( latlng );
        };
        
      };

      //console.log( markers );

      $scope.map.markers = markers;

      $scope.map.angularbounds = { "northeast": { "latitude": $scope.map.bounds.getNorthEast().lat(), "longitude": $scope.map.bounds.getNorthEast().lng() }, 
                                   "southwest": { "latitude": $scope.map.bounds.getSouthWest().lat(), "longitude": $scope.map.bounds.getSouthWest().lng() }};
//      $scope.map.bounds.southwest = { $scope.map.bounds.getSouthWest().lat(), $scope.map.bounds.getSouthWest().lng() };

      //$scope.map.control.getGMap().fitBounds( $scope.map.bounds );

      console.log( "Bounds", $scope.map.bounds );

    });

  }

  $scope.GenerateMapMarkers();

});