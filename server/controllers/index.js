const express = require('express');
var path = require('path');

var router = express.Router();

// Insert routes below
router.use('/api/movies', require('./movies.js'));
router.use('/api/genres', require('./genres.js'));
router.use('/api/admin/movies', require('./adminMovies.js'));
router.use('/api/admin/genres', require('./adminGenres.js'));

router.route('/user').get(function(req, res) {
  res.sendfile(req.app.get('appPath') + '/user.html');
});

router.route('/admin').get(function(req, res) {
  res.sendfile(req.app.get('appPath') + '/admin.html');
});

// All other routes redirect to the index.html
router.route('/*').get(function(req, res) {
  res.sendfile(app.get('appPath') + '/index.html');
});

router.get('/api', function(req, res) {
  res.json({"message": "Sh!tfl!xXx"});
});

module.exports = router;
