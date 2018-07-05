'use strict';

angular.module('PlayerRegister')
  .controller('PlayerRegisterController', ['$sanitize', '$scope', 'session',  'userResource', function($sanitize, $scope, session, userResource){
    $scope.user = {};

    $scope.register = function(form) {
      if (!form.$invalid) {
        var form_valid = true;
        // Sanitize the data first
        for (var value in $scope.user) {
          console.log(value);
          console.log($scope.user[value]);
          $scope.user[value] = $sanitize($scope.user[value]);
          // Check that there is still a value.
          form_valid = $scope.user[value] != '';
        }

        // If the form is still valid, send the data to drupal.
        if (form_valid) {
          var userData = {
            "mail": [{value: $scope.user.mail}],
            "name": [{value: $scope.user.name}],
            "pass": [{value: $scope.user.pass}],
          }

          userResource.registerUser(userData)
            .then(function(data){
              console.log("User was registered!");
              // TODO: Automatically login the user and redirect to the dashboard.
            })
            .catch(function(data){
              console.log("There was an error", data);
            });
        }
        console.log("final", $scope.user);
      }
    }
  }]);
