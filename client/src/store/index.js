import Vuex from 'vuex';
import Vue from 'vue';
import box from './box.js';
import login from './login.js';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    getDataEvent ({ commit, state }) {
    }
  },
  modules: {
    box,
    login
  }
});
