import check from './lib/check.js';

let status = check({
  'Safari': 9,
  'Chrome': 50,
  'IE': 10,
  'Edge': 12,
  'Firefox': 35,
  'Opera': 25
});

if (status) {
    var app = require('./main.js');
    // console.log(app)
    app.default();
} else {}