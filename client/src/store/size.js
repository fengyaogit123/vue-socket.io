export default {
  namespaced: true,
  state: {
    userListResize: 200,
    screenSize: {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    },
    chatBoxTransform: {
      left: 0,
      top: 0
    }
  },
  getters: {
    chatBoxRealSize (state) {
      return {
        left: state.screenSize.left + state.chatBoxTransform.left,
        top: state.screenSize.top + state.chatBoxTransform.top
      };
    }
  },
  mutations: {
    screenSizeChange (state, obj) {
      state.screenSize = obj;
    },
    transformChange (state, {x, y}) {
      state.chatBoxTransform.left = x;
      state.chatBoxTransform.top = y;
    }
  }
};
