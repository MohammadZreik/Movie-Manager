<template>
    <div class="row outterWrap" id="status">

        <div class="col-sm-3">
        </div> 
       
        <div class ="col-sm-6 mx-auto">
            
            <div class="d-block mx-auto createMovieInput">
                <p>Title</p>
                <input type ="text" class="form-control" id="title" name="title" v-model="Movie.title" required> 
            </div>
            <br>
            <div class="d-block mx-auto createMovieInput">
                <p>Description</p>
                <input class="form-control" type ="text" v-model="Movie.description">
            </div>
            <br>
            <div class="d-block mx-auto createMovieInput">
                 <p>Image url</p>
                <input class="form-control" type ="text" v-model="Movie.imgurl">
            </div>
            <br>
            <div class="d-block mx-auto createMovieInput">
                <p>Rating</p>
                <input class="form-control" type ="text" v-model="Movie.rating">
            </div>
            <br>
            <div class="mx-auto d-block">
                <p>Genre</p>
                <select id="genre" class="form-control" v-model="Movie.genre" required>  
                    <option disabled value="">Select one</option>
                    <option v-for="genre in genres" v-bind:key="genre._id" v-bind:value="genre._id">{{genre.name}}</option>
                </select>
            </div>
             
            <div class="d-block mx-auto">
                <button class="btn btn-info" type="button" @click="createMovie(), check()">Create movie</button>
                <p v-if="created===1">Movie created successfully</p>
            </div>
            
        </div>
        
        <div class="col-sm-3">
        </div>

    </div>
</template>

<script>
    var axios = require('axios');
    module.exports = {
        //el: '#status',
        name:"CreateMovie",
        data(){
            return{
                  Movie: {
                      title: '',
                      description: '',
                      imgurl: '',
                      rating: '',
                      genre: ''
                  },
                  genres:[],
                  created: 0,
            }
        },
        methods:{

            createMovie(){  
                console.log('entering create new movie');  

                if(this.Movie.imgurl === ''){
                    this.Movie.imgurl = 'https://cdn.browshot.com/static/images/not-found.png';
                }
                if(this.Movie.description === ''){
                    this.Movie.description = 'No description found.';
                }
                if(this.Movie.rating === ''){
                    this.Movie.rating = '0';
                }

                let newMovie = {
                    title: this.Movie.title,
                    description: this.Movie.description,
                    imgurl: this.Movie.imgurl,
                    rating: this.Movie.rating,
                    genre: this.Movie.genre
                }
                console.log(newMovie);  
                
                axios.post('http://localhost:3000/api/admin/movies', newMovie)
                .then((response)=>{
                    console.log(response);

                    if(this.title != '' || this.genre != ''){

                        this.Movie.title ="";
                        this.Movie.description ="";
                        this.Movie.imgurl ="";
                        this.Movie.rating ="";
                        this.Movie.genre ="";

                        this.created = 1;

                        document.getElementById('title').style.borderColor = none; //delete these??
                        document.getElementById('genre').style.borderColor = none;
                    }
                    else{ //doesnt work 
                        this.created = 2;
                    }
                })
                .catch((error)=>{
                    console.log(error.response);        
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
                        console.log('length of response data:' + response.data.length);
                        for(var i = 0; i < response.data.length; i++){
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
                .then(function(){

                });
            },

            check: function() { 
                if (document.getElementById('title').value == "" || document.getElementById('genre').value == "") {
                    alert('Please make sure the movie has a title and genre');
                    //document.getElementById('title').style.borderColor = "orange";
                    document.getElementById('title').style.border = "3px solid orange";
                    //document.getElementById('genre').style.borderColor = "orange";
                    document.getElementById('genre').style.border = "3px solid orange";
                    return false;
                }
            }
        },
        mounted () {
            this.getGenres();
        }
    };
</script>

<style>

</style>