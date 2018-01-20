import io from 'socket.io-client';
import {socket_url} from '../config/index.js';
import md5 from '../lib/md5.js';
import Cookies from 'js-cookie';
export default {
  namespaced: true,
  state: {
    httpServer: null,
    loginStatus: false,
    userInfo: {
      userId: '',
      username: '',
      avatar: '',
      passport: ''
    },
    error_tip: ''
  },
  mutations: {
  },
  actions: {
    getDataEvent ({ commit, state }) {
    }
  }
};
