'use strict';

/**
 * @ngdoc overview
 * @name versionsApp
 * @description
 * # versionsApp
 *
 * Main module of the application.
 */
angular
  .module('versionsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'facebook',
    'googleplus'
  ])
  .config(function ($routeProvider, FacebookProvider, GooglePlusProvider) {
     FacebookProvider.init('785273281487494'); 
     
     GooglePlusProvider.init({
        clientId: '959124586596-5b6ol9u84bll004mt4riog9aq4fj78b8.apps.googleusercontent.com',
        apiKey: 'aXIwZSAfhqCvWh6jFsFASvRY'
     });
      
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
