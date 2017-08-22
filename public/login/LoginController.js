//controller to handle login page
//consumes the user service and stores the username & redirects to chat page
app.controller('LoginController', ['$scope', '$location', 'Users', function($scope, $location, Users) {
  $scope.user_name = "";
  $scope.goToChat = function(p) {
    if ($scope.loginForm.userName.$valid == false) { //if username is not entered show error
      $scope.loginForm.userName.$error.required = true;
      $scope.loginForm.userName.$dirty = true;
      return;
    }
    Users.logInUser($scope.user_name); //update service attributes so all controllers can use this information
    $location.path(p); //if username is entered go to chat.html
  }
}]);
