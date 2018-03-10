'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userListFunc = exports.disconnectFunc = exports.messageFunc = exports.loginAndgetUserInfoFunc = exports.loginFunc = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../model/user.js');

var _user2 = _interopRequireDefault(_user);

var _index = require('../config/index.js');

var _index2 = _interopRequireDefault(_index);

var _chat_robot = require('./chat_robot.js');

var _chat_robot2 = _interopRequireDefault(_chat_robot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
socketMap = {
    socket: socket,
    user: {},
    message: {}
}     
*/
var socketMap = {};

var loginFunc = exports.loginFunc = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(socket, obj) {
        var username, password, result, send;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        username = obj.username;
                        password = obj.password;
                        _context.prev = 2;
                        _context.next = 5;
                        return _user2.default.findOne({ username: username });

                    case 5:
                        result = _context.sent;

                        console.log((0, _stringify2.default)(result));
                        if (result) {
                            if (result.password === password) {
                                send = {
                                    code: 200,
                                    message: '登录成功',
                                    data: { userId: result.id, username: result.username, passport: result.passport, avatar: result.avatar }
                                };

                                socket.emit('login', send);
                                socket.broadcast.emit('online', send);
                                socketMap[result.id] = {
                                    socket: socket,
                                    user: result,
                                    message: {}
                                };
                                console.log(result.username + ' 登录成功');
                            } else {
                                socket.emit('login', {
                                    code: 300,
                                    message: '账号或密码输入错误',
                                    data: {}
                                });
                            }
                        } else {
                            socket.emit('login', {
                                code: 300,
                                message: '账号或密码输入错误',
                                data: {}
                            });
                        }
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](2);

                        socket.emit('login', {
                            code: 300,
                            message: '啊哦，出错喽，请重试',
                            data: _context.t0
                        });

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 10]]);
    }));

    return function loginFunc(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/*
code 
    200: success
    300: error 
    301: 身份信息验证已过期，请重新登陆，需跳转登录页
*/
var loginAndgetUserInfoFunc = exports.loginAndgetUserInfoFunc = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(socket, obj) {
        var userId, passport, result, send;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        userId = obj.userId;
                        passport = obj.passport;
                        _context2.prev = 2;
                        _context2.next = 5;
                        return _user2.default.findOne({ id: userId });

                    case 5:
                        result = _context2.sent;

                        if (result) {
                            if (result.passport === passport) {
                                send = {
                                    code: 200,
                                    message: '自动登录成功',
                                    data: { userId: result.id, username: result.username, passport: result.passport, avatar: result.avatar }
                                };

                                socket.emit('auto-login', send);
                                socket.broadcast.emit('online', send);
                                socketMap[result.id] = {
                                    socket: socket,
                                    user: result,
                                    message: {}
                                };
                                console.log(result.username + ' 自动登录成功');
                            } else {
                                socket.emit('auto-login', {
                                    code: 301,
                                    message: '身份信息已过期，请重新登录',
                                    data: {}
                                });
                            }
                        } else {
                            socket.emit('auto-login', {
                                code: 301,
                                message: '账号或密码错误，请重新登录',
                                data: {}
                            });
                        }
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](2);

                        socket.emit('auto-login', {
                            code: 300,
                            message: '啊哦，出错喽，请重试',
                            data: _context2.t0
                        });

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[2, 9]]);
    }));

    return function loginAndgetUserInfoFunc(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

/*

*/
var messageFunc = exports.messageFunc = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(socket, obj) {
        var fromId, toId, message, messageId, messageType;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        fromId = obj.fromId;
                        toId = obj.toId;
                        message = obj.message;
                        messageId = obj.messageId;
                        messageType = obj.messageType;

                        try {
                            if (socketMap[toId]) {
                                console.log('这条消息是 ' + fromId + ' 发送给 ' + toId + ' 的');
                                socketMap[toId].socket.emit('message', {
                                    code: 200,
                                    message: '发送消息成功',
                                    data: {
                                        fromId: toId,
                                        toId: fromId,
                                        message: message,
                                        type: 2,
                                        messageType: messageType
                                    }
                                });
                                socket.emit('message-success', {
                                    code: 200,
                                    message: '发送成功',
                                    messageId: messageId,
                                    data: {}
                                });
                            } else if (toId - 0 === _index2.default.robot_id) {
                                (0, _chat_robot2.default)(message, function (result) {
                                    socket.emit('message', {
                                        code: 200,
                                        message: '发送消息成功',
                                        data: {
                                            fromId: fromId,
                                            toId: toId,
                                            message: result.content,
                                            type: 2,
                                            messageType: messageType
                                        }
                                    });
                                });
                            } else if (toId - 0 === _index2.default.group_id) {
                                socket.broadcast.emit('message', {
                                    code: 200,
                                    message: '发送消息成功',
                                    data: {
                                        user: {
                                            userId: socketMap[fromId].user.id,
                                            username: socketMap[fromId].user.username,
                                            avatar: socketMap[fromId].user.avatar
                                        },
                                        message: message,
                                        type: 2,
                                        messageType: messageType
                                    }
                                });
                            } else {
                                console.log('148行 出错了');
                            }
                        } catch (err) {
                            socket.emit('message', {
                                code: 300,
                                message: '啊哦，出错喽，请重试',
                                data: err
                            });
                        }

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function messageFunc(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

/*

*/
var disconnectFunc = exports.disconnectFunc = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(socket) {
        var k;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        for (k in socketMap) {
                            if (socketMap[k].socket === socket) {
                                console.log(socketMap[k].user.username + ' 退出');
                                socket.broadcast.emit('logout', {
                                    username: socketMap[k].user.username,
                                    userId: socketMap[k].user.id
                                });
                            }
                        }

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function disconnectFunc(_x7) {
        return _ref4.apply(this, arguments);
    };
}();

/*

*/
var userListFunc = exports.userListFunc = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(socket) {
        var result, key;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        result = {};

                        for (key in socketMap) {
                            result[key] = {
                                username: socketMap[key].user.username,
                                userId: socketMap[key].user.id,
                                avatar: socketMap[key].user.avatar
                            };
                        }
                        try {
                            socket.emit('user-list', {
                                code: 200,
                                message: '获取在线用户列表成功',
                                data: result
                            });
                        } catch (err) {
                            socket.emit('user-list', {
                                code: 300,
                                message: '啊哦，出错喽，请重试',
                                data: err
                            });
                        }

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function userListFunc(_x8) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=chat_room_async.js.map