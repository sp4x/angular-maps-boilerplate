'use strict';

/**
 * @ngdoc function
 * @name esmapsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the esmapsApp
 */
angular.module('esmapsApp')
  .controller('MainCtrl', function(PointSearch) {
    var vm = this;
    var currentLocation = {
      latitude: 37.9174,
      longitude: -122.3050
    };
    PointSearch.nearby(currentLocation, "100km").then(function(result) {
      vm.list = result;
    });
  });
