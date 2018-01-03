<template>
  <div class="chat-box">
    <div class="header">
      <div class="left">
        <img class="user" src="../images/user_icon.png"/>
      </div>
      <div class="center">
        <div class="item" :class="{active: tabIndex === 0}">
          <img class="chat" src="../images/chat.png" />
        </div>
        <div class="item" :class="{active: tabIndex === 1}">
          <img class="friend" src="../images/friend.png" />
        </div>
        <div class="item" :class="{active: tabIndex === 2}">
          <img class="file" src="../images/file.png" />
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@blue: rgb(22,144,237);
  .chat-box {
    width: 65%;
    height: 75%;
    background: #eee;
    min-width: 700px;
    .header {
      width: 100%;
      height: 60px;
      background: @blue;
      box-sizing: border-box;
      display: flex;
      .left {
        flex: 1;
        padding: 8px;
        box-sizing: border-box;
        .user {
          height: 100%;
          background: @blue;
          padding: 2px;
          box-sizing: border-box;
          border-radius: 100%;
          transition: all .5s;
          &:hover {
            background: rgba(255,255,255,0.5);
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
          &.active, &:hover {
            opacity: 1;
            background: url(../images/up.png) no-repeat center 100%;
            background-size: 12px;
          }
        }
      }
      .right {
        flex: 1;
      }
    }
  }
</style>
