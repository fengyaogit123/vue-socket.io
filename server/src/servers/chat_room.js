
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
import config from '../config/index.js';
import chatRobot from './chat_robot.js';
import {loginFunc, loginAndgetUserInfoFunc} from './chat_room_async.js';

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
    //监听新上线用户
    socket.on('online', function (obj) {
      
    });

    //监听用户退出
    socket.on('disconnect', function () { // {userId: 1004}
      
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) { // {fromId, toId, message}
      
    });

  });

  http.listen(config.chat_room_port, function () {
    console.log('聊天工具启动: ' + config.chat_room_port);
  });
};
