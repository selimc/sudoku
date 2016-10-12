angular.module('sudoku.boards', [])

.controller('BoardController', function($scope, $interval, Boards) {
  $scope.timer = '00:00';
  $scope.boards;
  $scope.playBoard;
  $scope.result = '';
  var original = [];
  var currentBoard = 0;
  var currentDiff = 'easy';
  var intervalPromise;
  var startTime;

  var startTimer = function() {
    startTime = Date.now();
    intervalPromise = $interval(function() {
        $scope.timer = moment(new Date() - startTime).format('mm:ss');
      }, 1000);
  }

  var stopTimer = function() {
    $interval.cancel(intervalPromise);
  }

  $scope.getGame = function(diff) {
    if(diff !== currentDiff) {
      currentDiff = diff
      $scope.getBoards(diff);
    } else {
      setRandomBoard();
    }
  }

  var setRandomBoard = function() {
    $scope.result = '';
    original = [];
    currentBoard = Math.floor(Math.random() * $scope.boards.length);
    $scope.playBoard = $scope.boards[currentBoard].board.slice();
    startTimer();
  }

  $scope.getBoards = function (diff) {
    var diff = {difficulty: diff}
    Boards.getAll(diff, function(res){
      $scope.boards = res.data;
      setRandomBoard();
    })
  };
  $scope.getBoards('easy');

  $scope.checkRight = function(index) {
    return index % 3 === 2 && index % 9 !== 8
  }

  $scope.checkBottom = function(index) {
    return [18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47 ,48, 49, 50, 51, 52, 53].includes(index);
  }

  $scope.enterNumber = function($event) {
    if(original[this.$id - 3] === false) {
      if(!isNaN($event.key) && $event.key !== '0') {
        this.n = $event.key
      } 
      if($event.key == 'Backspace' || $event.key == 'Delete' || $event.key == 'Escape') {
        this.n = ' ';
      }

      $scope.playBoard[this.$id - 3] = this.n;
    }
  }

  $scope.checkBoard = function() {
    var checkBoard = "";
    if($scope.playBoard !== undefined) {
      checkBoard = $scope.playBoard.join("");
      $scope.result = sudokuCheck(checkBoard);
      if($scope.result === 'correct!') stopTimer();
    }
  }

  $scope.createBoard = function(n) {
    if(original[this.$id - 3] === undefined) original[this.$id - 3] = !isNaN(n) && n !== ' ';
    return original[this.$id - 3];
  }

  $scope.solveBoard = function() {
    var board = $scope.boards[currentBoard].board.slice();
    var solution = false;
    function recurse(idx) {
      if(idx === 81) {
        return true;
      }
      for(var i = idx; i < board.length; i++) {
        if(!original[i]) {
          for(var j = 1; j < 10; j++) {
            board[i] = j.toString();
            var stringBoard = board.join('');
            if(checkRowSolve(stringBoard) && checkColumnSolve(stringBoard) && checkGridSolve(stringBoard)) {
              if(recurse(i + 1)) return true;
            }
          }
          board[i] = ' ';
          return false;
        }
      }
      return true;
    }
    recurse(0);
    $scope.playBoard = board;
  }
});

function sudokuCheck (board) {
  if(!checkRow(board) || !checkColumn(board) || !checkGrid(board)) 
    return 'invalid board';
  return 'correct!'
}

function checkRow(board) {
  for(var i = 0; i < 9; i++) {
    let row = board.slice(i * 9, (i + 1) * 9).split("");
    if(!checkDigits(row)) return false;
  }
  return true;
}

function checkColumn(board) {
  for(let i = 0; i < 9; i++) {
    let column = [];
    for(let j = 0; j < 9; j++) {
      column.push(board[(j * 9) + i]);
    }
    if(!checkDigits(column)) return false;
  }
  return true;
}

function checkGrid(board) {
  for(let i = 0, l = 0; i < 9; i++) {
    let grid = [];
    for(let j = 0, k = 0; j < 9; j++) {
      grid.push(board[(i * 3) + j + k + l]);
      if(j % 3 === 2) k += 6;
    }
    if(i % 3 === 2) l += 18;
    if(!checkDigits(grid)) return false;
  }
  return true;
}

function checkDigits(arr) {
  for(let j = 1; j < 10; j++) {
    if(!arr.includes(j.toString())) return false;
  }
  return true;
}

function checkRowSolve(board) {
  for(var i = 0; i < 9; i++) {
    let row = board.slice(i * 9, (i + 1) * 9).split("");
    if(!checkDigitsSolve(row)) return false;
  }
  return true;
}

function checkColumnSolve(board) {
  for(let i = 0; i < 9; i++) {
    let column = [];
    for(let j = 0; j < 9; j++) {
      column.push(board[(j * 9) + i]);
    }
    if(!checkDigitsSolve(column)) return false;
  }
  return true;
}

function checkGridSolve(board) {
  for(let i = 0, l = 0; i < 9; i++) {
    let grid = [];
    for(let j = 0, k = 0; j < 9; j++) {
      grid.push(board[(i * 3) + j + k + l]);
      if(j % 3 === 2) k += 6;
    }
    if(i % 3 === 2) l += 18;
    if(!checkDigitsSolve(grid)) return false;
  }
  return true;
}

function checkDigitsSolve(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    if(arr[i] !== ' ' && arr.slice(i + 1).includes(arr[i])) return false;
  }
  return true;
}