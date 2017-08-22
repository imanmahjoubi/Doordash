//controller for the chat room template in the chat.html page
//consumes the Rooms and USer service to get and save data.
//chat is loaded when the logged in user selects a Room
app.controller('ChatRoomController', ['$scope', 'Rooms', 'Users', '$anchorScroll', '$location', function($scope, Rooms, Users, $anchorScroll, $location) {
  $scope.Rooms = Rooms;
  $scope.Users = Users;
  $scope.count = 0;//counter for creating new message id

  $scope.saveChat = function() {
    $scope.count += 1;
    //chat message object to save
    var data = {
      name: Users.logged_in_user,
      message: $scope.user_message,
      id: "id_" + ($scope.count)
    };

    Rooms.addMessageInRoom(data).success(function(message) {
      Rooms.selected_room_messages.push(data);
      $scope.user_message = "";
      goToLastMessage(data.id); // scrolling to bottom of chat after new message is added
    }).error(function(error) {
      alert("Could not save message! err:" + JSON.stringify(error));
      $scope.user_message = "";
    });
  }

  function goToLastMessage(id) {
    $location.hash(id);
    $anchorScroll();
  }

}]);
