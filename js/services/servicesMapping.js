'use strict';

/* Services */

var wookieServices = angular.module('wookiesApp.servicesMapping', []);

wookieServices.factory('mapping', function($http) {

	return {
		style: function() {
								
			return [
					    {
					        "featureType": "road.highway",
					        "stylers": [
					            {
					                "weight": 0.6
					            },
					            {
					                "saturation": -85
					            },
					            {
					                "lightness": 61
					            }
					        ]
					    },{
					        "featureType": "landscape",
					        "stylers": [
					            {
					                "hue": "#0066ff"
					            },
					            {
					                "saturation": 74
					            },
					            {
					                "lightness": 100
					            }
					        ]
					    },{
						    "featureType": "poi",
						    "stylers": [
						      { "visibility": "off" }
						    ]
						}
					];
		},
		styleDark: function() {
			return [
						{
						    "featureType": "water",
						    "stylers": [
						      { "color": "#021019" }
						    ]
						  },{
						    "featureType": "landscape",
						    "stylers": [
						      { "color": "#08304b" }
						    ]
						  },{
						    "featureType": "road.highway",
						    "elementType": "geometry.fill",
						    "stylers": [
						      { "color": "#000000" }
						    ]
						  },{
						    "featureType": "road.highway",
						    "elementType": "geometry.stroke",
						    "stylers": [
						      { "color": "#0b434f" },
						      { "lightness": 25 }
						    ]
						  },{
						    "featureType": "road.arterial",
						    "elementType": "geometry.fill",
						    "stylers": [
						      { "color": "#000000" }
						    ]
						  },{
						    "featureType": "road.arterial",
						    "elementType": "geometry.stroke",
						    "stylers": [
						      { "color": "#0b3d51" },
						      { "lightness": 16 }
						    ]
						  },{
						    "featureType": "road.local",
						    "elementType": "geometry",
						    "stylers": [
						      { "color": "#000000" }
						    ]
						  },{
						    "elementType": "labels.text.fill",
						    "stylers": [
						      { "color": "#ffffff" }
						    ]
						  },{
						    "elementType": "labels.text.stroke",
						    "stylers": [
						      { "color": "#000000" },
						      { "lightness": 13 }
						    ]
						  },{
						    "featureType": "transit.line",
						    "elementType": "labels.text.stroke",
						    "stylers": [
						      { "visibility": "off" }
						    ]
						  },{
						    "featureType": "transit.station",
						    "elementType": "labels.text.fill",
						    "stylers": [
						      { "color": "#ffffff" }
						    ]
						  },{
						    "featureType": "transit.station",
						    "elementType": "labels.text.stroke",
						    "stylers": [
						      { "visibility": "off" }
						    ]
						  },{
						    "featureType": "poi",
						    "stylers": [
						      { "visibility": "off" }
						    ]
						  }
  				];
		}

	};


});

