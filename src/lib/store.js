import Vuex from "vuex";
import api from "../lib/api";
import log from "loglevel";
import Vue from "vue";

const TEST = "test";
const FAIL = "fail";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    count: 0,
    isLoading: false,
    error: "",
    [TEST]: {},
    [FAIL]: {}
  },
  mutations: {
    [TEST](state, payload) {
      state[TEST] = { ...state[TEST], ...payload };
      return state;
    },
    [FAIL](state, payload) {
      state[FAIL] = { ...state[FAIL], ...payload };
      return state;
    },
    loading(state, payload) {
      state.isLoading = payload;
    },
    error(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    [TEST]({ commit }) {
      commit("loading", true);
      api[TEST]()
        .then(res => {
          commit("loading", false);
          commit(TEST, res);
        })
        .catch(error => {
          log.error(error);
          commit("loading", false);
          commit("error", "通信に失敗しました");
        });
    },
    [FAIL]({ commit }) {
      commit("loading", true);
      api[FAIL]()
        .then(res => {
          commit("loading", false);
          commit(FAIL, res);
        })
        .catch(error => {
          log.error(error);
          commit("loading", false);
          commit("error", "通信に失敗しました");
        });
    },
    increment({ commit }) {
      commit("increment");
    }
  }
});

export default store;
