const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var genreSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    required: true
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'movies'
    }
  ]
});

module.exports = mongoose.model('genres', genreSchema);
