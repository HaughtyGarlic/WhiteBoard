'use strict';

angular.module('playlist', [])

.controller('PlaylistController', function($scope, $mdDialog, $timeout, soundCloud) {
  
  $scope.queue = [];

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
    $scope.queue.push(item);
    $scope.searchText = '';
    $scope.selectedItem= undefined;
  };

});