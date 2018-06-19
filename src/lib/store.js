import Vuex from "vuex";
import api from "../lib/api";
import log from "loglevel";
import Vue from "vue";
import _ from "lodash";
import types from "./apiTypes";

Vue.use(Vuex);

//apiの処理とそれ以外にデータ連携が必要なものだけ vuex を使うこと。

// state の初期値
const state = {
  isLoading: false,
  error: ""
};

const mutations = {
  loading(state, payload) {
    state.isLoading = payload;
  },
  error(state, payload) {
    state.error = payload;
  }
};

// getters データを関数などでフィルタリングするときのみ使いしょう。
const getters = {
  getTestById: state => id => {
    return state[types.TEST].find(item => item.id === id);
  }
};

const actions = {};

// api の state, mutation, action をまとめて登録
_.each(types, type => {
  state[type] = {};

  mutations[type] = function(state, payload) {
    // state の下にタイプ名をキーにしてAPIモジュールから取得したデータを格納
    state[type] = { ...state[type], ...payload };
    return state;
  };

  //Promise.all などが使えるように Promise を戻り値とする
  actions[type] = function({ commit }) {
    return new Promise((resolve, reject) => {
      commit("loading", true);
      api[type]()
        .then(res => {
          commit("loading", false);
          commit(type, res);
          resolve();
        })
        .catch(error => {
          //エラーパターン サーバからメッセージがあれば表示。
          commit("loading", false);
          commit("error", error.message || "通信に失敗しました");
          log.error(error);
          reject(error);
          throw error;
        });
    });
  };
});

const store = new Vuex.Store({
  // 厳格モード エラーが厳しくします。プロダクションの時は外すこと
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters
});

export default store;
