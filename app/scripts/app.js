'use strict';

var app = angular.module('connectfourApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'boardCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
