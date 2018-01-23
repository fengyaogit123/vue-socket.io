import User from '../model/user.js';
import config from '../config/index.js';
import chatRobot from './chat_robot.js';


/*
socketMap = {
    socket: socket,
    user: {},
    message: {}
}     
*/
let socketMap = {};

export const loginFunc = async (socket, obj) => {
    let username = obj.username;
    let password = obj.password;
    try {
        let result = await User.findOne({username});
        if (result) {
            if (result.password === password) {
                let send = {
                    code: 200, 
                    message: '登录成功', 
                    data: {userId: result.id, username: result.username, passport: result.passport, avatar: result.avatar}
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
    } catch (err) {
        socket.emit('login', {
            code: 300, 
            message: '啊哦，出错喽，请重试', 
            data: err
        });
    }
};



/*
code 
    200: success
    300: error 
    301: 身份信息验证已过期，请重新登陆，需跳转登录页
*/
export const loginAndgetUserInfoFunc = async (socket, obj) => {
    let userId = obj.userId;
    let passport = obj.passport;
    try {
        let result = await User.findOne({id: userId});
        if (result) {
            if (result.passport === passport) {
                let send = {
                    code: 200, 
                    message: '自动登录成功', 
                    data: {userId: result.id, username: result.username, passport: result.passport, avatar: result.avatar}
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
    } catch (err) {
        socket.emit('auto-login', {
            code: 300, 
            message: '啊哦，出错喽，请重试', 
            data: err
        });
    }
};



/*

*/
export const messageFunc = async (socket, obj) => {
    let fromId = obj.fromId;
    let toId = obj.toId;
    let message = obj.message;
    let messageId = obj.messageId;
    try {
        if (socketMap[toId]) {
            console.log('这条消息是 ' + fromId + ' 发送给 ' + toId + ' 的');
            socketMap[toId].socket.emit('message', {
                code: 200,
                message: '发送消息成功',
                data: {
                    fromId: toId,
                    toId: fromId,
                    message,
                    type: 2
                }
            });
            socket.emit('message-success', {
                code: 200,
                message: '发送成功',
                messageId,
                data: {}
            });
        } else if (toId - 0 === config.robot_id) {
            chatRobot(message, (result) => {
                socket.emit('message', {
                    code: 200,
                    message: '发送消息成功',
                    data: {
                        fromId,
                        toId,
                        message: result.content,
                        type: 2
                    }
                });
            });
        } else if (toId - 0 === config.group_id) {
            console.log('我是群组消息', fromId, toId);
            socket.broadcast.emit('message', {
                code: 200,
                message: '发送消息成功',
                data: {
                    fromId,
                    toId,
                    message,
                    type: 2
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
};



/*

*/
export const disconnectFunc = async (socket) => {
    for (var k in socketMap) {
        if (socketMap[k].socket === socket) {
            console.log(socketMap[k].user.username + ' 退出');
            socket.broadcast.emit('logout', {
                username: socketMap[k].user.username,
                userId: socketMap[k].user.id
            });
        }
    }
};



/*

*/
export const userListFunc = async (socket) => {
    let result = {};
    for (let key in socketMap) {
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
};
