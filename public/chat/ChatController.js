//main chat page controller.
//sends user back to login page if username is not defined
app.controller('ChatController', ['$scope', '$location', 'Users', function($scope, $location, Users) {
  $scope.Users = Users;
  if (Users.logged_in_user == undefined || Users.logged_in_user == "" || Users.logged_in_user == null) {
    //if not logged in then redirect
    $location.path('/login');
  }
}]);
