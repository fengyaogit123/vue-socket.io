<template>
  <div class="chat">
    <ai-left></ai-left>
    <div class="resize" ref="resize"></div>
    <div class="right-box">
      <div class="top">{{user.userInfo.username}}</div>
      <div class="center" ref="scroll">
        <div class="scroll-box">
              <div v-for="item in user.list">
                <div class="message left-hook" v-if="item.type === 2">
                  <div class="message-left">
                    <img :src="user.userInfo.avatar"/>
                  </div>
                  <div class="message-center">
                    <div class="user">{{ user.userInfo.username }}</div>
                    <pre class="text"><span class="horn">◀</span>{{ item.message }}</pre>
                  </div>
                  <div class="message-right"></div>
                </div>
                <div class="message right-hook" v-if="item.type === 3">
                  <div class="message-left"></div>
                  <div class="message-center">
                    <div class="user">{{ meInfo.username }}</div>
                    <pre class="text"><span class="horn">▶</span>{{ item.message }}</pre>
                  </div>
                  <div class="message-right">
                    <img :src="meInfo.avatar" />
                  </div>
                </div>
                <div class="message center-hook" v-if="item.type === 1">
                  <span class="tip">{{ item.message }}</span>
                </div>
              </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-top">
          <div class="bottom-item happy"></div>
          <div class="bottom-item zhendong"></div>
          <div class="bottom-item position"></div>
          <div class="bottom-item picture"></div>
          <div class="bottom-item folder"></div>
          <div class="bottom-item setting"></div>
        </div>
        <div class="bottom-center">
          <textarea class="textarea" ref="message" autofocus placeholder="Ctrl + K 可发送消息" v-model="message"></textarea>
        </div>
        <div class="btn-box">
          <div class="button" ref="btn" @click="sendMessageEvent()">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import left from '../components/chat/left.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('box');
export default {
  components: {
    'ai-left': left
  },
  data () {
    return {
      start: 0,
      press: false,
      message: ''
    };
  },
  computed: {
    ...mapState({
      user: state => state.userList[state.itemIndex],
      meInfo: state => state.userInfo
    })
  },
  mounted () {
    this.$refs.message.onkeyup = (e) => {
      if (event.ctrlKey && event.keyCode === 13) {
        this.sendMessageEvent();
      }
    };
    this.$refs.btn.onmousedown = event => { // 发送消息不失去焦点
      event.preventDefault();
    };
    this.$refs.resize.onmousedown = event => { // 左右拖动
      event.preventDefault();
      if (!this.press) {
        this.start = event.clientX;
        this.press = true;
      }
    };
    document.getElementById('app').onmousemove = event => { // 左右拖动
      if (this.press) {
        event.preventDefault();
        let width = event.clientX - this.start + 200;
        this.changeUserListResize(width);
      }
    };
    document.getElementById('app').onmouseup = event => { // 左右拖动
      if (this.press) {
        event.preventDefault();
        this.press = false;
      }
    };
  },
  methods: {
    ...mapMutations(['changeUserListResize']),
    ...mapActions(['sendMessage']),
    sendMessageEvent () {
      console.log(this.message);
      if (this.message.length < 1) {
        console.log('此处在发送按钮上弹出空消息的提示');
        return;
      }
      this.sendMessage({message: this.message});
      this.message = '';
    },
    wrap () {
      this.message += '\n';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .chat {
    width: 100%;
    display: flex;
    .resize {
      width: 4px;
      height: 100%;
      cursor: e-resize;
    }
    .right-box {
      flex: 1;
      display: flex;
      flex-flow: column;
      .top {
        height: 40px;
        border-bottom: 1px solid #dedede;
        line-height: 40px;
        padding: 0 10px;
      }
      .center {
        width: 100%;
        flex: 1;
        padding: 0 15px 0 10px;
        box-sizing: border-box;
        overflow-y: auto;
        .scroll-box {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          padding: 10px 3px;
          box-sizing: border-box;
          &:hover {
            &::-webkit-scrollbar-thumb {
              background: rgba(200, 200, 200, 0.6);
            }
          }
          .message {
              width: 100%;
              margin-bottom: 10px;
              display: flex;
              .message-left {
                  width: 40px;
                  img {
                      height: 40px;
                      border-radius: 100%;
                  }
              }
              .message-right {
                  width: 40px;
                  img {
                      height: 40px;
                      border-radius: 100%;
                  }
              }
              .message-center {
                  flex: 1;
                  .text {
                      position: relative;
                      font-family: "Microsoft yahei";
                      font-size: 13px;
                      padding: 10px 13px;
                      margin: 0;
                      word-break: break-all;
                      overflow: auto;
                      border-radius: 8px;
                      line-height: 20px;
                      display: inline-block;
                      .horn {
                          position: absolute;
                          top: 5px;
                          font-size: 15px;
                      }
                  }
              }
              &.center-hook {
                  text-align: center;
                  padding: 10px 0;
                  display: block;
                  justify-content: center;
                  align-items: center;
                  .tip {
                      padding: 5px 12px;
                      border-radius: 10px;
                      background: rgb(226,226,226);
                      color: #666;
                      font-size: 12px;
                      line-height: 12px;
                  }
              }
          }
          .left-hook {
              padding: 5px 0;
              .message-center {
                  float: left;
                  margin-left: 10px;
                  .text {
                      background: rgb(238,238,238);
                      color: #333;
                      float: left;
                      .horn {
                          color: rgb(238,238,238);
                          left: -8px;
                      }
                  }
                  .user {
                      margin-bottom: 5px;
                      font-size: 12px;
                      color: #aaa;
                      line-height: 12px;
                  }
              }
          }
          .right-hook {
              padding: 5px 0;
              .message-center {
                  float: right;
                  margin-right: 10px;
                  .text {
                      background: #1991ed;
                      color: #fff;
                      float: right;
                      .horn {
                          color: #1991ed;
                          right: -8px;
                      }
                  }
                  .user {
                      text-align: right;
                      margin-bottom: 5px;
                      font-size: 12px;
                      color: #aaa;
                      line-height: 12px;
                  }
              }
          }
        }
      }

      .bottom {
        height: 140px;
        border-top: 1px solid #dedede;
        display: flex;
        flex-flow: column;
        padding: 0 10px 10px 10px;
        box-sizing: border-box;
        &:before {
          width: 100%;
          height: 4px;
          content: ' ';
          transform: translate3d(0, -2px, 0);
          cursor: n-resize;
        }
        .bottom-top {
          height: 34px;
          padding: 5px 0;
          box-sizing: border-box;
          cursor: default;
          .bottom-item {
            width: 24px;
            height: 24px;
            background: #fff;
            margin-right: 15px;
            display: inline-block;
            border-radius: 3px;
            &.happy {
              background: url(../images/happy.png) no-repeat center center;
              background-size: 20px;

              &:hover {
                background: #eee url(../images/happy.png) no-repeat center center;
                background-size: 20px;
              }
            }
            &.zhendong {
              background: url(../images/zhendong.png) no-repeat center center;
              background-size: 20px;

              &:hover {
                background: #eee url(../images/zhendong.png) no-repeat center center;
                background-size: 20px;
              }
            }
            &.picture {
              background: url(../images/picture.png) no-repeat center center;
              background-size: 20px;

              &:hover {
                background: #eee url(../images/picture.png) no-repeat center center;
                background-size: 20px;
              }
            }
            &.position {
              background: url(../images/position.png) no-repeat center center;
              background-size: 20px;

              &:hover {
                background: #eee url(../images/position.png) no-repeat center center;
                background-size: 20px;
              }
            }
            &.folder {
              background: url(../images/folder.png) no-repeat center center;
              background-size: 20px;

              &:hover {
                background: #eee url(../images/folder.png) no-repeat center center;
                background-size: 20px;
              }
            }
            &.setting {
              background: url(../images/setting.png) no-repeat center center;
              background-size: 20px;

              &:hover {
                background: #eee url(../images/setting.png) no-repeat center center;
                background-size: 20px;
              }
            }
          }
        }
        .btn-box {
          height: 30px;
          padding: 0 10px;
          box-sizing: border-box;
          .button {
            width: 80px;
            height: 100%;
            background: rgb(1,136,251);
            border-radius: 3px;
            text-align: center;
            line-height: 30px;
            color: #fff;
            font-size: 13px;
            float: right;
            cursor: default;
            &:hover {
              background: rgb(1,166,251);
            }
          }
        }
        .bottom-center {
          flex: 1;
          font-size: 0;
          .textarea {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            resize: none;
            font-size: 13px;
            color: #333;
            line-height: 20px;
            box-sizing: border-box;
            font-family: "微软雅黑";
          }
        }
      }
    }
  }
</style>
