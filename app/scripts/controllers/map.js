'use strict';

/**
 * @ngdoc function
 * @name esmapsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the esmapsApp
 */
angular.module('esmapsApp')
  .controller('MapCtrl', function(uiGmapGoogleMapApi, PointSearch) {
    var map = this;

    map.markers = [];
    map.center = {
      latitude: 37,
      longitude: -122
    };
    map.zoom = 8;

    map.events = {
      'idle': function(mapObj) {
        var bounds = mapObj.getBounds().toJSON();
        PointSearch.boundingBox(bounds).then(function(
          result) {
          map.markers = result;
        });
      }
    }


    uiGmapGoogleMapApi.then(function(maps) {

    });

  });
