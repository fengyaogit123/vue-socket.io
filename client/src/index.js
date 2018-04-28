import checkBrowser from './lib/check.js';

let options = {
  'Safari': 9,
  'Chrome': 50,
  'IE': 10,
  'Edge': 12,
  'Firefox': 35,
  'Opera': 25
};

let status = checkBrowser(options);

if (status) {
  require('./main.js').default();
}

// promise 写法 待完善
// checkBrowser(options).then(() => {
//   app();
//   console.log('恭喜您，您的浏览器版本符合本站访问需求！');
// }).catch(fn => {
//   fn();
//   console.log('很遗憾，您的浏览器版本太低，请升级后访问本站！');
// });
// import check from './lib/check.js';
//
// let status = check({
//   'Safari': 9,
//   'Chrome': 50,
//   'IE': 10,
//   'Edge': 12,
//   'Firefox': 35,
//   'Opera': 25
// });
//
// if (status) {
//     var app = require('./main.js');
//     // console.log(app)
//     app.default();
// } else {}
