<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {

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
