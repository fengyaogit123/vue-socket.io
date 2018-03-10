<template>
  <transition name="fade">
    <div class="message" v-if="show">
      <div class="box">
        <img class="icon" v-if="type === 'error'" src="../images/message/error.svg" />
        <img class="icon" v-if="type === 'success'" src="../images/message/success.svg" />
        <img class="icon" v-if="type === 'warn'" src="../images/message/warn.svg" />
        <span class="text">{{text}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: ['message'],
    data () {
      return {
        show: false,
        type: '',
        text: '',
        time: 3000
      };
    },
    methods: {
      open ({type, text}) {
        this.type = type;
        this.text = text;
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, this.time);
      }
    }

  };
</script>
<style lang="less" scoped>

.message {
  width: 100%;
  height: 35px;
  position: fixed;
  left: 0;
  top: 20px;
  z-index: 1000;
  display: flex;
  opacity: 1;
  margin: 0 auto;
  transition: all 0.5s;
  &.fade-enter-active, &.fade-leave-active {
    top: 20px;
    opacity: 1;
  }
  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    top: -50px;
  }
  .box {
    margin: 0 auto;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.2);
    .icon {
      width: 35px;
      height: 35px;
      display: inline-block;
    }
    .text {
      flex: 1;
      line-height: 35px;
      padding: 0 20px;
      color: #666;
      font-size: 15px;
      min-width: 200px;
    }
  }

}
</style>
