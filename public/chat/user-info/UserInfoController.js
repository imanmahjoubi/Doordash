//contoller to handle the userinfo template in the chat.html page
//binds username and time to the template when user logs in.
app.controller('UserInfoController', ['$scope', 'Users', function($scope, Users) {
  $scope.Users = Users;
  $scope.$on('$destroy', function() {
    Users.logOutUser();
  });
}]);
