<template>
  <div class="login">
    我是登录页
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
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@blue: rgb(22,144,237);
  .login {
    width: 65%;
    height: 75%;
    background: #eee;
    min-width: 700px;
  }
</style>
