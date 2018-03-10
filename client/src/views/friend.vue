<template>
  <div class="friend" ref="box">
    <ai-friend-list></ai-friend-list>
    <div class="right-box">
      <div class="top">在线用户列表 <span class="control-icon" @click="createGroup.show = true">新建群组</span></div>
      <div class="center" ref="scroll">
        <ul ref="ul">
          <li :class="{small: item.small}"
              v-for="(item, index) in onlineUserList"
              :key="index"
              :data="item.userInfo.userId"
              :style="`background-image: url(${item.userInfo.avatar})`"
          ></li>
        </ul>
        <div class="checkout" v-if="createGroup.status" :style="`background-image: url(${createGroup.userInfo.avatar};left: ${checkout.clientx}px;top: ${checkout.clienty}px`"></div>
      </div>
      <div class="bottom">
        <div class="create-group" :class="{show: createGroup.show}">
          <div class="create-g-box">
            <div class="title">新建群组
              <span class="tip">（拖动用户到下方区域即可）</span>
              <span class="sure">创建</span>
              <span class="close" @click="createGroup.show = false">取消</span>
            </div>
            <div class="content" ref="cmove">
              <div class="item-box" :class="{big: createGroup.status}" v-for="(item, index) in groupList">
                <div class="delete" @click="deleteGroupItem(index)"></div>
                <div class="item" :style="`background-image: url(${item.avatar})`"></div>
              </div>
              <div class="item-box" :class="{big: createGroup.status}" v-show="groupList.length < 6"><div class="item"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--辅助定位用，过后删除-->
    <!-- <div ref="fuzhu" :style="`position:fixed;left: ${cmove.x1 - chatBox_left}px; top: ${cmove.y1 - chatBox_top}px;width: 470px;height:63px;background:red;opacity: 0.5;`"></div> -->
  </div>
</template>

<script>

import friend_list from '../components/friend_list.vue';
import usericon from '../images/user/boy1.png';
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapMutations } = createNamespacedHelpers('box/chat');
export default {
  components: {
    'ai-friend-list': friend_list
  },
  data () {
    return {
      start: 0,
      press: false,
      message: '',
      userList: [],
      createGroup: {
        show: false,
        userInfo: null,
        status: false, // 这个是用来判断 是否拖动的
        state: false // 这个state 用来判断是否按下的是user标签
      },
      checkout: {
        clientx: 0,
        clienty: 0
      },
      cmove: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      },
      groupList: []
    };
  },
  computed: {
    chatBox_left () {
      console.log(this.$store);
      return this.$store.getters['size/chatBoxRealSize'].left;
    },
    chatBox_top () {
      return this.$store.getters['size/chatBoxRealSize'].top;
    },
    onlineUserList () {
      return this.$store.getters['box/onlineUserList'];
      // return this.$store.state.box.userList;
    }
  },
  created () {
    for (let i = 0; i < 110; i++) {
      this.userList.push({userId: i, url: usericon, username: '哈哈哈', small: true});
    }
  },
  mounted () {
    let _this = this;
    this.$refs.ul.onmousedown = (e) => {
      if (!this.createGroup.show) return;
      let index = e.target.getAttribute('data');
      if (index) {
        this.createGroup = {
          ..._this.createGroup,
          status: false,
          state: true
        };
        for (let i = 0; i < _this.onlineUserList.length; i++) {
          if (index - 0 === _this.onlineUserList[i].userInfo.userId - 0) _this.createGroup.userInfo = _this.onlineUserList[i].userInfo;
        }

        let left = this.$refs.cmove.offsetLeft;
        let top = this.$refs.cmove.offsetTop;
        let width = this.$refs.cmove.clientWidth;
        let height = this.$refs.cmove.clientHeight;
        this.cmove = {
          x1: left + this.chatBox_left,
          x2: left + this.chatBox_left + width,
          y1: top + this.chatBox_top,
          y2: top + this.chatBox_top + height
        };
      }
    };
    this.$refs.box.onmousemove = (e) => {
      if (!this.createGroup.show) return;
      if (this.createGroup.state) {
        this.createGroup.status = true;
      }
      if (this.createGroup.status) {
        this.checkout = {
          clientx: e.clientX - this.chatBox_left - 30,
          clienty: e.clientY - this.chatBox_top - 30
        };
      }
    };
    this.$refs.box.onmouseup = (e) => {
      if (!this.createGroup.show) return;
      if (this.createGroup.status) {
        if (e.clientX > this.cmove.x1 && e.clientX < this.cmove.x2 && e.clientY > this.cmove.y1 && e.clientY < this.cmove.y2) {
          if (this.groupList.length < 6) this.groupList.push(this.createGroup.userInfo);
          else console.log('群组最多包含 6 名成员');
        }
        this.createGroup = {
          ...this.createGroup,
          status: false,
          state: false,
          userInfo: null
        };
      }
    };
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    deleteGroupItem (index) {
      this.groupList.splice(index, 1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.friend {
  width: 100%;
  display: flex;
  user-select: none;
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
      line-height: 24px;
      padding: 8px 10px;
      box-sizing: border-box;
      .control-icon {
        float: right;
        font-size: 12px;
        line-height: 24px;
        padding: 0 10px;
        background: #0086f1;
        color: #fff;
      }
    }
    .center {
      width: 100%;
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
      overflow-y: scroll;
      ul {
        padding: 0;
        margin: 0;
        li {
          padding: 0;
          margin: 0;
          list-style-type: none;
          width: 60px;
          height: 60px;
          display: inline-block;
          margin: 10px;
          border-radius: 100%;
          border: 1px solid #95c7fb;
          box-sizing: border-box;
          overflow: hidden;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.small {
            transform: scale(0.9);
          }
        }
      }
      .checkout {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        overflow: hidden;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: fixed;
        opacity: 0.7;
        z-index: 1000;
      }
    }
    .bottom {
      width: 100%;
      .create-group {
        width: 100%;
        height: 0;
        overflow: hidden;
        transition: all 0.5s;
        &.show {
          height: 115px;
        }
        .create-g-box {
          width: 100%;
          background: #fff;
          box-shadow: 0 -3px 6px rgba(50,50,50,0.1);
          display: flex;
          flex-flow: column;
          height: 100%;
          padding: 0 15px 15px 15px;
          box-sizing: border-box;
          border-top: 1px solid #ddd;
          .title {
            line-height: 40px;
            font-size: 14px;
            color: #333;
            .close {
              float: right;
              padding: 0 15px;
              background: #eee;
              margin: 7px 0 0 15px;
              line-height: 26px;
              border-radius: 2px;
              cursor: default;
            }
            .sure {
              float: right;
              padding: 0 15px;
              background: #0086f1;
              margin: 7px 0 0 15px;
              line-height: 26px;
              border-radius: 2px;
              color: #fff;
              cursor: default;
            }
            .tip {
              color: #ccc;
              font-size: 12px;
            }
          }
          .content {
            flex: 1;
            width: 100%;
            font-size: 0;
            .item-box {
              width: 63px;
              height: 63px;
              display: inline-block;
              margin-right: 10px;
              transform: scale(0.9);
              position: relative;
              .item {
                width: 100%;
                height: 100%;
                border-radius: 100%;
                border: 2px dashed #ccc;
                box-sizing: border-box;
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
              }
              .delete {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 100%;
                opacity: 0;
                transition: all 0.5s;
                background: rgba(0,0,0,0.5) url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTE4MjU1MzM1NzgwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM1MDIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTI1NC4zOTg1MjYgODA0LjcwMjQxMmwtMC4wMzA2OTktNC43ODcwMjZDMjU0LjM2NzgyNyA4MDEuNTQ2NTM1IDI1NC4zODAxMDYgODAzLjEzNTczIDI1NC4zOTg1MjYgODA0LjcwMjQxMnpNNjE0LjE5MDkzOSAyNTkuMDM2NjYxYy0yMi4xMTY3MTcgMC00MC4wNDcwODggMTcuOTEwOTI4LTQwLjA0NzA4OCA0MC4wNDcwODhsMC4zNzE0NiA1MDIuMTYwOTExYzAgMjIuMDk3Mjc0IDE3LjkzMDM3MSA0MC4wNDgxMTEgNDAuMDQ3MDg4IDQwLjA0ODExMXM0MC4wNDgxMTEtMTcuOTUwODM3IDQwLjA0ODExMS00MC4wNDgxMTFsLTAuMzUwOTk0LTUwMi4xNjA5MTFDNjU0LjI1OTUxNiAyNzYuOTQ4NjEzIDYzNi4zMjgxMjIgMjU5LjAzNjY2MSA2MTQuMTkwOTM5IDI1OS4wMzY2NjF6TTg5My4yMzQyNTkgMTQwLjEwNTk2OGwtMzE4Ljg5MTg4NyAwLjE0ODM3OS0wLjE3ODA1NS00MS40MDcwNjJjMC0yMi4xMzYxNi0xNy45MzM0NDEtNDAuMDQ4MTExLTQwLjA2NzU1NC00MC4wNDgxMTEtNy4yOTQxMjcgMC0xNC4xMjY3NDIgMS45NTg2MDgtMjAuMDE3OTE2IDUuMzY0MTcxLTUuODk0MjQ0LTMuNDA1NTYzLTEyLjcyOTkyOS01LjM2NDE3MS0yMC4wMzEyMTktNS4zNjQxNzEtMjIuMTE1Njk0IDAtNDAuMDQ3MDg4IDE3LjkxMTk1Mi00MC4wNDcwODggNDAuMDQ4MTExbDAuMTg4Mjg4IDQxLjQ2MzM0NC0yMzAuMTE1OTgxIDAuMTA2NDI0Yy0zLjIyODUzMS0wLjgzOTExMS02LjYxMzYyOC0xLjI4NzMxOS0xMC4xMDQxMjUtMS4yODczMTktMy41MDI3NzcgMC02Ljg5OTEzIDAuNDUyMzAxLTEwLjEzNjg3MSAxLjI5NjUyOWwtNzMuMDY3MTMyIDAuMDMzNzY5Yy0yMi4xMTU2OTQgMC00MC4wNDgxMTEgMTcuOTUwODM3LTQwLjA0ODExMSA0MC4wNDcwODggMCAyMi4xMzYxNiAxNy45MzEzOTUgNDAuMDQ4MTExIDQwLjA0ODExMSA0MC4wNDgxMTFsNDMuMTc2MzU4LTAuMDIwNDY2IDAuMjkyNjY2IDYxNy45MDI5ODIgMC4wNTkzNTIgMCAwIDQyLjU1MTExOGMwIDQ0LjIzMzQzNCAzNS44NjI3ODkgODAuMDk1MTk5IDgwLjA5NTE5OSA4MC4wOTUxOTlsNDAuMDQ4MTExIDAgMCAwLjMwMjg5OSA0NDAuNTIzMDg1LTAuMjU2ODUgMC0wLjA0NjA0OSA0MC4wNDgxMTEgMGM0My42NjM0NTIgMCA3OS4xNDY1OTUtMzQuOTUgODAuMDU0MjY3LTc4LjM5NTQ4OGwtMC4zMjk1MDUtNTgzLjM2OTQ2OGMwLTIyLjEzNTEzNi0xNy45MzAzNzEtNDAuMDQ3MDg4LTQwLjA0ODExMS00MC4wNDcwODgtMjIuMTE1Njk0IDAtNDAuMDQ3MDg4IDE3LjkxMTk1Mi00MC4wNDcwODggNDAuMDQ3MDg4bDAuMjg3NTQ5IDUwOS4zMjQwNTRjLTEuNDA3MDQ2IDYwLjMxNDY5MS0xOC41OTQ0OTcgNzEuMzY3NDIxLTc5Ljk5Mzg5MiA3MS4zNjc0MjFsNDEuNTc1OTA4IDEuMDIyMjgzLTQ1NC40NDIwOTYgMC4yNjYwNiA1Mi4zOTgzOTQtMS4yODgzNDNjLTYyLjcxNTM2NyAwLTc5LjMwNTIwNy0xMS41MjI0MjgtODAuMDY0NS03NS4zMDgxNzNsMC40OTMyMzQgNzYuNjExODY1LTAuNTQzMzc2IDAtMC4zMTMxMzItNjYwLjgxODM5NyAyMzYuODIyNzMtMC4xMDk0OTRjMS4xNzM3MzIgMC4xMDMzNTQgMi4zNjA3NjcgMC4xNjY3OTkgMy41NjExMDYgMC4xNjY3OTkgMS4yMTU2ODggMCAyLjQxNjAyNi0wLjA2MzQ0NSAzLjYwNDA4NC0wLjE2OTg2OWwzMi42MzkzNzUtMC4wMTUzNWMxLjI1MzU1IDAuMTE4NzA0IDIuNTIxNDI2IDAuMTg1MjE4IDMuODA1Njc2IDAuMTg1MjE4IDEuMjk5NTk5IDAgMi41ODI4MjUtMC4wNjc1MzggMy44NTE3MjUtMC4xODgyODhsMzU0LjkxMzI4OS0wLjE2MzcyOWMyMi4xMTU2OTQgMCA0MC4wNTAxNTgtMTcuOTExOTUyIDQwLjA1MDE1OC00MC4wNDcwODhDOTMzLjI4MzM5NCAxNTguMDE3OTIgOTE1LjM0OTk1MyAxNDAuMTA1OTY4IDg5My4yMzQyNTkgMTQwLjEwNTk2OHpNNzc0LjkyODgwNiA4MTUuMjk0NjU0bDAuMDM2ODM5IDY1LjcxNTcwMS0wLjQ1OTQ2NCAwTDc3NC45Mjg4MDYgODE1LjI5NDY1NHpNNDEzLjk1MzQ1MiAyNTkuMDM2NjYxYy0yMi4xMTY3MTcgMC00MC4wNDgxMTEgMTcuOTEwOTI4LTQwLjA0ODExMSA0MC4wNDcwODhsMC4zNzE0NiA1MDIuMTYwOTExYzAgMjIuMDk3Mjc0IDE3LjkzMTM5NSA0MC4wNDgxMTEgNDAuMDQ5MTM1IDQwLjA0ODExMSAyMi4xMTU2OTQgMCA0MC4wNDcwODgtMTcuOTUwODM3IDQwLjA0NzA4OC00MC4wNDgxMTFsLTAuMzcxNDYtNTAyLjE2MDkxMUM0NTQuMDAwNTQgMjc2Ljk0ODYxMyA0MzYuMDY5MTQ1IDI1OS4wMzY2NjEgNDEzLjk1MzQ1MiAyNTkuMDM2NjYxeiIgcC1pZD0iMzUwMyIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==') no-repeat center center;
                background-size: 40%;
                &:hover {
                  opacity: 1;
                }
              }
              &.big {
                transform: scale(1);
              }
            }
          }
        }
      }
    }
  }
}
</style>
