'use strict';

angular.module('nav', ['playlist'])

.controller('NavController', function ($scope, $mdDialog, $location, webRTC, socket) {

  $scope.showPlaylist = function(ev) {
    $mdDialog.show({
      controller: 'PlaylistController',
      templateUrl: 'app/components/playlist/playlist.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.joinRoom = function() {
    //assumes that we are in #/room/:id
    var ioRoom = $location.path().split('/')[2]
    webRTC.joinRoom(ioRoom);
    
    // Room.getRoom($location.path())
    // .then(function (data) {
    //   socket.init(data.id)
    // })
    // .catch(function(err) {
    //   console.error(err);
    // })
  };

  //join on nav init
  $scope.joinRoom();

});