import io from 'socket.io-client';
import Vue from 'vue';
import {socketUrl, groupId, robotId} from '../config/index.js';
import md5 from '../lib/md5.js';
import Cookies from 'js-cookie';
import chat from './chat.js';
// import {list} from './user.json';

export default {
  namespaced: true,
  state: {
    scrollFunc: null, // 滚动条置底方法
    userListResize: 200,
    itemIndex: robotId, // -2 ：默认没有选中的情况， -1 ：群组聊天室，   0-9 ：正常
    userInfo: {
      userId: '',
      passport: '',
      username: '',
      avatar: ''
    },
    template: {
      userInfo: {
        username: '',
        avatar: '',
        userId: 0
      },
      noReadNum: 0,
      status: false, // true 时变灰色
      list: []
    },
    messageId: 0,
    httpServer: null,
    connect: false,
    userList: {
      [robotId]: {
        userInfo: {
          username: '机器人',
          avatar: 'https://raw.githubusercontent.com/beautifulBoys/vue-socket.io/master/client/src/images/user/robot.png',
          userId: robotId
        },
        noReadNum: 0,
        list: [{
          type: 2,
          message: '你好，我是机器人 “菲菲”，你想和我聊什么呀？(*╹▽╹*)'
        }]
      },
      [groupId]: {
        userInfo: {
          username: '全站聊天室',
          avatar: 'https://raw.githubusercontent.com/beautifulBoys/vue-socket.io/master/client/src/images/user/group.png',
          userId: groupId
        },
        noReadNum: 0,
        list: []
      }
    },
    loginStatus: false,
    error_tip: ''
  },
  mutations: {
    saveScrollFunc (state, fn) {
      state.scrollFunc = fn;
    },
    error_tip_change (state, text) {
      state.error_tip = text;
    },
    changeUserListResize (state, num) {
      state.userListResize = num;
    },
    itemChangeEvent (state, n) {
      state.itemIndex = n;
      state.userList[state.itemIndex].noReadNum = 0;
    },
    deleteLogoutItem (state, obj) {
      state.userList[obj.userId].status = true;
    },
    addUserItem (state, obj) {
      if (state.userList[obj.userId]) {
        state.userList[obj.userId].status = false;
      } else {
        state.template = {
          userInfo: {
            username: obj.username,
            avatar: obj.avatar,
            userId: obj.userId
          },
          noReadNum: 0,
          status: false,
          list: []
        };
        Vue.set(state.userList, obj.userId, state.template);
      }
    },
    receiveMessage (state, obj) {
      if (obj.messageType === 'group') {
        state.userList[groupId].list.push({
          type: 2,
          message: obj.message,
          user: obj.user
        });
        if (state.itemIndex - 0 !== groupId - 0) state.userList[groupId].noReadNum++;
      } else {
        state.userList[obj.toId].list.push({
          type: 2,
          message: obj.message
        });
        if (state.itemIndex - 0 !== obj.toId - 0) state.userList[obj.toId].noReadNum++;
      }
    },
    messageIdChange (state) {
      state.messageId += 1;
    },
    userListChange (state, obj) {
      for (let k in obj) {
        if ((obj[k].userId - 0 !== state.userInfo.userId - 0) && !state.userList[k]) {
          state.template = {
            userInfo: {
              username: obj[k].username,
              avatar: obj[k].avatar,
              userId: obj[k].userId
            },
            noReadNum: 0,
            status: false,
            list: []
          };
          Vue.set(state.userList, k, state.template);
        }
      }
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
    login ({commit, dispatch, state}, {username, password, cbb}) {
      commit('error_tip_change', '');
      state.httpServer = io.connect(socketUrl);
      state.httpServer.emit('login', {
        username,
        password: md5(password)
      });
      state.httpServer.on('login', (obj) => { // {userId}
        if (obj.code === 200) {
          commit('saveUserInfo', obj.data);
          state.connect = true;
          dispatch('httpServerInit');
        } else if (obj.code === 300) {
          commit('error_tip_change', obj.message);
        } else {
          console.log('这里出错了，请检查');
        }
        if (cbb) cbb(obj);
      });
    },
    autoLogin ({commit, dispatch, state}, {userId, passport, cbb}) {
      commit('error_tip_change', '');
      state.httpServer = io.connect(socketUrl);
      state.httpServer.emit('auto-login', {
        userId,
        passport
      });

      state.httpServer.on('auto-login', (obj) => { // {userId}
        if (obj.code === 200) {
          commit('saveUserInfo', obj.data);
          dispatch('httpServerInit');
        } else if (obj.code === 300) {
          console.log('这里采用上方弹出提示条的方式提醒用户出错喽。');
        } else if (obj.code === 301) {
          commit('clearUserInfo');
          console.log('这里采用上方弹出提示条的方式提醒用户身份信息已过期，重新登录。');
        } else {
          console.log('这里出错了，请检查下');
        }
        if (cbb) cbb(obj);
      });
    },
    httpServerInit ({commit, state}) {
      // state.httpServer.on('');
      state.httpServer.emit('user-list');
      state.httpServer.on('user-list', obj => {
        if (obj.code === 200) {
          commit('userListChange', obj.data);
        } else {
          console.log('这里确认下，不完善');
        }
      });
      state.httpServer.on('online', obj => { // {userId: 1004}
        // console.log(obj.username + '退出');
        commit('addUserItem', obj.data);
      });
      state.httpServer.on('logout', obj => { // {userId: 1004}
        console.log(obj.username + '退出');
        commit('deleteLogoutItem', obj);
      });
      state.httpServer.on('message', obj => { // {fromId, toId, type, message}
        if (obj.code === 200) {
          commit('receiveMessage', obj.data);
          state.scrollFunc();
        } else {
          console.log(obj);
        }
      });
    },
    sendMessage ({state, commit}, {message}) {
      let messageId = `${state.messageId}_${md5(message)}`;
      commit('messageIdChange'); // 保证本客户端的消息的唯一性，后续为发送消息是否成功留。
      let messageTypeMap = { // 后续会增加匿名聊天室
        [robotId]: 'robot',
        [groupId]: 'group'
      };
      let messageType = messageTypeMap[state.itemIndex] || 'user';
      state.userList[state.itemIndex].list.push({
        fromUser: state.userInfo,
        message,
        type: 3,
        messageType
      });
      state.httpServer.emit('message', {
        fromId: state.userInfo.userId,
        toId: state.itemIndex,
        message: message,
        messageId,
        messageType
      });
    }
  },
  modules: {
    chat
  }
};
