angular.module('sudoku.create', [])

.controller('CreateController', function($scope, Boards) {
  $scope.addBoard = function () {
    Boards.addOne($scope.board, function(res){
      console.log("Board added:");
      console.log(res);
    })
  };
});
