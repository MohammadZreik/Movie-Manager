var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Genres = require('../models/genre');
var Movie = require('../models/movie');

router.get('/', function(req, res, next) {

  if (!req.query.name) {
    Genres.find(({}), (err, genres) => {
      if (err) {
        return next(err);
      }
      res.json(genres);
    });
  } else if (req.query.name) {
    Genres.findOne({name: req.query.name}).populate('movies').exec((err, movies) => {
      if (err) {
        return next(err);
      }
      res.json(movies);
    });
  }
});

router.get('/:id/movies', function(req, res, next) {

  var gen = req.params.id;

  Genres.findOne({_id: gen}).populate('movies').exec(function(err, genres) {
    if (err) {
      return next(err);
    }
    res.json(genres.movies);
  });
});

module.exports = router
