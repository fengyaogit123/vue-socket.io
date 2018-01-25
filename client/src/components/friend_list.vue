<template>
  <div class="friend-list" :style="{width: '200px'}">
    <div class="item" v-for="(item, index) in 6" :key="index">
      <div class="icon">
        <img src="../images/user/boy1.png" />
        <img src="../images/user/boy2.png" />
        <img src="../images/user/girl1.png" />
        <img src="../images/user/boy3.png" />
      </div>
      <div class="user">
        <div class="username">深藏不漏</div>
        <div class="message">这个群组还没有介绍呢</div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('box');
export default {
  data () {
    return {
    };
  },
  computed: {
    ...mapState({
      userList: state => state.userList,
      itemIndex: state => state.itemIndex,
      userListResize: state => state.userListResize
    })
  },
  methods: {
    ...mapMutations(['itemChangeEvent', 'deleteItemEvent']),
    ...mapActions([]),
    deleteEvent (e, key) {
      e.stopPropagation();
      this.deleteItemEvent(key);
    }
  }
};
</script>
<style lang="less">
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

    .friend-list {
      background: rgb(250,250,250);
      min-width: 65px;
      max-width: 300px;
      overflow-y: auto;
      font-size: 0;
      &:hover {
        &::-webkit-scrollbar {
          width: 8px;
        }
        &::-webkit-scrollbar-thumb {
          background: rgba(200, 200, 200, 0.6);
        }
      }

      .item {
        height: 60px;
        width: 100%;
        display: flex;
        padding: 5px;
        box-sizing: border-box;
        cursor: default;
        &:hover {
          background: rgb(235,235,235);
          .delete {
            width: 16px;
          }
          .active {
            width: 0;
          }
        }
        &.checked {
          background: rgb(235,235,235);
        }
        &.active {
          background: rgb(235,235,235);
        }
        &.gray {
          .icon img {
            filter: grayscale(100%);
            opacity: 0.7;
          }
          .user .username {
            color: #999;
          }
          .user .message {
            color: #bbb;
          }
        }
        .icon {
          height: 50px;
          width: 50px;
          padding: 2px;
          box-sizing: border-box;
          background: #ddd;
          img {
            width: 21px;
            margin: 1px;
            box-sizing: border-box;
            display: inline-block;
          }
        }
        .user {
          flex: 1;
          margin-left: 7px;
          .username {
            font-size: 16px;
            color: #222;
            line-height: 28px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; // 超出行数
            overflow: hidden;

          }
          .message {
            font-size: 12px;
            color: #888;
            line-height: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; // 超出行数
            overflow: hidden;

          }
        }
        .delete {
          width: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          .close {
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-size: 13px;
            background: rgba(0,0,0,0.5);
            color: #fff;
            border-radius: 100%;
            cursor: default;
            &:hover {
              background: rgb(212,58,32);
            }
          }
        }
        .active {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          .text {
            padding: 0 5px;
            background: rgb(247,76,49);
            line-height: 16px;
            text-align: center;
            font-size: 13px;
            color: #fff;
            border-radius: 8px;
          }
        }
      }
    }
</style>
