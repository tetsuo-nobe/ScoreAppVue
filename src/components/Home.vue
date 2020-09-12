<template>
  <div class="pure-g">
    <div class="text-box pure-u-1 pure-u-md-1 pure-u-lg-1 pure-u-xl-1">
      <div class="l-box">
        <h1 class="text-box-head">Score App</h1>
        <p class="text-box-subhead">This application records practice test scores.</p>
      </div>
    </div>
    <div class="pure-u-1 form-box" id="list-score">
      <table><tr><td>
      <table class="pure-table stripe-table">
        <thead>
          <tr>
            <th>実施日</th>
            <th>模試名</th>
            <th>国語</th>
            <th>数学</th>
            <th>英語</th>
            <th>社会</th>
            <th>理科</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scores" :key="score.startdate" class="pure-table-odd">
            <td>{{score.startdate}}</td>
            <td>{{score.title}}</td>
            <td>{{score.japaneselanguage}}</td>
            <td>{{score.math}}</td>
            <td>{{score.english}}</td>
            <td>{{score.socialstudies}}</td>
            <td>{{score.science}}</td>
          </tr>
        </tbody>
      </table>
      </td>
      <td>
       <table class="pure-table stripe-table">
        <thead>
          <tr>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scores" :key="score.startdate" @click="selectRow(score.startdate)" class="pure-table-odd">
             <td><img src="/static/trush2.ico" width="28" height="17" alt="削除" /></td>
          </tr>
        </tbody>
      </table>
      </td>
      </tr>
      </table>
      <button v-on:click="reloadView" class="pure-button pure-button-primary">再表示</button>
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
      scores: null,
    };
  },

  //初期化（ページのロード時）処理
  created: function () {
    this.listScore();
  },

  methods: {
    //CSAT情報の一覧取得APIにアクセスして結果をセットする
    listScore: function () {
      var self = this;
      var auth_header = auth.get_id_token();

      // axios.get(API_BASE_URL + "/csat?userid=tnobe").then(function (res) {
      axios
        // .get("https://jsonplaceholder.typicode.com/todos?userId=1")
        .get(API_BASE_URL , {
          headers: { Authorization: auth_header },
        })
        .then(function (res) {
          self.$data.scores = JSON.parse(res.data.body);
          //console.log("***************************");
          //console.log(self.$data.csats);
        });
    },

    selectRow: function (startdate) {
      var result = confirm("実施日:" +startdate + "のスコアを削除します。\nよろしいですか？");
      if (result) {
        console.log("Delete confirmed");
        this.deleteScore(startdate);
        //alert("削除完了しました。");
        //this.reloadView();
      }
      else {
        console.log("Delete Canceled");
      }
    },

    //CSAT情報のDeleteAPIで削除する
    deleteScore: function (startdate) {
      var self = this;
      var auth_header = auth.get_id_token();
      console.log("deleteScore START ---");
      axios
        .delete(API_BASE_URL + "/" + startdate, {
          headers: { Authorization: auth_header },
        })
        .then(function (res) {
          console.log("Delete Completed");
          self.reloadView();
        })
        .catch(error => {
            console.log(`Error! HTTP Status:` + error);
        });
        
    },

    reloadView: function () {
      //リロード
      this.$router.go(this.$router.currentRoute);
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
.stripe-table tr:nth-child(even) td,
.stripe-table tr:nth-child(even) th {
  background-color: white;
}
td {
  text-align: right;
}
</style>
