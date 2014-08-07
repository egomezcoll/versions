'use strict';

/**
 * @ngdoc function
 * @name versionsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the versionsApp
 */
angular.module('versionsApp')
  .controller('MainCtrl', function ($scope, Facebook, GooglePlus) {
   $scope.facebookReady = false;
   $scope.$watch(function() {
  // This is for convenience, to notify if Facebook is loaded and ready to go.
  return Facebook.isReady();
}, function(newVal) {
  // You might want to use this to disable/show/hide buttons and else
  $scope.facebookReady = true;
  $scope.getLoginStatus();
  
});
   
    
    $scope.login = function() {
    
    
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        // Do something with response.
        
      });
    };
    
    $scope.getLoginStatus = function() {
        setTimeout(function(){ 
        GooglePlus.login().then(function (authResult) {
            console.log(authResult);

            GooglePlus.getUser().then(function (user) {
                console.log(user);
            });
        }, function (err) {
            console.log(err);
        });
        },4000);
      Facebook.getLoginStatus(function(response) {
          console.log(response);
        if(response.status === 'connected') {
          $scope.loggedIn = true;
          $scope.me();
        } else {
          $scope.loggedIn = false;
        }
       
      });
    };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
         $scope.$apply(function() {
              $scope.user = response;
                console.log(response);
            });  
        
      });
    };
    
    
    
    
    $scope.outputs = [
        {"title":"Who actually shares them?", "element":"<img src='../images/honestly.jpg'>", "id":"1", "username":"gomco"},
        {"title":"My gf when she wants something", "element":"<img src='../images/gf.gif'>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"},
        {"title":"Title 1", "element":"<img>", "id":"2", "username":"gomco"}
    ];


    $scope.comments = [
        {"id":"1", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"2", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"3", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"4", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"5", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"6", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"7", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"8", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"9", "postId":"1","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"10", "postId":"2","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"11", "postId":"2","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"12", "postId":"2","username":"gomco","comment":"Hey hey hey!! it's true man!! :) thumbs up!"}
    ];
    
    //785273281487494
 

});