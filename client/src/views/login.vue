<template>
  <div class="login" ref="login" :style="`transform: translate3d(${transformX}px, ${transformY}px, 0);`">
    <div class="top" ref="top">
      <img :src="staticImg.logo_img" />
      <div class="top-box">
        <div class="control">
          <div class="item small"><img :src="staticImg.small" /></div>
          <div class="item close"><img :src="staticImg.close" /></div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="center">
        <input class="input username" v-model="username" placeholder="用户名" type="text" />
        <input class="input password" v-model="password" placeholder="密码" type="password" />
        <div class="error-tip">{{error_tip}}</div>
        <div class="button" @click="loginEvent()">登  录</div>
      </div>
      <div class="tip">共享旅游圈账号体系，没有账号请先去 <span class="register" @click="registerEvent()"> 注 册 </span></div>
    </div>
  </div>
</template>

<script>
import {tourismUrl} from '../config/index.js';
import {big_img, close_img, menu_img, small_img, logo_img} from '../images/login_img.json';
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  components: {
  },
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
      tourismUrl,
      status: false,
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapState({
      error_tip: state => state.box.error_tip
    })
  },
  mounted () {
    this.$refs.top.onmousedown = (e) => {
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
    };
    document.onmouseup = (e) => {
      this.status = false;
    };
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    registerEvent () {
      window.open(this.tourismUrl);
    },
    loginEvent () {
      let me = this;
      this.$store.dispatch('box/login', {
        username: this.username,
        password: this.password,
        cbb (obj) {
          if (obj.code === 200) {
            me.$router.replace({path: '/chat'});
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@blue: rgb(22,144,237);
  .login {
    width: 430px;
    background: #eee;
    display: flex;
    flex-flow: column;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    overflow: hidden;
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;

    .top {
      width: 100%;
      height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(data:image/png;base64,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) no-repeat center center;
      background-size: 100%;
      font-size: 0;
      img {
        width: 150px;
      }
      .top-box {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 180px;
        .control {
          position: absolute;
          top: 5px;
          right: 5px;
          display: flex;
          .item {
            width: 18px;
            height: 18px;
            margin: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px;
            &.close {
              &:hover {
                img {
                  opacity: 1;
                }
                background: rgb(252,74,45);
              }
            }
            &:hover {
              img {
                opacity: 1;
              }
            }
            img {
              width: 16px;
              height: 16px;
              opacity: 0.5;
            }
          }
        }
      }
    }
    .bottom {
      flex: 1;
      background: #ebf2f9;
      .center {
        height: 85%;
        width: 60%;
        margin: 0 auto;
        font-size: 0;
        padding: 15px 0;
        box-sizing: border-box;
        .input {
          width: 100%;
          margin: 0;
          padding: 0 15px;
          box-sizing: border-box;
          margin-top: -1px;
          line-height: 35px;
          outline: none;
          border: 1px solid #ddd;
          color: #000;
          font-size: 16px;
          &.username {
            border-radius: 5px 5px 0 0;
          }
          &.password {
            border-radius: 0 0 5px 5px;
          }
        }
        .error-tip {
          font-size: 13px;
          color: red;
          line-height: 20px;
        }
        .button {
          width: 100%;
          line-height: 35px;
          background: #00a3ff;
          border-radius: 5px;
          margin-top: 15px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          cursor: default;
          &:hover {
            background: #4abdfe;
          }
          &:active {
            background: #0193e6;
          }
        }
      }
      .tip {
        padding: 3px 10px;
        background: #fcf4c0;
        font-size: 14px;
        color: #666;
        border-top: 1px solid rgba(187,187,0,0.1);
        .register {
          color: rgb(7,118,209);
          text-decoration: underline;
          cursor: pointer;
          &:hover {
            color: rgb(7,66,166);
          }
        }
      }
    }
  }
</style>
