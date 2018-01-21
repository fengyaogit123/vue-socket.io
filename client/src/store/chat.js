
export default {
  namespaced: true,
  state: {
  },
  mutations: {
    itemChangeEvent (state, key) {
      state.itemIndex = key;
    },
    deleteItemEvent (state, key) {
      delete state.userList[key];
    }
  },
  actions: {

  }
};
