//Set up new vue and connect it to the app
const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'adminmovies',
      component: require("./src/components/genresMovies.vue")
    }, {
      path: '/createMovie',
      name: 'createMovie',
      component: require("./src/components/createMovie.vue")
    }, {
      path: '/singleMovie/:_id',
      name: 'SingleMovie',
      component: require("./src/components/singleMovie.vue")
    }, {
      path: '/genreList',
      name: 'genres',
      component: require("./src/components/genreList.vue")
    }
  ]
});

var adminBaseRouter = require("./src/components/baseRouter.vue");

new Vue({
  router: router,
  render: function(createElement) {
    return createElement(adminBaseRouter);
  }
}).$mount("#mountpoint");
