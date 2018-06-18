import Vuex from "vuex";
import api from "../lib/api";
import log from "loglevel";
import Vue from "vue";
import _ from "lodash";
import types from "./apiTypes";

Vue.use(Vuex);

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

const actions = {};

// api の state, mutation, action をまとめて登録
_.each(types, type => {
  state[type] = {};
  mutations[type] = function(state, payload) {
    state[type] = { ...state[type], ...payload };
    return state;
  };

  actions[type] = function({ commit }) {
    commit("loading", true);
    api[type]()
      .then(res => {
        commit("loading", false);
        commit(type, res);
      })
      .catch(error => {
        log.error(error);
        commit("loading", false);
        commit("error", "通信に失敗しました");
      });
  };
});

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions
});

export default store;
