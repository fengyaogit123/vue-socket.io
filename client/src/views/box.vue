<template>
  <div class="chat-box" :style="`transform: translate3d(${transformX}px, ${transformY}px, 0);`">
    <ai-header :move="moveEvent"></ai-header>
    <keep-alive>
      <router-view class="main-box"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import header from '../components/header.vue';
export default {
  components: {
    'ai-header': header
  },
  data () {
    return {
      transformX: 0,
      transformY: 0
    };
  },
  created () {
    let me = this;
    if (window.loginStatus) {
      this.$store.dispatch('box/autoLogin', {
        userId: Cookies.get('userId'),
        passport: Cookies.get('passport'),
        cbb (obj) {
          if (obj.code === 301) {
            me.$router.replace('/login');
          }
        }
      });
    }
  },
  methods: {
    moveEvent (x, y) {
      this.transformX = x;
      this.transformY = y;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@blue: rgb(22,144,237);
  .chat-box {
    width: 65%;
    height: 80%;
    background: #fff;
    min-width: 700px;
    display: flex;
    flex-flow: column;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
    border-radius: 3px;
    overflow: hidden;
    .main-box {
      flex: 1;
    }
  }
</style>
