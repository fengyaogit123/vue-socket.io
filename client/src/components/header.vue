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
        <div class="item"><img :src="staticImg.menu" /></div>
        <div class="item"><img :src="staticImg.small" /></div>
        <div class="item"><img :src="staticImg.big" /></div>
        <div class="item close"><img :src="staticImg.close" /></div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import {friend_img, file_img, chat_img} from '../images/header_img.json';
import {big_img, close_img, menu_img, small_img, logo_img} from '../images/login_img.json';
import { mapState } from 'vuex';
export default {
  props: ['move'],
  data () {
    return {
      staticImg: {
        big: big_img,
        close: close_img,
        menu: menu_img,
        small: small_img,
        logo_img: logo_img
      },
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
          src: chat_img,
          index: 0
        },
        {
          class: 'friend',
          src: friend_img,
          index: 1
        },
        {
          class: 'file',
          src: file_img,
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
        background: #3448a1 url(data:image/png;base64,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) no-repeat 0 center;
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
