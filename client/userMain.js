//Set up new vue and connect it to the app
const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'usermovies',
      component: require("./src/components/genresMovies.vue")
    }, {
      path: '/singleMovie/:_id',
      name: 'SingleMovie',
      component: require("./src/components/singleMovie.vue")
    }
  ]
});

var userBaseRouter = require("./src/components/baseRouter.vue");

new Vue({
  router: router,
  render: function(createElement) {
    return createElement(userBaseRouter);
  }
}).$mount("#mountpoint");
