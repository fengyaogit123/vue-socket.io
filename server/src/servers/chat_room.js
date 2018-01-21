
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import config from '../config/index.js';
import chatRobot from './chat_robot.js';
import {
  loginFunc, 
  loginAndgetUserInfoFunc,
  messageFunc,
  disconnectFunc,
  userListFunc
} from './chat_room_async.js';

const errObj = {
  result: 0,
  content: '没有理解你的意思，你能说的简单一点吗？'
};

module.exports = function () {
  io.on('connection', socket => {

    // 登录
    socket.on('login', function (obj) {
      loginFunc(socket, obj);
    });
    // 自动登录并获取用户信息
    socket.on('auto-login', function (obj) {
      loginAndgetUserInfoFunc(socket, obj);
    });
    // 获取在线用户列表
    socket.on('user-list', function () {
      userListFunc(socket);
    });
    //监听新上线用户
    socket.on('online', function (obj) {
      
    });

    //监听用户退出
    socket.on('disconnect', function (e) { // {userId: 1004}
      console.log('有用户推出了：', e);
      // disconnectFunc();
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) { // {fromId, toId, message}
      messageFunc(socket, obj);
    });

  });

  http.listen(config.chat_room_port, function () {
    console.log('聊天工具启动: ' + config.chat_room_port);
  });
};
