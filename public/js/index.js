//// Main App module definition.
// This handles the routing to the two pages(login & chat) of the app. 
var app = angular.module("myChat", ["ngRoute", "RoomService", "UserService"]);
app.config(function($routeProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: "login/login.html",
    controller: "LoginController"
  }).
  when('/chat', {
    templateUrl: "chat/chat.html",
    controller: "ChatController"
  }).
  otherwise({
    redirectTo: "/login"
  });

});

// Directive(myEnter) for enter key
app.directive('myEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.myEnter);
        });
        event.preventDefault();
      }
    });
  };
});
