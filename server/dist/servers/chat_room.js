'use strict';

var _index = require('../config/index.js');

var _index2 = _interopRequireDefault(_index);

var _chat_robot = require('./chat_robot.js');

var _chat_robot2 = _interopRequireDefault(_chat_robot);

var _chat_room_async = require('./chat_room_async.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var errObj = {
  result: 0,
  content: '没有理解你的意思，你能说的简单一点吗？'
};

module.exports = function () {
  io.on('connection', function (socket) {

    // 登录
    socket.on('login', function (obj) {
      (0, _chat_room_async.loginFunc)(socket, obj);
    });
    // 自动登录并获取用户信息
    socket.on('auto-login', function (obj) {
      (0, _chat_room_async.loginAndgetUserInfoFunc)(socket, obj);
    });
    // 获取在线用户列表
    socket.on('user-list', function () {
      (0, _chat_room_async.userListFunc)(socket);
    });
    //监听新上线用户
    socket.on('online', function (obj) {});

    //监听用户退出
    socket.on('disconnect', function (e) {
      // {userId: 1004}
      // console.log('有用户推出了：', e);
      (0, _chat_room_async.disconnectFunc)(socket);
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) {
      // {fromId, toId, message}
      (0, _chat_room_async.messageFunc)(socket, obj);
    });
  });

  http.listen(_index2.default.chat_room_port, function () {
    console.log('聊天工具启动: ' + _index2.default.chat_room_port);
  });
};
//# sourceMappingURL=chat_room.js.map