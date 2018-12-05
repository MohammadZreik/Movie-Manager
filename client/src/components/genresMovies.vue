<template>
    <div class="movies outterWrap">

        <div class="row">
            <div class="col-sm-12">

                <div v-if="isAdmin > -1">
                    <button type="button" class="btn btn-dark" onclick="window.open('#/genreList', '_self')">Handle genres</button>
                    <button type="button" class="btn btn-info" onclick="window.open('#/createMovie','_self')">+Create movie</button>
                    <button v-if="deleteAllMovies === false" type="button" class="btn btn-danger" @click="deleteAllMovies=true">Delete all movies</button>
                    <div v-if="deleteAllMovies === true" >
                        <p>Really delete all movies? (Cannot be undone)</p>
                         <button type="button" class="btn btn-danger" @click="deleteMovies()">Yes, delete all!</button>
                         <button type="button" class="btn btn-info" @click="deleteAllMovies=false">No, keep all!</button>
                    </div>

                </div>

                <h3>View all movies of all genres here, or choose to filter</h3>
                <h6>Filter movies by genre:</h6>
                <select>  <!-- The movie genre will be set to the bind value of the chosen option, which is a genre id -->
                    <option disabled value="">Filter by genre</option>
                    <option @click="getMovies()">All genres</option>
                    <option  @click="filterMovies(genre._id)" v-for="genre in genres" v-bind:key="genre._id" v-bind:value="genre._id">{{genre.name}}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-1">
            </div>

            <div class="col-sm-9" id="app"> <!-- in here we want the dynamic grid of movies -->
               <!-- the stuff below inside here should be dynamic -->
                <div class="row">
                    <div class="col movie-col" v-for="movie in movies" v-bind:key="movie._id">

                        <router-link :to="{ name: 'SingleMovie', params: {_id: movie._id}}">
                            <img v-bind:src="movie.imgurl" v-bind:key="movie._id" style="width:150px">
                        </router-link>
                        <div v-if="isAdmin > -1">

                            <div v-if="movieToDelete === movie._id">
                                <p>Do you really want to delete?</p>
                                <button @click="deleteMovie(movieToDelete)" type="button" class="btn btn-danger btn-sm">Yes, delete.</button>
                                <button @click="movieToDelete=0" type="button" class="btn btn-info btn-sm">No, keep.</button>
                            </div>
                             <button v-else type="button" class="btn btn-danger btn-sm" @click="movieToDelete=movie._id">Delete Movie</button>

                        </div>
                        <p>{{movie.title}}</p>
                        <p>{{movie.genre}}</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-1">
            </div>

        </div>
    </div>
</template>

<script>
    var axios = require('axios');
    module.exports = {
        name: 'movies',
        data () {
            return{
                movies: [],
                genres: [],
                filteredByGenre: [],
                isAdmin: window.location.href.indexOf("admin"),
                confirmation: false,
                deleteAllMovies: false,
                movieToDelete: 0
            }
        },
        methods: {

            getMovies: function(){
                console.log('entered getmovies');
                axios.get('http://localhost:3000/api/movies')
                .then(
                    (response) => {
                        console.log('entered response');
                        if(response.status !== 200){
                            console.log("Wrong status code: " + response.status);
                        }
                        this.movies.length = 0;
                        for(var i = 0; i < response.data.length; i++){
                            var movie = response.data[i];

                            for(var j = 0; j < this.genres.length; j++){
                                if(movie.genre === this.genres[j]._id){
                                    movie.genre = this.genres[j].name;
                                    console.log('genres id then name');
                                    console.log(this.genres[j]._id);
                                    console.log(this.genres[j].name);
                                }
                            }
                            //this.colsInOneRow++;
                           // movie.genre = this.getGenre(movie.genre);
                            this.movies.push(response.data[i]);
                            //console.log(movie.genre);
                        }
                        console.log(this.movies.length);
                    }
                )
                .catch(error => {
                    this.movies.length = 0;
                    console.log(error);
                })
                .then(function(){

                });
            },

            getGenre(genreID){
                axios.get('http://localhost:3000/api/admin/genres/' + genreID)
                .then((response)=>{
                    if(response.status !== 200){
                        console.log("Wrong status code: " + response.status);
                    }

                    //return response.data.data.name;
                })
                .catch((error)=>{
                    console.log(error);
                });
            },

            getGenres(){  //Since we can reuse this in other components, would be nice to have it in its own class where we can call it
                console.log('entered getgenres');
                axios.get('http://localhost:3000/api/genres')
                .then(
                    (response) => {
                        console.log('entered getgenres response');
                        if(response.status !== 200){
                            console.log("Wrong status code: " + response.status);
                        }
                        this.genres.length = 0;
                        //console.log('length of response data:' + response.data.length);
                        for(var i = 0; i < response.data.length; i++){
                            //console.log(response.data[i]);
                            this.genres.push(response.data[i]);
                        }
                        console.log('This many genres exist: ' + this.genres.length);
                    }
                )
                .catch(error => {
                    this.genres.length = 0;
                    console.log(error.response);
                })
                .then(function(){
                });
            },

            filterMovies(genreID){
                let genreName = '';
                console.log('filtergenreid '+genreID);
                for(var i = 0; i < this.genres.length; i++){
                    if(genreID === this.genres[i]._id){
                        genreName = this.genres[i].name;
                    }
                console.log('filtergenrename '+genreName);
                }
                axios.get('http://localhost:3000/api/admin/genres/'+genreID+'/movies')
                .then((response)=>{
    	                console.log('entered filterresponse'); //we could extract only the movies from the genre and put it into the movies array
                        if(response.status !== 200){
                            console.log("Wrong status code: " + response.status);
                        }
                        this.movies.length = 0;
                        console.log('this many movies of this genre ' + response.data.length);
                        for(var i = 0; i < response.data.length; i++){ //dont need since we are always only gonna get back 1 genre (unless we made 2 genres witht the same name)
                               var movie = response.data[i];

                            for(var j = 0; j < this.genres.length; j++){
                                if(movie.genre === this.genres[j]._id){
                                    movie.genre = this.genres[j].name;
                                }
                            }
                                this.movies.push(response.data[i]);
                        }
                        //this.getMovies();
                        console.log('number of filtered movies: ' + this.movies.length);
                })
                .catch((error)=>{
                    this.getMovies();
                    console.log(error);
                });
            },

            deleteMovies(){
                axios.delete('http://localhost:3000/api/admin/movies')
                .then(
                    response => {
                        this.movies.splice(0);
                        this.deleteAllMovies=false;
                        //this.getMovies();
                        console.log("Success: " + response.status);
                })
                .catch( (error) => {
                    console.log(error);
                })
                .then(function () {

                });
            },

            deleteMovie(movieID){
                console.log("Deleting movie with ID " + movieID);
                axios.delete('http://localhost:3000/api/admin/movies/' + movieID)
                .then(
                    (response) => {
                        var localIndex = -1;
                        for (var i=0; i < this.movies.length; i++) {
                            if (this.movies[i]._id === movieID) {
                                localIndex = i;
                                i = this.movies.length;
                            }
                        }
                        if (localIndex !== -1) {
                            this.movies.splice(localIndex, 1);
                        }
                        console.log("Success: " + response.status);
                        //this.getMovies();
                })
                .catch( (error) => {
                    console.log(error);
                })
                .then(function () {

                });
            },

            confirmWindow(){
                if(confirm("Do you really want to delete?")){
                    confirmation = true;
                }else{
                    confirmation = false;
                }
            }

        },
        mounted () {
            this.getGenres();
            this.getMovies();
        }
    }
</script>

<style>
.movies{
    margin-top: 50px;
}
</style>
