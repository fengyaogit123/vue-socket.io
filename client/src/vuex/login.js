import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    userInfo: {
      userId: '',
      passport: '',
      username: ''
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo.userId = obj.userId;
      state.userInfo.passport = obj.passport;
      state.userInfo.username = obj.username;
    }
  },
  actions: {
    getDataEvent ({ commit, state }) {
    }
  }
});
