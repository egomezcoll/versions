'use strict';

/**
 * @ngdoc function
 * @name versionsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the versionsApp
 */
angular.module('versionsApp')
  .controller('MainCtrl', ['$scope','$filter','Facebook', 'GooglePlus', function ($scope,$filter, Facebook, GooglePlus) {
   $scope.facebookReady = false;
   $scope.loggedIn = false;
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
        if(response.status === 'connected'){
            $scope.loggedIn = true;
            $scope.me();
        }
        
      });
    };
    
    $scope.loginG = function(){
        GooglePlus.login().then(function (authResult) {
           if(authResult.status.google_logged_in){
               $scope.loggedIn = true;
           }else{
               $scope.loggedIn = false;
           }
           GooglePlus.getUser().then(function (user) {
               $scope.user = user;
               $scope.picture = $scope.user.picture;
           });
       }, function (err) {
           console.log(err);
       });
    }
    
    $scope.getLoginStatus = function() {
            
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
            $scope.loggedIn = true;
            $scope.me();
        } else {
            $scope.loggedIn = false;
            GooglePlus.getUser().then(function (user) {
                if(user.code){
                     $scope.loggedIn = false;
                }else{
                    $scope.loggedIn = true;
                    $scope.user = user;
                    $scope.picture = $scope.user.picture;
                }
            });
        }
      
      });
    };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
         $scope.$apply(function() {
              $scope.user = response;
              $scope.picture = 'http://graph.facebook.com/'+$scope.user.id+'/picture?type=square';
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
    
    $scope.Reoutputs = [
        {"element":"<img src='../images/gf.gif'>", "id":"1", "postId":"1",  "username":"gomco"},
        {"element":"<img src='../images/honestly.jpg'>", "id":"1", "postId":"1", "username":"gomco"},
        {"element":"<img src='../images/honestly.jpg'>", "id":"1", "postId":"2", "username":"gomco"}
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
    
    $scope.Recomments = [
        {"id":"1", "repostId":"1","username":"gomco","comment":"22Hey hey hey!! it's true man!! :) thumbs up!"},
        {"id":"2", "repostId":"1","username":"gomco","comment":"22Hey hey hey!! it's true man!! :) thumbs up!"}
    ];
    
    
    $scope.nextRepost = function(id){
        $scope.ReoutputsFiltered = $filter('filter')($scope.Reoutputs,{'postId':id}); 
        $("#content"+id).html('<div style="padding-top:25px; padding-bottom: 25px;" ng-bind-html="ReoutputsFiltered[0].element"></div>');
    };
    
 

}]);