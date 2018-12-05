var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Movie = require('../models/movie');
var Genres = require('../models/genre');

router.get('/', (req, res, next) => {
  Movie.find(({}), (err, movies) => {
    if (err) {
      return next(err);
    }
    res.json(movies);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Movie.find({
    "_id": id
  }, function(err, movies) {
    res.json({"data": movies});
  });
});

module.exports = router
