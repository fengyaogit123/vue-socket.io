<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { createNamespacedHelpers } from 'vuex';
const { mapMutations } = createNamespacedHelpers('box');
export default {
  created () {
    if (Cookies.get('userId') && Cookies.get('username') && Cookies.get('passport')) {
      // this.$router.replace({path: '/chat'});
      // console.log(this.$route);
      window.loginStatus = true;
    } else {
      this.clearUserInfo();
      this.$router.replace({path: '/login'});
    }
  },
  methods: {
    ...mapMutations(['clearUserInfo'])
  }
};
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    #app {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
