var router = require('express').Router();
var boardController = require('./boards/boardController.js');

router.post('/api/boards', boardController.allBoards);
router.post('/api/create', boardController.addBoard);


module.exports = router;