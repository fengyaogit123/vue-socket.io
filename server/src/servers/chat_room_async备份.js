import User from '../model/user.js';
import Id from '../model/id.js';
import Following from '../model/following.js';
import Follow from '../model/follow.js';
import Friend from '../model/friend.js';
import Star from '../model/star.js';
import Comment from '../model/comment.js';

function passportFunc (password) {
    return md5('circle' + formatDate.formatDate(new Date()) + password);
}
export const loginFunc = async (socket, obj) => {
    try {
        let username = obj.username;
        let password = obj.password;
        let result = await User.findOne({username});
        if (result) {
            if (result.password === password) {
                console.log('其实我们是匹配的');
                socket.emit('login', {
                    code: 200, 
                    message: '登录成功', 
                    data: {userId: result.id, username, avatar}
                });
            } else {
                socket.emit('login', {
                    code: 300, 
                    message: '用户名或密码输入错误', 
                    data: {}
                });
            }
        } else {
            let passport = passportFunc(password);
            let obj = await Id.findOne({type: 'userId'});
            if (obj) await Id.update({_id: obj._id}, {value: obj.value + 1}, {multi: false}, () => {});
            else await Id.create({type: 'userId'});
            obj = await Id.findOne({type: 'userId'});
            let userId = obj.value + 1;
            // 创建 user 表
            await User.create({
                id: userId,
                username,
                password,
                passport
            }, (err, docs) => {
                if (err) console.log('create user 出错了', err);
            });
        
            // 同步创建 following 表
            await Following.create({
                id: userId,
                userId
            }, (err, docs) => {
                if (err) console.log('create following 出错了', err);
            });
            // 同步创建 follow 表
            await Follow.create({
                id: userId,
                userId
            }, (err, docs) => {
                if (err) console.log('create follow 出错了', err);
            });
            // 同步创建 friend 表
            await Friend.create({
                id: userId,
                userId
            }, (err, docs) => {
                if (err) console.log('create friend 出错了', err);
            });
            // 同步创建 star 表
            await Star.create({
                id: userId,
                userId
            }, (err, docs) => {
                if (err) console.log('create star 出错了', err);
            });
            // 同步创建 comment 表
            await Comment.create({
                id: userId,
                userId
            }, (err, docs) => {
                if (err) console.log('create comment 出错了', err);
            });
        
            let result = await User.findOne({id: userId});
        
            socket.emit('login', {
                code: 200, 
                message: '已自动为您注册账号', 
                data: {userId: result.id, username, avatar}
            });
        }
    } catch (err) {
        socket.emit('login', {
            code: 300, 
            message: '未知错误', 
            data: err
        });
    }
};