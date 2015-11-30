angular.module('socket', [])

.factory('socket', function ($rootScope, $window, $location) {
  // Connect to sockets.io with unique ioRoom ID - 
  // either a new whiteboard or used and saved previously
  // by [sockets.js](../docs/sockets.html)
  // var ioRoom = $location.path().split('/')[2]
  // var ioRoom = $window.location.origin + '/' + $location.path().split('/')[2];
  var ioRoom;
  // console.log(ioRoom);
  // var socket = io(ioRoom);
  var socket;

  return {
    init: function(room) {
      ioRoom = $window.location.origin + '/' + room;
      console.log('ioRoom: ',ioRoom);
      socket = io(ioRoom);
      // socket.on('join', function(board) {
      //   console.log("Joining the board.");
      //   console.log("Cnnected to room: " + ioRoom, "socket: ", socket);
      // });
    },
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});