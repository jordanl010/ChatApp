'use strict';

//Main angular routing module for binding partials with their controllers

angular.module('chatApp', [
    'ngRoute'
])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            });
    }
]);