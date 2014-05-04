"use strict";

angular.module(
  'arethusa',
  ['mm.foundation', 'ngRoute', 'arethusa-core'],
  function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'MainController',
      templateUrl: 'templates/main2.html',
      resolve: {
        loadConfiguration: function($q, $http, configurator) {
          return $http({
            method: 'GET', 
            url: './static/configuration1.json'
          }).then(function(result) {
            configurator.configuration = result.data;
          });
        }
      }
    }
  );
});