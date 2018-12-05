var express = require('express');
var router = express.Router();

var Movie = require('../models/movie.js');
var Genre = require('../models/genre.js');

//Get

router.get('/', (req, res, next) => {
  Movie.find(({}), (err, movies) => {
    if (err) {
      return next(err);
    }
    res.json({"movies": movies});
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  Movie.findById(id, function(err, movies) {

    if (movies == null) {
      return res.status(404).json({"message": "Movie by that ID not found"});
    }
    if (err) {
      return next(err);
    }
    res.status(200).json({"movies": movies});
  });
});

// **********************************

//Post

router.post('/', (req, res, next) => {
  var movie = new Movie(req.body);

  movie.save((err) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(movie);
  });
  var id = req.body.genre;
  Genre.findById(id, (err, genre) => {

    if (err) {
      return next(err);
    }
    if (genre == null) {
      return res.status(404).json(genre);
    }

    genre.movies.push(movie._id);
    genre.save();
  });
});

// **********************************

//Put

router.put('/:id', function(req, res, next) {
  var id = req.params.id;

  Movie.findById(id, function(err, movies) {
    if (err) {
      return next(err);
    }

    if (movies == null) {
      return res.status(404).json({"message": "Movie not found"});
    }
    var Ogenre = movies.genre;
    movies.title = req.body.title;
    movies.description = req.body.description;
    movies.imgurl = req.body.imgurl;
    movies.rating = req.body.rating;

    if (movies.genre != req.body.genre) {

      Genre.findOne({
        _id: req.body.genre
      }, function(err, foundgenre) {
        if (err) {
          console.log(err);
        }
        if (foundgenre == null) {
          return res.status(404).json({"msg": "Genre not found"});
        } else {
          movies.genre = req.body.genre;
          foundgenre.movies.push(movies);
          foundgenre.save();

          Genre.findOne({
            _id: Ogenre
          }, function(err, foundgenre) {
            if (err) {
              console.log(err);
            }
            if (foundgenre == null) {
              return res.status(404).json({"message": "Genre not found"});
            }

            foundgenre.movies.splice(foundgenre.movies.indexOf(movies._id), 1);
            foundgenre.save();

          })

          movies.save(function(err) {
            if (err) {
              console.log(err);
            }
            res.json(movies);
          })
        }
      });

    } else {
      movies.genre = movies.genre

      movies.save(function(err) {
        if (err) {
          console.log(err);
        }
        res.json(movies);
      })

    }
  });
});

// **********************************

//Patch

router.patch('/:id', (req, res, next) => {
  var id = req.params.id;

  Movie.findById(id, (err, movie) => {
    var oldGenre = movie.genre;

    if (err) {
      return next(err);
    }
    if (movie == null) {
      return res.status(404).json({"message": "Movie by that ID not found"});
    }
    movie.title = (req.body.title || movie.title);
    movie.description = (req.body.description || movie.description);
    movie.imgurl = (req.body.imgurl || movie.imgurl);
    movie.rating = (req.body.rating || movie.rating);
    if (req.body.genre != movie.genre && req.body.genre) {

      Genre.findOne({
        _id: req.body.genre
      }, (err, genre) => {
        if (err) {
          return next(err);
        }
        if (genre == null) {
          return res.status(404).json({"message": "Genre not found"});
        } else {
          movie.genre = req.body.genre;
          genre.movies.push(movie._id);
          genre.save();

          Genre.findOne({
            _id: oldGenre
          }, (err, foundGenre) => {
            if (err) {
              return next(err);
            }
            if (foundGenre == null) {
              return res.status(404).json({"message": "Genre not found"});
            }
            foundGenre.movies.splice(foundGenre.movies.indexOf(movie._id), 1);
            foundGenre.save();
          });

          movie.save();
          res.json(movie);
        }
      });
    } else {
      movie.genre = movie.genre;
      movie.save();
      res.json(movie);
    }
  });
});

// **********************************

//Delete

router.delete('/', (req, res, next) => {
  Movie.deleteMany(({}), (err, movie) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(movie);
  });
});

router.delete('/:_id', function(req, res) {
  var id = req.params._id;
  var movieToDelete = {
    _id: id
  };
  Movie.deleteMany(movieToDelete, function(err, obj) {
    if (err) 
      console.log(err);
    else if (movieToDelete == null) {
      return res.status(404).json({"message": "Movie to delete not found"});
    }
    res.status(200).json(movieToDelete);
  })
})
module.exports = router;
