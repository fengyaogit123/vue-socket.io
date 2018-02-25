
<template>
  <div class="chat">
    <div class="header">友情链接</div>
    <div class="main">
      <div class="item" v-for="(item, index) in list">
          <div class="img">
            <img :src="item.url"/>
          </div>
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {list} from './file.json';
export default {
  components: {
  },
  data () {
    return {
      list: list
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .chat {
    width: 100%;
    display: flex;
    flex-flow: column;
    .header {
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 16px;
    }
    .main {
      flex: 1;
      padding: 20px;
      box-sizing: border-box;
      .item {
        width: 150px;
        border: 1px solid #fff;
        padding: 10px 7px;
        margin: 3px;
        box-sizing: border-box;
        display: inline-block;
        cursor: default;
        &:hover {
          border: 1px solid #ccc;
          img {
            transform: scale(1.4);
          }
        }
        .img {
          width: 100%;
          height: 90px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            transition: all 1s;
          }
        }
        .title {
          font-size: 14px;
          color: #333;
          margin-top: 5px;
        }
        .desc {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
</style>
