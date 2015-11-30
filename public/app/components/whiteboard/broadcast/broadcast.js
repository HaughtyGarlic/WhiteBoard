angular.module('whiteboard.broadcast', [])
  .controller('BroadcastController', function ($scope) {})
  .directive('broadcast', function ($document, socket) {
    return {
      restrict: 'A',
      controller: 'BroadcastController',
      link: function (scope, element, attr) {

        console.log('hi from broadcast');

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

        console.log('hi from receive');

        var board = element.find('canvas');
        var context = board[0].getContext("2d");
        var last = null;
        var pen = {};

        function getPen() {
          for (var penProperty in pen) {
            context[penProperty] = pen[penProperty];
          }
        }

        function draw(from, to) {
          getPen();
          context.beginPath();
          context.moveTo(from[0], from[1]);
          context.lineTo(to[0], to[1]);
          context.stroke();
        }

        Room.getRoom($location.path())
        .then(function (data) {
          socket.init(data.id);
          socket.on('end', function () {
            last = null;
          });

          socket.on('drag', function (data) {
            pen = data.pen;
            var current = data.coords;
            console.log('other user drawing:' + current);
            last = last === null ? current : last;
            draw(last, current);
            last = current;
          });

          socket.on('join', function (board) {
            console.log("Joining the board.");
            // Check for null board data.
            if (!board) {
              console.log('empty board');
              return;
            }
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
        .catch(function(err) {
          console.error(err);
        })
      }
    };
  });