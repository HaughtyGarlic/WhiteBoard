app.factory('socket', function ($rootScope, $window) {
  // Connect to sockets.io with unique ioRoom ID - 
  // either a new whiteboard or used and saved previously
  // by [sockets.js](../docs/sockets.html)
  var ioRoom = $window.location.href;
  var socket = io(ioRoom);
  return {
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
