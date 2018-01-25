<template>
  <div class="friend">
    <ai-friend-list></ai-friend-list>
    <div class="right-box">
      <div class="top">在线用户列表</div>
      <div class="center" ref="scroll">
        <ul>
          <li v-for="(item, index) in 16" :key="index">
            <img src="../images/user/boy1.png" />
          </li>
        </ul>

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
      message: ''
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
      ul {
        padding: 0;
        margin: 0;
        li {
          padding: 0;
          margin: 0;
          list-style-type: none;
          width: 60px;
          height: 60px;
          background: red;
          display: inline-block;
          margin: 10px;
          border-radius: 100%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
