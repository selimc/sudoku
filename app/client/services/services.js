angular.module('sudoku.services', [])
.factory('Boards', function($http) {
  var getAll = function (diff, success) {
    $http({
      method: 'POST',
      url: '/api/boards',
      data: diff
    })
    .then(success, function(res){console.log(res)});
  };

  var addOne = function(board, success) {
    $http({
      method: 'POST',
      url: '/api/create',
      data: board
    })
    .then(success, function(res){console.log(res)});
  };

  return {
    getAll: getAll,
    addOne: addOne
  }
})