var Board = require('./boardModel.js');

module.exports = {
  allBoards: function(req, res, next) {
    Board.find({})
    .where('difficulty').equals(req.body.difficulty)
    //.limit(10)
    .exec(function(err, boards) {
      if(err) console.log(err)
      res.json(boards);
    });
  },

  addBoard: function(req, res, next) {
    board = req.body.board.split('')
    board.pop();
    board.shift();
  	var newBoard = {
  		board: board,
  		difficulty: req.body.difficulty
  	}
  	Board.create(newBoard, function (err, newBoard) {
  	  if (err) return console.log(err);
  	  res.json(newBoard);
  	})
  }
};