<template>
  <div id="app" ref="app">
    <message ref="message"></message>
    <router-view></router-view>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { createNamespacedHelpers } from 'vuex';
import message from './components/message.vue';
const { mapMutations } = createNamespacedHelpers('box');
export default {
  components: {
    message
  },
  data () {
    return {
      message: {
        type: 'error',
        text: '谁点了福建省的来访接sgdsgdfgfdgsdfgdfgdfgsdfgsf待室'
      }
    };
  },
  created () {
    if (Cookies.get('userId') && Cookies.get('username') && Cookies.get('passport')) {
      window.loginStatus = true;
    } else {
      this.clearUserInfo();
      this.$router.replace({path: '/login'});
    }
  },
  mounted () {
    // Vue.prototype.$message = this.$refs.message.open;
    this.$store.commit('box/initMessage', this.$refs.message.open);
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
