<template>
  <div class="login" ref="login" :style="`transform: translate3d(${transformX}px, ${transformY}px, 0);`">
    <div class="top" ref="top">
      <img src="../images/login/logo.png" />
      <div class="top-box">
        <div class="control">
          <div class="item small"><img src="../images/login/small.png" /></div>
          <div class="item close"><img src="../images/login/close.png" /></div>
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
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  components: {
  },
  data () {
    return {
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
      background: url(../images/login/login_bg.png) no-repeat center center;
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
