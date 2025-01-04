<template>
  <div>
    <div v-if="playerId">
      <div class="rooms flex-column">
        <ul class="head p-l-24 justify-between align-center">
          <li class="center-center">欢聚一堂</li>
          <li></li>
        </ul>
        <div class="flex-1 cont y-container js-cont-room p-t-12">
          <infinite-loading
            direction="top"
            @infinite="infiniteHandler"
          ></infinite-loading>
          <roomMsg :item="v" v-for="(v, i) in messages" :key="i" />
        </div>
        <div class="btm">
          <div class="tool-row align-center p-l-24">
            <emoji-picker class="face-box" @emoji="insert">
              <div
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
                v-popover:popover
              >
                <img class="d-img face" src="@/assets/img/face.png" alt="" />
              </div>
              <div
                class="prop-invoker p-x-8"
                slot="emoji-picker"
                slot-scope="{ emojis, insert }"
              >
                <span
                  class="emoji"
                  v-for="(emoji, emojiName) in emojis.People"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                  >{{ emoji }}</span
                >
              </div>
            </emoji-picker>
          </div>
          <div class="enter p-l-8 p-r-8">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="text"
              maxlength="120"
              show-word-limit
              @keydown.enter.native="send"
            ></el-input>
          </div>
          <ul class="send-row align-center p-x-8">
            <li class="send center-center font16" @click="send">发送</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiPicker from "vue-emoji-picker";
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapActions } from "vuex";
import auth from "@/plugins/auth";
import roomMsg from "@/components/roomMsg.vue";
export default {
  name: "chatRoom",
  data() {
    return {
      text: "",
    };
  },
  components: {
    roomMsg,
    InfiniteLoading,
    EmojiPicker,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    ...mapState("chat", ["messages", "playerId", "query"]), // 绑定聊天消息记录
  },
  methods: {
    ...mapActions("chat", [
      "initWebSocket",
      "closeWebSocket",
      "sendMessage",
      "fetchHistory",
    ]),
    send() {
      if (this.text) {
        this.sendMessage({
          data: this.text.trim(),
          from: "pageSend",
        });
        this.text = "";
      }
    },
    insert(emoji) {
      this.text += emoji;
    },
    sleep(v) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(v);
        }, v);
      });
    },
    // eslint-disable-next-line no-unused-vars
    async infiniteHandler($state) {
      // $state.loaded(); $state.complete();
      const pageNo = this.query.pageNo + 1;
      if (this.query.totalPage && pageNo > this.query.totalPage) {
        $state.complete();
        return;
      }
      this.fetchHistory({
        ...this.query,
        pageNo: this.query.pageNo + 1,
      });
      await this.sleep(800);
      $state.loaded();
    },
  },
  mounted() {
    this.initWebSocket({
      url: `wss://api.orz-orz.cc/player/ws/${auth.getToken()}`,
      playerId: this.user.id,
    });
  },
  beforeDestroy() {
    this.closeWebSocket();
  },
};
</script>
<style lang="scss" scoped>
.face-box {
  position: relative;
  .prop-invoker {
    width: 400px;
    position: absolute;
    bottom: 100%;
    background: #fff;
  }
  .emoji {
    cursor: pointer;
  }
}

.rooms {
  width: 800px;
  height: 652px;
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: 0px 0px 0px 0px;
  .head {
    height: 57px;
    font-size: 20px;
    color: #000000;
    border-bottom: 1px solid #dedcdb;
  }
  .cont {
    overflow-y: auto;
    // display: flex;
    // flex-direction: column-reverse;
  }
  .btm {
    border-top: 1px solid #dedcdb;
    .face {
      width: 32px;
      height: 32px;
    }
    .tool-row {
      height: 50px;
    }
    .send-row {
      justify-content: flex-end;
    }
    .send {
      width: 84px;
      height: 36px;
      background: #2f3c57;
      border-radius: 5px 5px 5px 5px;
      cursor: pointer;
    }
  }
}
</style>
