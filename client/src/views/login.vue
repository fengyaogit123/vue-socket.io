<template>
  <div class="login">
    <div class="top">
      <img src="../images/login/logo.png" />
      <div class="control">
        <div class="item small"><img src="../images/login/small.png" /></div>
        <div class="item close"><img src="../images/login/close.png" /></div>
      </div>
    </div>

    <div class="bottom">
      <div class="center">
        <input class="input username" placeholder="用户名" type="text" />
        <input class="input password" placeholder="密码" type="password" />
        <div class="button">登  录</div>
      </div>
      <div class="tip">首次登录将直接为您注册新账号（共享旅游圈账号体系）</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
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
      height: 160px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(../images/login/login_bg.png) no-repeat center center;
      background-size: 100%;
      position: relative;
      img {
        width: 150px;
      }
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
          &.username {
            border-radius: 5px 5px 0 0;
          }
          &.password {
            border-radius: 0 0 5px 5px;
          }
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
      }
    }
  }
</style>
