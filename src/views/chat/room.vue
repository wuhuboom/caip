<template>
  <div class="center-center">
    <div v-if="playerId" class="align-center">
      <ul class="slides flex-column p-t-40">
        <li class="my-avatar m-b-40">
          <img
            class="d-img"
            :src="user.headerImg ? `${$baseURL}/${user.headerImg}` : userPic"
          />
        </li>
        <li class="new-msg pointer" @click="srcollBtm">
          <van-badge :data-badge="news.length" :content="news.length" max="99">
            <img class="d-img" src="@/assets/img/mgs.png" alt="" />
          </van-badge>
        </li>
      </ul>
      <div class="rooms flex-column">
        <ul class="head p-l-24 p-r-24 justify-between align-center">
          <li class="center-center">欢聚一堂</li>
          <li class="center-center serve-line m-r-4 pointer" @click="serve">
            <img class="d-img" src="@/assets/img/bank.png" alt="" />
            人工充值
          </li>
        </ul>
        <div class="flex-1 cont y-container js-cont-room p-t-12">
          <infinite-loading
            direction="top"
            @infinite="infiniteHandler"
          ></infinite-loading>
          <roomMsg
            v-observe-visibility="visibilityChanged(v)"
            :item="v"
            v-for="(v, i) in messages"
            :key="i"
          />
        </div>
        <div
          class="btm"
          :class="{ 'btm-disabled': disabled }"
          v-loading="loadingShare"
        >
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
            <img
              @click="openPopup"
              class="d-img redMony m-l-16 pointer"
              src="@/assets/img/redMony.png"
              alt=""
            />
          </div>
          <div class="enter p-l-8 p-r-8">
            <el-input
              type="textarea"
              :placeholder="placeholder"
              v-model="text"
              maxlength="120"
              show-word-limit
              @keydown.enter.native.prevent="send"
              resize="none"
            ></el-input>
          </div>
          <ul class="send-row align-center p-x-8">
            <li class="send center-center font16" @click="send">发送</li>
          </ul>
        </div>
      </div>
    </div>
    <popupMoney ref="$popupMoney" />
  </div>
</template>

<script>
import userApi from "@/api/user";
import userPic from "@/assets/img/user-room.png";
import EmojiPicker from "vue-emoji-picker";
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapActions, mapGetters } from "vuex";
import roomMsg from "@/views/chat/components/roomMsg.vue";
import { ObserveVisibility } from "vue-observe-visibility";
import popupMoney from "@/views/chat/components/popupMoney.vue";
export default {
  name: "chatRoom",
  data() {
    return {
      userPic,
      text: "",
      shareData: {
        chatAble: 1, // 是否可聊天
        // recharge 3000
      },
      loadingShare: false,
    };
  },
  directives: {
    ObserveVisibility,
  },
  components: {
    roomMsg,
    InfiniteLoading,
    EmojiPicker,
    popupMoney,
  },
  computed: {
    placeholder() {
      return this.disabled
        ? `充值${this.shareData.recharge}才能解锁聊天`
        : "请输入聊天内容";
    },
    disabled() {
      return this.shareData.chatAble === 0;
    },
    serveData() {
      return this.$store.state.serveData?.serviceAddr;
    },
    user() {
      return this.$store.state.user;
    },
    ...mapState("chat", ["messages", "playerId", "query", "ws", "wsStatus"]), // 绑定聊天消息记录
    ...mapGetters("chat", ["news"]),
  },
  watch: {
    wsStatus(v) {
      console.log("wsStatus", v);
      this.alertReload();
    },
  },
  methods: {
    ...mapActions("chat", [
      "initWebSocket",
      "closeWebSocket",
      "sendMessage",
      "fetchHistory",
    ]),
    openPopup() {
      this.$refs.$popupMoney.show = true;
    },
    async chat() {
      this.loadingShare = true;
      const [err, res] = await userApi.chat();
      this.loadingShare = false;
      if (err) return;

      this.shareData = res.data;
    },
    async serve() {
      await this.$store.dispatch("getServeData");
      window.open(this.serveData);
    },
    alertReload() {
      if (this.wsStatus === false) {
        this.$alert("已经离线，是否重连？", {
          confirmButtonText: "确定",
          showClose: false,
          callback: () => {
            location.reload();
          },
        });
      }
    },
    visibilityChanged(v) {
      return (isVisible) => {
        if (isVisible) {
          if (v.new === true) {
            this.$store.commit("chat/setToOld", v);
          }
        }
      };
    },
    async send() {
      if (this.text) {
        this.sendMessage({
          data: this.text.trim(),
          from: "pageSend",
        });
        this.text = "";
        await this.sleep(800);
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
      await this.sleep(1000);
      $state.loaded();
    },
    srcollBtm() {
      this.$nextTick(() => {
        const chatContainer = document.querySelector(".js-cont-room");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
    },
  },
  mounted() {
    this.chat();
    if (this.wsStatus === true) {
      this.srcollBtm();
      return;
    }
    this.initWebSocket();
  },
  beforeDestroy() {
    // this.closeWebSocket();
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
$height: 752px;
.rooms {
  width: 800px;
  height: $height;
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
    position: relative;
    ::v-deep {
      textarea {
        height: 80px;
      }
    }

    &.btm-disabled {
      ::v-deep {
        textarea::placeholder {
          color: #f56c6c;
        }
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
    }
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
.slides {
  width: 102px;
  height: $height;
  background: #293650;
  border-radius: 0px 0px 0px 0px;
  align-items: center;
  .my-avatar {
    height: 53px;
    width: 53px;
    overflow: hidden;
    border-radius: 50%;
  }
}
.new-msg {
  img {
    height: 36px;
    width: 36px;
  }
}
.serve-line {
  font-size: 18px;
  img {
    width: 20px;
    height: 20px;
  }
}
.redMony {
  width: 32px;
  height: 32px;
}
</style>
