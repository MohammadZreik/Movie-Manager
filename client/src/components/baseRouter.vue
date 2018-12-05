
<template>
<div>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <a href="http://localhost:3000/" class="navbar-brand"> <img src="https://i1.wp.com/nerdbastards.com/wp-content/uploads/2011/10/shitflix.jpg" width="100">
    </a>
    <ul class="navbar-nav" v-if="isAdmin > -1">



      <li class="nav-item">
        <a class="nav-link text-light" href="http://localhost:3000/user#/">User</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-light" href="http://localhost:3000/admin#/">Admin</a>
      </li>


    </ul>
  </nav>
  <!-- This is our footer -->
  <div class="row">
    <!-- The empty col-2 here are just used as a placeholder on the right and left -->
    <div class="col-sm-2">
    </div>
    <!-- Router view is where we will mount our dynamic content -->

    <div class="col-sm-8 text-center mb-2">
      <router-view></router-view>
    </div>

    <div class="col-sm-2">
    </div>
  </div>
  <!-- This is our footer -->
  <div class="jumbotron text-center w-100 mx-auto bg-dark text-light" style="margin-bottom:0">
    <p>Created by Group 3, Oct 2018</p>
  </div>
</div>
</template>

<script>
module.exports = {
  name: "BaseRouter",
  data() {
    return {
      isAdmin: window.location.href.indexOf("admin")
    }
  }
};
</script>
