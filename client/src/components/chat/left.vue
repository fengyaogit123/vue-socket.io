<template>
  <div class="left">
    <div class="item" :class="{checked: itemIndex === index}" v-for="(item, index) in userList" @click="itemEvent(index)">
      <div class="icon">
        <img :src="item.url" />
      </div>
      <div class="user">
        <div class="username">{{item.username}}</div>
        <div class="message">{{item.message}}</div>
      </div>
      <div class="delete">
        <div class="close" @click="deleteEvent($event, item, index)">✖</div>
      </div>
      <div class="active" v-show="item.noReadNum">
        <div class="text">{{item.noReadNum}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {list} from './user.json';
export default {
  components: {
  },
  data () {
    return {
      userList: list,
      itemIndex: -1
    };
  },
  methods: {
    itemEvent (index) {
      this.itemIndex = index;
    },
    deleteEvent (e, item, index) {
      e.stopPropagation();
    }
  }
};
</script>
<style lang="less">
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

    .left {
      width: 200px;
      background: rgb(250,250,250);
      overflow-y: auto;
      &:hover {
        &::-webkit-scrollbar-thumb {
          background: rgba(200, 200, 200, 0.6);
        }
      }

      .item {
        height: 60px;
        width: 100%;
        display: flex;
        padding: 10px 3px 10px 10px;
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
        .icon {
          height: 100%;
          img {
            height: 100%;
            border-radius: 100%;
          }
        }
        .user {
          flex: 1;
          margin-left: 7px;
          .username {
            font-size: 15px;
            color: #222;
            line-height: 22px;
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
