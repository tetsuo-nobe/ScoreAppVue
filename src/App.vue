<template>
  <div id="app">
    <div class="header">
      <div class="pure-menu pure-menu-horizontal">
        <a class="pure-menu-heading" href="">Score App</a>
        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-selected"><router-link  to="/" class="pure-menu-link">Home</router-link></li>
          <li class="pure-menu-item"><router-link  to="/input" class="pure-menu-link">Input</router-link></li>
           <li class="pure-menu-item">
                    <router-link v-if="isLoggedIn" to="/logout" class="pure-menu-link">Logout</router-link>
                    <router-link v-if="!isLoggedIn" to="/login" class="pure-menu-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
    <div class="footer">
      This app was made by tnobe.
    </div>
  </div>
</template>

<script>
import auth from "./auth";
export default {
  data() {
    return {
      isLoggedIn: auth.loggedIn()
    };
  },
  created: function() {
    auth.onChange = isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    };
  }
};
</script>

<style>
.footer {
  color: whitesmoke;
  font-size: 87.5%;
  border-top: 1px solid #eee;
  margin-top: 1em;
  padding: 1em;
  background: darkblue;
}
</style>

