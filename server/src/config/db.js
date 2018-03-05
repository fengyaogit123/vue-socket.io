
import mongoose from 'mongoose';

function dbconnect () {
  mongoose.connect('mongodb://127.0.0.1:27017/tourism', {useMongoClient: true});
  var db = mongoose.connection;
  db.on('error', () => {
    console.log('数据库连接出错。');
  });
  db.once('open', () => {
    console.log('数据库连接成功。');
  });
  db.on('close', () => {
    console.log('数据库断开，重新连接数据库');
  });
}

export default dbconnect;
