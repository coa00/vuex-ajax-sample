<template>
  <div class="hello">
    <button v-on:click="test">test</button>
    <p v-show="getIsLoading">読み込み中</p>
    <ul id="example-1">
      <li v-for="(value, key) in getItem">
        <div v-bind:id="key">
          {{ value.id }}
        </div>

      </li>
    </ul>
    <button v-on:click="fail">FAIL</button>
    <p v-show="getIsLoading">読み込み中</p>
    <p v-show="getError">{{ getError }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import types from "../lib/apiTypes";
// import log from "loglevel";

export default {
  name: "HelloWorld",
  //action と method をマッピング
  methods: {
    ...mapActions([types.TEST, types.FAIL])
  },
  //state を呼び出し。変更があったら反映
  //get${Type} で名称は統一
  computed: {
    getError() {
      return this.$store.state.error;
    },
    getIsLoading() {
      return this.$store.state.isLoading;
    },
    getItem() {
      return this.$store.state[types.TEST];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
