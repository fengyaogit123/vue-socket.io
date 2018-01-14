
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
      state.userInfo.userId = obj.userId;
      state.userInfo.passport = obj.passport;
      state.userInfo.username = obj.username;
    }
  },
  actions: {
    getDataEvent ({ commit, state }) {
    }
  }
};
