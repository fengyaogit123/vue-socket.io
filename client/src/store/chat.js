import {list} from './user.json';

export default {
  namespaced: true,
  state: {
    userListResize: 200
  },
  mutations: {
    itemChangeEvent (state, key) {
      state.itemIndex = key;
    },
    deleteItemEvent (state, key) {
      delete state.userList[key];
    },
    changeUserListResize (state, num) {
      state.userListResize = num;
    }
  },
  actions: {

  }
};
