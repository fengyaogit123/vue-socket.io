import {list} from './user.json';

export default {
  namespaced: true,
  state: {
    userListResize: 200,
    userList: list,
    itemIndex: 100 // -2 ：默认没有选中的情况， -1 ：群组聊天室，   0-9 ：正常
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
    getDataEvent ({ commit, state }) {

    }
  }
};
