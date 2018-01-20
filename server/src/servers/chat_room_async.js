import User from '../model/user.js';

let socketMap = {};

export const loginFunc = async (socket, obj) => {
    let username = obj.username;
    let password = obj.password;
    try {
        let result = await User.findOne({username});
        if (result) {
            if (result.password === password) {
                socket.emit('login', {
                    code: 200, 
                    message: '登录成功', 
                    data: {userId: result.id, username: result.username, passport: result.passport, avatar: result.avatar}
                });
                socketMap[result.id] = {
                    socket: socket,
                    user: result,
                    message: {}
                };
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
                socket.emit('auto-login', {
                    code: 200, 
                    message: '自动登录成功', 
                    data: {userId: result.id, username: result.username, passport: result.passport, avatar: result.avatar}
                });
                socketMap[result.id] = {
                    socket: socket,
                    user: result,
                    message: {}
                };
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

