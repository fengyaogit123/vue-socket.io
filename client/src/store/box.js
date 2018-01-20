import io from 'socket.io-client';
import {socket_url} from '../config/index.js';
import md5 from '../lib/md5.js';
import Cookies from 'js-cookie';
import chat from './chat.js';
import {list} from './user.json';

export default {
  namespaced: true,
  state: {
    userListResize: 200,
    itemIndex: 10, // -2 ：默认没有选中的情况， -1 ：群组聊天室，   0-9 ：正常
    userInfo: {
      userId: '',
      passport: '',
      username: '',
      avatar: ''
    },
    httpServer: null,
    connect: false,
    userList: list,
    loginStatus: false,
    error_tip: ''
  },
  mutations: {
    error_tip_change (state, text) {
      state.error_tip = text;
    },
    changeUserListResize (state, num) {
      state.userListResize = num;
    },
    loginStatusChange (state, status) {
      state.loginStatus = status;
      window.loginStatus = status;
    },
    saveUserInfo (state, obj) {
      Cookies.set('username', obj.username, { expires: 1 });
      Cookies.set('userId', obj.userId, { expires: 1 });
      Cookies.set('passport', obj.passport, { expires: 1 });
      state.userInfo = {
        userId: obj.userId,
        avatar: obj.avatar,
        username: obj.username,
        passport: obj.passport
      };
    },
    clearUserInfo (state) {
      Cookies.remove('userId');
      Cookies.remove('username');
      Cookies.remove('passport');
      window.loginStatus = false;
      state.loginStatus = false;
      state.userInfo = {
        userId: '',
        avatar: '',
        username: '',
        passport: ''
      };
    }
  },
  actions: {
    login ({commit, state}, {username, password, cbb}) {
      commit('error_tip_change', '');
      state.httpServer = io.connect(socket_url);
      state.httpServer.emit('login', {
        username,
        password: md5(password)
      });
      state.httpServer.on('login', (obj) => { // {userId}
        if (obj.code === 200) {
          commit('saveUserInfo', obj.data);
          commit('loginStatusChange', true);
          commit('box/chat/setServer', {server: state.httpServer, connect: true}, {root: true});
        } else if (obj.code === 300) {
          commit('error_tip_change', obj.message);
        } else {
          console.log('这里出错了，请检查');
        }
        if (cbb) cbb(obj);
      });
      state.httpServer.on('logout', obj => { // {userId: 1004}

      });
      state.httpServer.on('message', obj => { // {fromId, toId, type, message}

      });
    },
    autoLogin ({commit, state}, {userId, passport, cbb}) {
      commit('error_tip_change', '');
      state.httpServer = io.connect(socket_url);
      state.httpServer.emit('auto-login', {
        userId,
        passport
      });

      state.httpServer.on('auto-login', (obj) => { // {userId}
        if (cbb) cbb(obj);
      });
      state.httpServer.on('logout', obj => { // {userId: 1004}

      });
      state.httpServer.on('message', obj => { // {fromId, toId, type, message}

      });
    }
  },
  modules: {
    chat
  }
};
