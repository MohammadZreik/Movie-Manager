<template>
<div class="text-center">
  <img src="https://image.flaticon.com/icons/svg/1161/1161829.svg" class="mr-3 mt-3 float-right" style="width:40px;" v-on:click="deleteAllGenre()">
  <img src="https://image.flaticon.com/icons/svg/1177/1177553.svg" class="mr-3 mt-3 float-right" style="width:40px;" v-on:click="checker=true ,checker2=false">
  <br>
  <br>

  <div v-if="checker === true">


    <div class="input-group mb-3 w-75">
      <div class="input-group-prepend">
        <span class="input-group-text bg-dark text-light" id="basic-addon1">Name</span>
      </div>
      <input type="text" id="i1" class="form-control" placeholder="Enter Genre name here" aria-describedby="basic-addon1" v-model="Newname">
    </div>
    <button type="button" class="btn btn-dark text-light" v-on:click="checker=false,postGenre(),Newname=''">Create</button>
    <button type="button" class="btn btn-dark text-light" v-on:click="checker=false">Cancel</button>
  </div>

  <div v-if="checker2 === true">


    <div class="input-group mb-3 w-75">
      <div class="input-group-prepend">
        <span class="input-group-text bg-dark text-light" id="basic-addon1">Name</span>
      </div>
      <input type="text" id="i2" class="form-control" placeholder="Enter Genre name here" aria-describedby="basic-addon1" v-model="Editname">
    </div>
    <button type="button" class="btn btn-dark text-light" v-on:click="checker2=false,putGenre(),Editname=''">Update</button>
    <button type="button" class="btn btn-dark text-light" v-on:click="checker2=false">Cancle</button>
  </div>

  <div v-for="genre in genres" v-bind:key="genre._id" class="media border p-3 mt-3 mb-3 bg-dark">

    <div class="media-body bg-dark">
      <div class="container">
        <div class="row">
          <div class="col">
            <img src="https://image.flaticon.com/icons/svg/148/148926.svg" class="mr-3 mt-3" style="width:30px;" v-on:click="checker2=true,checker=false,id=genre._id">
          </div>
          <div class="col-6 text-center text-light">
            <h5> <i> {{genre.name}}</i> </h5>
          </div>
          <div class="col">
            <img src="https://image.flaticon.com/icons/svg/1161/1161829.svg" class="mr-3 mt-3" style="width:30px;" v-on:click="id=genre._id,deleteGenre()">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>




<script>
var axios = require('axios');

module.exports = {
  name: "genres",
  data() {
    return {
      genres: [],
      Newname: "",
      Editname: "",
      id: "",
      checker: false,
      checker2: false
    }
  },
  methods: {

    getGenre() {
      axios.get('/api/admin/genres')
        .then(
          response => {

            if (response.status !== 200) {
              console.log("Wrong status code: " + response.status);
            }
            this.genres.length = 0;
            for (var i = 0; i < response.data.genres.length; i++) {
              this.genres.push(response.data.genres[i]);
            }
          })
        .catch(error => {

          this.genres.length = 0;
          console.log(error);
        })
        .then(function() {

        });
    },
    postGenre() {
      axios.post('/api/admin/genres', {
          name: this.Newname
        })
        .then(response => {
          this.getGenre();
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    putGenre() {
      axios.put('/api/admin/genres/' + this.id, {
          name: this.Editname
        })
        .then(response => {
          this.getGenre();
          console.log(response);

        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteGenre: function() {
      axios.delete('/api/admin/genres/' + this.id)
        .then(response => {
          var localIndex = -1;
          for (var i = 0; i < this.genres.length; i++) {
            if (this.genres[i]._id === this.id) {
              localIndex = i;
              i = this.genres.length;
            }
          }
          if (localIndex !== -1) {
            this.genres.splice(localIndex, 1);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .then(function() {

        });
    },
    deleteAllGenre: function() {
      axios.delete('api/admin/genres/')
        .then(response => {
          this.genres.splice(0, this.genres.length);
        })
        .catch(error => {
          console.log(error);
        })
        .then(function() {});
    }
  },

  mounted() {
    this.getGenre();
  }
};
</script>

<style>

</style>
