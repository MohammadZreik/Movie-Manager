const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

  title: {
    type: String,
    minlength: 1,
    required: true
  },
  description: {
    type: String,
    default: "No description found"
  },
  imgurl: {
    type: String,
    default: "No image found"
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'genres',
    required: true
  }
});

module.exports = mongoose.model('movies', movieSchema);
