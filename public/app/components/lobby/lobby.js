'use strict';

angular.module('lobby', [])

.controller('LobbyController', function ($scope, $location, Lobby) {
  $scope.newRoom = function() {
  	Lobby.newRoom()
  	.then(function (data) {
  		// Lobby.getRoom(data.id);
  		$location.path('/room/'+data.id);
  	})
  	.catch(function(err) {
  		console.error(err);
  	})
  };
});
