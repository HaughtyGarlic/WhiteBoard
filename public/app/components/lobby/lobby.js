'use strict';

angular.module('lobby', [])

.controller('LobbyController', function ($scope, $location, Lobby) {

  $scope.newRoom = function() {
  	Lobby.newRoom($scope.newRoomName)
  	.then(function (data) {
  		// Lobby.getRoom(data.id);
  		$location.path('/room/'+data.id);
  	})
  	.catch(function(err) {
  		console.error(err);
  	})
  };

  $scope.getRoom = function(index) {

    $location.path('/room/'+$scope.activeRooms[index]._id);

  };

  $scope.getActiveRooms = function() {
    Lobby.getActiveRooms()
    .then(function(data) {
      $scope.activeRooms = data;
    })
    .catch(function(err) {
      console.error(err);
    })
  };

  $scope.getActiveRooms();

});
