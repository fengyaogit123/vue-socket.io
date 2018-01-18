<template>
  <div class="chat">
    <div class="header">友情链接</div>
    <div class="main">
      <div class="item">
          <img src="" />
          <div class="title">旅游圈</div>
          <div class="desc">在线分享旅游的社交网站。</div>
      </div>
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
        padding: 10px;
        box-sizing: border-box;
        display: inline-block;
        &:hover {
          border: 1px solid #ccc;
        }
        img {
          width: 100%;
          height: 90px;
          background: #eee;
        }
        .title {
          font-size: 14px;
          color: #333;
        }
        .desc {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
</style>
