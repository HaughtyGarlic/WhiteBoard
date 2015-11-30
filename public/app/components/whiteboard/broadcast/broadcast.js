angular.module('whiteboard.broadcast', [])
  .controller('BroadcastController', function ($scope) {})
  .directive('broadcast', function ($document, socket) {
    return {
      restrict: 'A',
      controller: 'BroadcastController',
      link: function (scope, element, attr) {

        var board = element.find('canvas');

        board.on('mousedown', mouseDown);
        $document.on('mouseup', mouseUp);

        board.on('$destroy', function () {
          board.off('mousedown', mouseDown);
          $document.off('mouseup', mouseUp);
        });

        function mouseDown(event) {
          event.preventDefault();
          socket.emit('start', scope.pen);
          board.on('mousemove', mouseMove);
        }

        function mouseUp(event) {
          event.preventDefault();
          socket.emit('end', null);
          board.off('mousemove', mouseMove);
        }

        function mouseMove(event) {
          event.preventDefault();
          var position = [event.offsetX, event.offsetY];
          socket.emit('drag', position);
        }
      }
    };
  })
  .directive('receive', function ($document, $location, Room, socket) {
    return {
      restrict: 'A',
      controller: 'BroadcastController',
      link: function (scope, element, attr) {

        var board = element.find('canvas');
        var users = {};

        var Player = function (userid) {
          this.userid = userid;
          this.pen = {};
          this.last = null;
          this.context = board[0].getContext("2d");
        };

        Player.prototype.getPen = function () {
          for (var penProperty in this.pen) {
            this.context[penProperty] = this.pen[penProperty];
          }
        };

        Player.prototype.draw = function (from, to) {
          this.getPen();
          this.context.beginPath();
          this.context.moveTo(from[0], from[1]);
          this.context.lineTo(to[0], to[1]);
          this.context.stroke();
        };

        Room.getRoom($location.path())
          .then(function (data) {
            socket.init(data.id);

            socket.on('userJoin', function (data) {
              var user = new Player(data.userid);
              users[data.userid] = user;
            });

            socket.on('userLeave', function (data) {
              if (users[data.userid]) {
                delete users[data.userid];
              }
            });

            socket.on('end', function (data) {
              var user = users[data.userid];
              user.last = null;
            });

            socket.on('drag', function (data) {
              var user = users[data.userid];
              user.pen = data.pen;
              var current = data.coords;
              user.last = user.last === null ? current : user.last;
              user.draw(user.last, current);
              user.last = current;
            });

            socket.on('join', function (board) {

              console.log("Joining the board.");
              // Check for null board data.
              if (!board) {
                console.log('empty board');
                return;
              }

              // GET OTHER PLAYERS
              board.users.forEach(function (userid) {
                users[userid] = new Player(userid);
              });

              board.strokes.forEach(function (stroke) {
                // Check for null stroke data.
                if (!stroke || stroke.path.length < 2) {
                  return;
                }
                pen = stroke.pen;

                //draw path
                stroke.path.reduce(function (from, to) {
                  console.log(from, to);
                  draw(from, to);
                  return to;
                });

              });
            });
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    };
  });
