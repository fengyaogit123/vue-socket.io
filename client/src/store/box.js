import chat from './chat.js';

export default {
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
    }
  },
  actions: {
    getDataEvent ({ commit, state }) {
    }
  },
  modules: {
    chat
  }
};
