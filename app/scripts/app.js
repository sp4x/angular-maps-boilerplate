'use strict';

/**
 * @ngdoc overview
 * @name esmapsApp
 * @description
 * # esmapsApp
 *
 * Main module of the application.
 */
angular
  .module('esmapsApp', [
    'ngResource',
    'ngRoute',
    'elasticsearch',
    'uiGmapgoogle-maps'
  ])
  .constant("esConfig", {
    host: '52.29.170.191:9200',
    apiVersion: '1.2'
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDwLZRKlvsqJWk9TE561_IZ-9GXb-EaYJQ',
      libraries: 'weather,geometry,visualization'
    });
  });
