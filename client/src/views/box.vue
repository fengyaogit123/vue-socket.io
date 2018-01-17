<template>
  <div class="chat-box" :style="`transform: translate3d(${transformX}px, ${transformY}px, 0);`">
    <ai-header :move="moveEvent"></ai-header>
    <router-view class="main-box"></router-view>
  </div>
</template>

<script>
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
