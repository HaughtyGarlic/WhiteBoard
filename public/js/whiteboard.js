// # Whiteboard Angular Components

// ##### [Back to Table of Contents](./tableofcontents.html)

// Initialize the whiteboard module.

angular.module('whiteboard', ['ui.router', 'ngMaterial', 'ngAnimate'])
  .config(function($stateProvider) {
    $stateProvider
      .state('eraser', {
        controller: 'toolbar'
      });
  })
  // Set App to the root scope. 
  .controller('canvas', function($rootScope, $scope, tools) {
    $rootScope.app = App;
  })

// Set toolbar for colour palette and eraser. 
.controller('toolbar', function($scope, $element, tools) {
  $scope.changePen = function(option) {
    tools.changePen(option);
    console.log("The user chose the tool", $element);
    $('input').not($('#' + option)).attr('checked', false);
  };
})

.controller('radio', function($scope, $mdDialog) {
  $scope.showPlaylist = function(ev) {
    $mdDialog.show({
      controller: 'playlist',
      templateUrl: '../views/playlist.html',
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
})

.controller('playlist', function($scope, $mdDialog, $timeout, soundCloud) {
  
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

})

.service('soundCloud', function($http) {
  var getSongs = function(query) {
    var url = 'https://api.soundcloud.com/tracks?q='+query+'&client_id=9e3abdceafbd5ef113b3430508a34c92&limit=10'
    console.log(query,' - ',url);
    return $http({
      method: 'GET',
      url: url
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  return {
    getSongs: getSongs
  };
})

// Set changePen method.
// Note that an eraser is simply a white pen, not actually erasing [x,y] tuples from the database. 
.service('tools', function($rootScope) {
  var changePen = function(option) {
    console.log($rootScope.app.pen);
    if (option === 'eraser') {
      console.log("The user is using the eraser.");
      $rootScope.app.pen.lineWidth = 50;
      $rootScope.app.pen.strokeStyle = '#fff';
    } else {
      console.log("The user is using the pen.");
      $rootScope.app.pen.lineWidth = 5;
      $rootScope.app.pen.strokeStyle = option;
    }
  };
  return {
    changePen: changePen
  };

});
