import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login.vue';
import box from '@/views/box.vue';
import chat from '@/views/chat.vue';
import friend from '@/views/friend.vue';
import file from '@/views/file.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: box,
      redirect: '/chat',
      children: [
        {path: '/chat', component: chat},
        {path: '/friend', component: friend},
        {path: '/file', component: file}
      ]
    }
  ]
});
