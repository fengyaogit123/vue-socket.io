
import mongoose from 'mongoose';

function dbconnect () {
  mongoose.connect('mongodb://192.168.31.42/tourism', {useMongoClient: true});
  console.log('数据库连接成功!');
  return mongoose.connection;
}

export default dbconnect;
