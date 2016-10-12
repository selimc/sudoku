var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var router = require("./router.js");

var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/sudoku';
var port = process.env.PORT || 5000;

var app = express();
mongoose.connect(dbUrl);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/../client'));


app.use("/", router);
app.listen(port);
module.exports = app;