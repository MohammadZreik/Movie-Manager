var express = require('express');
var router = express.Router();

var Genre = require('../models/genre.js');
var Movie = require('../models/movie.js');

//Get

router.get('/', function(req, res, next) {

  Genre.find(({}), (err, genres) => {
    if (err) {
      return next(err);
    }
    res.json({"genres": genres});
  });

});

router.get('/', function(req, res, next) {

  if (!req.query.name) {
    Genre.find(({}), (err, genres) => {
      if (err) {
        return next(err);
      }
      res.json(genres);
    });
  } else if (req.query.name) {
    Genre.findOne({name: req.query.name}).populate('movies').exec((err, movies) => {
      if (err) {
        return next(err);
      }
      res.json(movies);
    });
  }
});

router.get('/:id', (req, res, next) => { //I ADDED THIS IN A2
  var id = req.params.id;
  Genre.findById(id, (err, genre) => {
    if (genre == null) {
      return res.status(404).json({"message": "Genre by that ID not found"});
    }
    if (err) {
      return next(err);
    }
    res.status(200).json(genre);
  });
});

router.get('/movies', (req, res, next) => { //I ADDED THIS NOW in A2
  Genre.find({}).populate('movies').exec((err, movies) => {
    if (err) {
      return next(err);
    }
    res.json(movies);
  });
});

//Get

router.get('/:id/movies', function(req, res, next) {

  var gen = req.params.id;

  Genre.findOne({_id: gen}).populate('movies').exec(function(err, genres) {
    if (err) {
      return next(err);
    }
    res.status(200).json(genres.movies);
  });
});

// **********************************

//Post

router.post('/', function(req, res, next) {
  var newgenre = new Genre({name: req.body.name, movies: []});

  newgenre.save(function(err) {
    if (err) 
      return handleError(err);
    res.status(201).json(newgenre);
  });
});

// **********************************

//Put

router.put('/:_id', function(req, res, next) {
  var id = req.params._id;

  Genre.findById(id).populate('movies').exec(function(err, genres) {

    if (err) {
      return next(err);
    }

    genres.name = req.body.name;
    genres.save();
    res.status(200).json(genres)

  })

});

// **********************************

//Patch

router.patch('/:_id', function(req, res) {
  var id = req.params._id;
  Genre.findById(id).populate('movies').exec(function(err, genres) {
    if (err) {
      console.log(err)
    }
    genres.name = (req.body.name || genres.name);
    genres.movies = (req.body.movies || genres.movies);
    genres.save();
    res.json(genres)

  })

});

// **********************************

//Delete

router.delete('/', function(req, res) {

  Movie.deleteMany(({}), function(err) {
    if (err) {
      console.log(err);
    }
  });

  Genre.deleteMany(({}), function(err) {
    if (err) {
      console.log(err);
    }
    res.status(200).send("All genres have been deleted along with the movies");
  });

});

//Delete

router.delete('/:id', function(req, res) {

  var gen = req.params.id

  Genre.findOneAndDelete({_id: gen}).populate('movies').exec(function(err, genre) {
    if (err) {
      return next(err);
    }

    genre.movies.forEach(function(movie) {

      Movie.deleteOne({
        title: movie.title
      }, function(err) {
        console.log(err);
      });

    })

    res.status(200).json(genre);

  });
});

module.exports = router;
