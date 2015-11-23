'use strict';

angular.module('lobby', [])

.controller('LobbyController', function ($scope, $window, Lobby) {
  $scope.newRoom = function() {
  	Lobby.newRoom()
  	.then(function (data) {
  		// Lobby.getRoom(data.id);
  		$window.location.href = '/'+data.id;
  	})
  	.catch(function(err) {
  		console.error(err);
  	})
  };
});
