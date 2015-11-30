angular.module('whiteboard', [])
  .controller('WhiteboardController', function ($scope) {
    $scope.pen = {
      fillStyle: 'solid',
      strokeStyle: "red",
      lineWidth: 5,
      lineCap: 'round'
    };

  })
  .directive('whiteboard', function ($document) {
    return {
      restrict: 'E',
      controller: 'WhiteboardController',
      //pass attrs to template
      template: function (element, attr) {
        var height = attr.height || '200px';
        var width = attr.width || '200px';
        return '<canvas height="' + height + '" width ="' + width + '"></canvas>';
      },
      link: function (scope, element, attr) {

        var board = element.find('canvas');
        var context = board[0].getContext("2d");
        var last = null;

        board.on('mousedown', mouseDown);
        $document.on('mouseup', mouseUp);

        board.on('$destroy', function () {
          board.off('mousedown', mouseDown);
          $document.off('mouseup', mouseUp);
        });

        function getPen() {
          var pen = scope.pen || {};
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

        function mouseDown(event) {
          event.preventDefault();
          board.on('mousemove', mouseMove);
        }

        function mouseUp(event) {
          event.preventDefault();
          board.off('mousemove', mouseMove);
          last = null;
        }

        function mouseMove(event) {
          event.preventDefault();
          var current = [event.offsetX, event.offsetY];
          last = last === null ? current : last;
          draw(last, current);
          last = current;
        }
      }
    };
  });
