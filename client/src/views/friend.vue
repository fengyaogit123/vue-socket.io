<template>
  <div class="friend" ref="box">
    <ai-friend-list></ai-friend-list>
    <div class="right-box">
      <div class="top">在线用户列表</div>
      <div class="center" ref="scroll">
        <ul ref="ul">
          <li :class="{small: true}" v-for="(item, index) in userList" :key="index" :data="index"></li>
        </ul>
        <div class="checkout" v-if="createGroup.status" :style="`left: ${checkout.clientx}px;top: ${checkout.clienty}px`"></div>
      </div>
      <div class="bottom">
        <div class="create-group">
          <div class="title">新建群组<span class="sure">创建</span><span class="close">取消</span></div>
          <div class="content" ref="cmove">
            <div class="item" :class="{big: createGroup.status}" v-for="(item, index) in groupList"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import friend_list from '../components/friend_list.vue';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('box/chat');
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
      groupList: [
        {id: '', icon: ''}
      ]
    };
  },
  created () {
    for (let i = 0; i < 110; i++) {
      this.userList.push({id: i, url: '--', username: '哈哈哈'});
    }
  },
  mounted () {
    this.$refs.ul.onmousedown = (e) => {
      let index = e.target.getAttribute('data');
      if (index) {
        this.createGroup = {
          status: false,
          state: true,
          userInfo: this.userList[index]
        };
        let left = this.$refs.cmove.offsetLeft;
        let top = this.$refs.cmove.offsetTop;
        let width = this.$refs.cmove.clientWidth;
        let height = this.$refs.cmove.clientHeight;
        this.cmove = {
          x1: left,
          x2: left + width,
          y1: top,
          y2: top + height
        };
      }
    };
    this.$refs.box.onmousemove = (e) => {
      if (this.createGroup.state) {
        this.createGroup.status = true;
      }
      if (this.createGroup.status) {
        this.checkout = {
          clientx: e.clientX,
          clienty: e.clientY
        };
      }
    };
    this.$refs.box.onmouseup = (e) => {
      if (this.createGroup.status) {
        if (e.clientX > this.cmove.x1 && e.clientX < this.cmove.x2 && e.clientY > this.cmove.y1 && e.clientY < this.cmove.y2) {
          this.groupList.splice(this.groupList.length - 1, 0, {id: '', icon: ''});
        }
        this.createGroup = {
          status: false,
          state: false,
          userInfo: null
        };
      }
    };
  },
  computed: {
    ...mapState({
    })
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([])
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
      line-height: 40px;
      padding: 0 10px;
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
          background: url(../images/user/boy1.png) no-repeat center center;
          background-size: 100% 100%;
          display: inline-block;
          margin: 10px;
          border-radius: 100%;
          overflow: hidden;
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
        background: url(../images/user/boy1.png) no-repeat center center;
        background-size: 100% 100%;
        position: fixed;
        opacity: 0.7;
      }
    }
    .bottom {
      width: 100%;
      .create-group {
        width: 100%;
        height: 115px;
        background: #fff;
        padding: 0 15px 15px 15px;
        box-sizing: border-box;
        border-top: 1px solid #ddd;
        box-shadow: 0 -3px 6px rgba(50,50,50,0.1);
        display: flex;
        flex-flow: column;
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
        }
        .content {
          flex: 1;
          width: 100%;
          font-size: 0;
          .item {
            width: 63px;
            height: 63px;
            display: inline-block;
            margin-right: 10px;
            border-radius: 100%;
            border: 2px dashed #ccc;
            box-sizing: border-box;
            transform: scale(0.9);
            &.big {
              transform: scale(1);
              border: 2px dashed #bbb;
            }
          }
        }
      }
    }
  }
}
</style>
