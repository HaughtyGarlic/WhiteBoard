angular.module('whiteboard.pens', [])
  .controller('pensCtrl', function ($scope) {
    $scope.pen = {
      fillStyle: 'solid',
      strokeStyle: "black",
      lineWidth: 5,
      lineCap: 'round'
    };
    $scope.changePen = function (option) {
      if (option === 'eraser') {
        console.log("The user is using the eraser.");
        $scope.pen.lineWidth = 50;
        $scope.pen.strokeStyle = '#fff';
      } else {
        console.log("The user is using " + option);
        $scope.pen.lineWidth = 5;
        $scope.pen.strokeStyle = option;
      }
    };
  })
  .directive('pens', function () {
    return {
      restrict: 'E',
      controller: 'pensCtrl',
      templateUrl: 'app/components/whiteboard/pens/pens.html'
    };
  });
