<template>
  <div class="pure-g">
    <div class="text-box pure-u-1 pure-u-md-1 pure-u-lg-1 pure-u-xl-1">
      <div class="l-box">
        <h1 class="text-box-head">Score App</h1>
        <p class="text-box-subhead">This application records practice test scores.</p>
      </div>
    </div>
    <div class="photo-detail pure-u-1 pure-u-md-1 pure-u-lg-1 pure-u-xl-1">
      <form class="pure-form pure-form-aligned">
        <fieldset>
          <div class="pure-control-group">
            <label for="aligned-startdate">実施日</label>
            <input
              type="date"
              id="aligned-startdate"
              placeholder="実施日"
              v-model="startdate"
              required
            />
            <span class="pure-form-message-inline">必須</span>
          </div>
          <div class="pure-control-group">
            <label for="aligned-content">模試名</label>
            <input type="text" id="aligned-content" v-model="title" placeholder="模試名" />
          </div>
          <div class="pure-control-group">
            <label for="aligned-japaneselanguage">国語</label>
            <input type="text" id="aligned-japaneselanguage" v-model="japaneselanguage" placeholder="国語" />
          </div>
          <div class="pure-control-group">
            <label for="aligned-math">数学</label>
            <input
              type="text"
              id="aligned-math"
              v-model="math"
              placeholder="数学"
            />
          </div>
          <div class="pure-control-group">
            <label for="aligned-overall">英語</label>
            <input type="text" id="aligned-english" v-model="english" placeholder="英語" />
          </div>
          <div class="pure-control-group">
            <label for="aligned-overall">社会</label>
            <input type="text" id="aligned-socialstudies" v-model="socialstudies" placeholder="社会" />
          </div>
          <div class="pure-control-group">
            <label for="aligned-overall">理科</label>
            <input type="text" id="aligned-science" v-model="science" placeholder="理科" />
          </div>
          <div class="pure-controls">
            <button type="button" v-on:click="putScore" class="pure-button pure-button-primary">登録する</button>
          </div>
        </fieldset>
      </form>
    </div>
    </div>
</template>
<script>
import axios from "axios";
import appConfig from "../config";
import auth from "../auth";

const API_BASE_URL = appConfig.ApiBaseUrl;

export default {
  data: function () {
    return {
      userid: "",
      startdate: "",
      title: "",
      japaneselanguage: "",
      math: "",
      english: "",
      socialstudies: "",
      science: ""
    };
  },
  created: function () {
    //console.log("****** Input.vue created called");
  },
  methods: {
    putScore: function () {
      //console.log("****** Input.vue putScore called");
      var self = this;
      var auth_header = auth.get_id_token();
      var data = {
        userid: this.userid,
        startdate: this.startdate,
        title: this.title,
        japaneselanguage: this.japaneselanguage,
        math: this.math,
        english: this.english,
        socialstudies: this.socialstudies,
        science: this.science
      };
      axios
        .post(API_BASE_URL , data, {
          headers: { Authorization: auth_header },
          // 'Content-Type': 'application/json' }
        })
        .then(function (res) {
          console.log(res.status);
          alert("スコアを登録しました");
          self.$router.replace("/");
        })
        .catch((err) => {
          console.log("**** axios post error ****");
          console.log(err);
        });
    },
  },
};
</script>
<style>
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
.photo-detail img {
  max-width: 100%;
  min-height: 250px;
  height: auto;
}
.photo img {
  max-width: 100%;
  min-height: 250px;
  height: auto;
}
a {
  letter-spacing: 0em;
}
</style>