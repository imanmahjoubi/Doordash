//Service to handle user login and info.
//Service keeps track of logged in user between controllers
angular.module('UserService', []).factory('Users', ['$interval', function($interval) {
  var service = {};
  service.logged_in_user;
  service.logged_in_time;
  service.display_string_logged_in_time = "0";
  service.timer;

  //function to save user name on login and start timer to update the login time display
  service.logInUser = function(user_name) {
    service.logged_in_user = user_name;
    service.logged_in_time = Date.now();
    service.timer = $interval(function() {
      var now = Date.now();
      var diff = now - service.logged_in_time;
      service.display_string_logged_in_time = Math.floor((diff / 1000) / 60);
    }, 60000);
  };

  //called when UserController is destroyed to stop the timer
  service.logOutUser = function() {
    if (service.timer) {
      $interval.cancel(service.timer);
    }
  }

  return service;
}]);
