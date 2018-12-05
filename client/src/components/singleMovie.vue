<!--change in adminMain.js path-name to singeMovieView.-->
<template>
<div style="margin: auto;width:50%" class="row">
  <div class="card text-center" id="viewMovie">
    <div v-if="movie !== ''" class="card mb-4">
      <img class="card-img-top" v-bind:src="movie.imgurl" alt="Movie">
      <div class="card-body">
        <h2 class="card-title">{{movie.title}}</h2>
        <h4 class="card-title">Rating: {{movie.rating}}</h4>
        <p class="card-text">{{movie.description}}</p>
        <button v-if="isAdmin > -1" class="btn  btn-primary btn-block" @click="hideDiv(),editPressed=true">Edit</button>
      </div>
    </div>
  </div>

  <div id="editMovie" style="display:none;width:100%;">
    <form style="width:100%">
      <div class="form-group">
        <label class="pull-left"> Title </label>
        <input class="form-control" type="text" :placeholder="movie.title" v-model="movie.title">
      </div>
      <div class="form-group">
        <label class="pull-left"> Image (URL) </label>
        <input class="form-control" type="text" :placeholder="movie.imgurl" v-model="movie.imgurl">
      </div>
      <div class="form-group">
        <label class="pull-left"> Description </label>
        <input class="form-control" type="text" :placeholder="movie.scription" v-model="movie.description">
      </div>
      <div class="form-group">
        <label class="pull-left"> Rating (1-5) </label>
        <input class="form-control" type="text" :placeholder="movie.rating" v-model="movie.rating">
      </div>
      <div class="form-group">
        <label class="pull-left"> Genre </label>
        <select id="genre" class="form-control" v-model="movie.genre" required>
          <option disabled value="">Select one</option>
          <option v-for="genre in genres" v-bind:key="genre._id" v-bind:value="genre._id">{{genre.name}}</option>
        </select>
      </div>
      <button type="button" class="btn btn-success btn-block" @click="updateMovie(movie._id); hideDiv()">Submit</button>
      <button type="button" class="btn btn-secondary btn-block" @click="hideDiv(); getMovie()">Cancel</button>
      <button type="button" class="btn btn-danger btn-block" @click="removeMovie(movie._id);">Remove</button>
    </form>
  </div>
  <div id="deletedMovie" style="display:none">
    <a style="font-size:40px">The movie has been deleted, <a style="font-size:40px" href="/"> go back </a></a>
  </div>
</div>
</template>
<script>
var axios = require('axios');
module.exports = {
  name: "singleMovie",
  data() {
    return {
      movie: '',
      genres: [],
      isAdmin: window.location.href.indexOf("admin")
    }
  },
  methods: {
    getMovie: function() {
      var full_url = document.URL;
      var url_array = full_url.split('/')
      var last_segment = url_array[url_array.length - 1];
      axios.get('/api/movies/' + last_segment)
        .then(
          response => {
            if (response.data.data.length > 0) {
              this.movie = response.data.data[0];
            }
          })
        .catch(error => {
          console.log(error);
        })
        .then(function() {});
    },
    removeMovie: function(id) {
      axios.delete('/api/admin/movies/' + id)
        .then(
          response => {
            var localIndex = -1;
            for (var i = 0; i < this.movie.length; i++) {
              if (this.movie[i]._id === id) {
                localIndex = i;
                i = this.movie.length;
              }
            }

            if (localIndex !== -1) {
              this.movie.splice(localIndex, 1);
            }
            console.log("Success: " + response.status)
          })
        .catch(error => {
          console.log(error);
        })

        .then(respones => {
          viewMovie.style.display = "none";
          editMovie.style.display = "none";
          deletedMovie.style.display = "inherit";
        });
    },

    updateMovie: function(id) {
      let updatedMovie = {
        title: this.movie.title,
        imgurl: this.movie.imgurl,
        description: this.movie.description,
        rating: this.movie.rating,
        genre: this.movie.genre
      }
      axios.patch('/api/admin/movies/' + id, updatedMovie)
        .then((response) => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
        .then(respones => {

        });
    },

    getGenres() { //Since we can reuse this in other components, would be nice to have it in its own class where we can call it
      axios.get('http://localhost:3000/api/genres')
        .then(
          (response) => {
            console.log('entered getgenres response');
            if (response.status !== 200) {
              console.log("Wrong status code: " + response.status);
            }
            this.genres.length = 0;
            console.log('length of response data:' + response.data.length);
            for (var i = 0; i < response.data.length; i++) {
              console.log(response.data[i]);
              this.genres.push(response.data[i]);
            }
            console.log('This many genres exist: ' + this.genres.length);
          }
        )
        .catch(error => {
          this.genres.length = 0;
          console.log(error.response);
        })
        .then(function() {

        });
    },

    hideDiv: function() {
      var viewMovie = document.getElementById("viewMovie");
      var editMovie = document.getElementById("editMovie");
      if (viewMovie.style.display == "none") {
        viewMovie.style.display = "inherit";
      } else {
        viewMovie.style.display = "none";
      }
      if (editMovie.style.display == "inherit") {
        editMovie.style.display = "none";
      } else {
        editMovie.style.display = "inherit";
      }
    },

  },
  mounted() {
    this.getGenres(),
      this.getMovie();
  }
};
</script>
<style>
.form-group {
  width: 100%;
}
</style>
