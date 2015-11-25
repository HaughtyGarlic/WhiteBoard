'use strict';

angular.module('playlist', [])

.controller('PlaylistController', function($scope, $mdDialog, $timeout, soundCloud, songQueue, audio, webRTC) {

  $scope.songQueue = songQueue._songQueue;

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.querySearch = function(query) {
    return soundCloud.getSongs(query);
  };

  $scope.selectedItemChange = function(item) {
    // debugger;
    if(item) {

      songQueue.addToQueue(item);
      webRTC.updateTheKids();
      $scope.searchText = '';
      $scope.selectedItem= null;
      //check to see if this was the first song added to the queue
      if(songQueue._songQueue.length === 1) {
        console.log('queueing first song')
        songQueue.queueNext();
      }

      $scope.songQueue = songQueue._songQueue;
    }
  };

  $scope.removeFromQueue = function(index) {

    console.log(index);
    songQueue.removeFromQueue(index);
    webRTC.updateTheKids();

    $scope.songQueue = songQueue._songQueue;

  };

  songQueue.updatePlaylist(function(newSongQueue) {
    $scope.songQueue = newSongQueue;
  });

});