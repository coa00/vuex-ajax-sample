<template>
  <div class="hello">

    <button v-on:click="test">test</button>
    <p v-show="isLoading">読み込み中</p>
    <ul id="example-1">
      <li v-for="(value, key) in getItem">
        <div v-bind:id="key">
          {{ value.id }}
        </div>

      </li>
    </ul>
    <button v-on:click="fail">FAIL</button>
    <p v-show="isLoading">読み込み中</p>
    <p v-show="getError">{{ getError }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import log from "loglevel";
const TEST = "test";
const FAIL = "fail";

export default {
  name: "HelloWorld",
  methods: {
    ...mapActions([TEST, FAIL])
  },
  computed: {
    getError() {
      return this.$store.state.error;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    getItem() {
      return this.$store.state[TEST];
    }
  },
  props: {
    msg: String
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
