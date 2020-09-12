<template>
<div class="pure-g">
    <div class="text-box pure-u-1 pure-u-md-1 pure-u-lg-1 pure-u-xl-1">
      <div class="l-box">
        <h1 class="text-box-head">Score App</h1>
        <p class="text-box-subhead">This application records practice test scores.</p>
      </div>
    </div>
  <div id="login">
    <h2>Login</h2>
    <form v-on:submit.prevent="login" class="pure-form pure-form-stacked">
      <label>
        <input v-model="username" placeholder="Username" />
      </label>
      <label>
        <input v-model="password" placeholder="Password" type="password" />
      </label>
      <br />
      <button type="submit" class="pure-button pure-button-primary">ログイン</button>
      <p>
        新たに
        <router-link to="signup">サインアップ</router-link>する
      </p>
      <p v-if="error" class="error">ログインに失敗しました</p>
    </form>
  </div>
</div>
</template>
<script>
import axios from "axios";
import auth from "../auth";

export default {
  data: function () {
    return {
      username: "",
      password: "",
      error: false,
    };
  },

  methods: {
    login: function () {
      let _this = this;
      //
      if (this.username.indexOf("@") != -1) {
        _this.error = true;
        return;
      }
      //
      auth
        .authenticate(this.username, this.password)
        .then(function (res) {
          console.log(res);
          _this.$router.replace("/home");
        })
        .catch(function (err) {
          console.log(err);
          _this.error = true;
        });
    },
  },
};
</script>

<style>
#login {
  padding: 0.5em 1em;
}

.header .pure-menu {
  border-bottom-color: black;
  border-radius: 0;
}
.pure-menu-link {
  padding: 1em 0.7em;
}
.text-box-head {
  color: #fff;
  padding-bottom: 0.2em;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 24px;
}
.text-box-subhead {
  font-weight: normal;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
h2 {
  margin: 0.67em 0;
  letter-spacing: 0.05em;
}
p {
  margin: 0.67em 0;
  letter-spacing: 0.05em;
}
.l-box {
  padding: 2em;
}
.text-box {
  text-align: left;
  overflow: hidden;
  position: relative;
  height: 180px;
  background: rgb(49, 49, 49);
  color: rgb(255, 190, 94);
}
.stripe-table tr:nth-child(even) td,
.stripe-table tr:nth-child(even) th {
  background-color: white;
}
td {
  text-align: right;
}
</style>