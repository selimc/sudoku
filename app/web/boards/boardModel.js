var mongoose = require('mongoose');

var BoardSchema = new mongoose.Schema({
  board: [String],
  difficulty: String
});

module.exports = mongoose.model('Boards', BoardSchema);