<template>
<div class="header">
  <div class="bg">
    <div class="left"></div>
    <div class="right"></div>
  </div>
  <div class="box" ref="bg">
    <div class="left">
      <img class="user" :src="userInfo.avatar" />
    </div>
    <div class="center">
      <div class="item" v-for="item in tabList" @click="tabEvent(item)" :class="{active: item.index === tabIndex}">
        <img :class="item.class" :src="item.src" />
      </div>
    </div>
    <div class="right">
      <div class="icon">
        <div class="item"><img src="../images/login/menu.png" /></div>
        <div class="item"><img src="../images/login/small.png" /></div>
        <div class="item"><img src="../images/login/big.png" /></div>
        <div class="item close"><img src="../images/login/close.png" /></div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  props: ['move'],
  data () {
    return {
      transformX: 0,
      transformY: 0,
      positionX: 0,
      positionY: 0,
      startX: 0,
      startY: 0,
      status: false,
      tabList: [
        {
          class: 'chat',
          src: 'https://raw.githubusercontent.com/beautifulBoys/vue-socket.io/master/client/src/images/chat.png',
          index: 0
        },
        {
          class: 'friend',
          src: 'https://raw.githubusercontent.com/beautifulBoys/vue-socket.io/master/client/src/images/friend.png',
          index: 1
        },
        {
          class: 'file',
          src: 'https://raw.githubusercontent.com/beautifulBoys/vue-socket.io/master/client/src/images/file.png',
          index: 2
        }
      ],
      tabIndex: 0
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.box.userInfo
    })
  },
  created () {
    console.log(this.$route.path);
    this.tabList.map(item => {
      if ('/' + item.class === this.$route.path) this.tabIndex = item.index;
    });
  },
  mounted () {
    this.$refs.bg.onmousedown = (e) => {
      this.status = true;
      this.positionX = e.clientX - this.transformX; // 相对于login的postion位置
      this.positionY = e.clientY - this.transformY;
      this.startX = e.clientX;
      this.startY = e.clientY;
    };
    document.onmousemove = (e) => {
      if (!this.status) return;
      this.transformX = e.clientX - this.positionX;
      this.transformY = e.clientY - this.positionY;
      this.move(this.transformX, this.transformY);
    };
    document.onmouseup = (e) => {
      this.status = false;
    };
  },
  methods: {
    tabEvent (item) {
      this.tabIndex = item.index;
      this.$router.replace('/' + item.class);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@blue: rgb(22,144,237);
.header {
    width: 100%;
    height: 56px;
    position: relative;
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      .left {
        width: 65%;
        background: #0086f1;
      }
      .right {
        flex: 1;
        background: #3448a1 url(../images/header_bg.png) no-repeat 0 center;
        background-size: auto 56px;
      }
    }
    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0 5px;
      box-sizing: border-box;
      display: flex;
      .left {
          flex: 1;
          padding: 6px;
          box-sizing: border-box;
          .user {
              height: 100%;
              background: @blue;
              padding: 2px;
              box-sizing: border-box;
              border-radius: 100%;
              &:hover {
                  background: rgba(255,255,255,0.8);
              }
          }
      }
      .center {
          width: 200px;
          display: flex;
          .item {
              flex: 1;
              opacity: 0.5;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                  width: 30px;
                  height: 30px;
              }
              &.active,
              &:hover {
                  opacity: 1;
                  background: url("../images/up.png") no-repeat center 100%;
                  background-size: 12px;
              }
          }
      }
      .right {
          flex: 1;
          position: relative;
          .icon {
            position: absolute;
            top: 13px;
            right: 0;
            display: flex;
            font-size: 0;
            .item {
              margin: 5px;
              border-radius: 3px;
              opacity: 0.5;
              img {
                padding: 1px;
              }
              &:hover {
                opacity: 1;
                &.close{
                  background: red;
                }
              }
            }
          }
      }
    }

}
</style>
