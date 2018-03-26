// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import store from './store/index.js';

import check from './lib/check.js';

Vue.config.productionTip = false;
let status = check({
  'Safari': 7,
  'Chrome': 65,
  'IE': 10,
  'Edge': 12,
  'Firefox': 50
});
console.log(status);
if (status) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });
}
