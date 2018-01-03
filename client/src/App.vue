<template>
  <div id="app">
    <chat-box></chat-box>
  </div>
</template>

<script>
import chatBox from './components/chat_box.vue';
export default {
  components: {
    'chat-box': chatBox
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
