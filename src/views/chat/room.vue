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
            v-observe-visibility="visibilityChanged(v, i)"
            :item="v"
            v-for="(v, i) in messages"
            :key="i"
            ref="$roomMsg"
          />
        </div>
        <div
          class="btm"
          :class="{ 'btm-disabled': disabled }"
          v-loading="loadingShare"
        >
          <ul v-if="showUserList" class="user-list">
            <li
              class="align-center"
              v-for="(user, index) in filteredUsers"
              :key="index"
              :class="{ active: index === selectedIndex }"
              @click="selectUser(user)"
            >
              <img
                class="d-img user-pic m-l-12 m-r-24"
                :src="
                  user.img
                    ? user.img.includes('http')
                      ? user.img
                      : `${$baseURL}/${user.img}`
                    : userPic
                "
              />
              @{{ user.username }}
            </li>
          </ul>
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
            <van-uploader class="m-l-16" :after-read="afterRead"
              ><i
                class="el-icon-picture"
                style="font-size: 30px; color: #ee8453"
              ></i
            ></van-uploader>

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
              @input="onInput"
              @keydown.down.native.prevent="moveDown"
              @keydown.up.native.prevent="moveUp"
              ref="inputRef"
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
      filteredUsers: [],
      showUserList: false,
      selectedIndex: 0,
      mentionPosition: -1, // 记录 `@` 位置
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
    ...mapState("chat", [
      "messages",
      "playerId",
      "query",
      "ws",
      "wsStatus",
      "onlineUser",
    ]), // 绑定聊天消息记录
    ...mapGetters("chat", ["news"]),
  },
  watch: {
    showUserList() {
      if (this.showUserList) {
        this.selectedIndex = 0;
      }
    },
    wsStatus() {
      this.alertReload();
    },
  },
  methods: {
    /** 选择用户 */
    selectUser(user = null) {
      if (!user) {
        user = this.filteredUsers[this.selectedIndex];
      }
      if (user) {
        const beforeMention = this.text.slice(0, this.mentionPosition);
        const afterMention = this.text.slice(this.getCursorPosition());
        this.text = `${beforeMention}@${user.username} ${afterMention}`;
        this.showUserList = false;
      }
    },
    /** 获取光标位置 */
    getCursorPosition() {
      const textarea = this.$refs.inputRef.$refs.textarea;
      return textarea ? textarea.selectionStart : -1;
    },
    moveDown() {
      if (this.showUserList) {
        this.selectedIndex =
          (this.selectedIndex + 1) % this.filteredUsers.length;
      }
    },
    moveUp() {
      if (this.showUserList) {
        this.selectedIndex =
          (this.selectedIndex - 1 + this.filteredUsers.length) %
          this.filteredUsers.length;
      }
    },
    onInput(value) {
      const cursorPos = this.$refs.inputRef.$refs.textarea.selectionStart;
      const atIndex = value.lastIndexOf("@", cursorPos - 1);
      //以@结尾
      if (value[value.length - 1] == "@") {
        this.filteredUsers = this.onlineUser.map((v) => v);
        this.showUserList = true;
        this.mentionPosition = atIndex;
        return;
      }
      const matches = [...value.matchAll(/@(\S*)/g)]
        .map((m) => m[1])
        .filter((name) => name.length > 0);
      //取最后一个数组元素
      const lastMatch = matches[matches.length - 1];
      if (lastMatch) {
        if (!value.endsWith(`@${lastMatch}`)) {
          this.showUserList = false;
          return;
        }
        this.selectedIndex = 0;
        this.filteredUsers = this.onlineUser.filter((user) =>
          user.username.toLowerCase().includes(lastMatch.toLowerCase())
        );
        this.showUserList = true;
        this.mentionPosition = atIndex;
      } else {
        this.showUserList = false;
      }
    },
    ...mapActions("chat", [
      "initWebSocket",
      "closeWebSocket",
      "sendMessage",
      "fetchHistory",
    ]),
    async afterRead({ file }) {
      //type "image/jpeg"
      if (file.type.indexOf("image/") === -1) {
        this.$toast("请上传图片");
        return;
      }
      //限制图片大小10M
      if (file.size > 1024 * 1024 * 10) {
        this.$toast("图片大小不能超过10M");
        return;
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const [err, res] = await userApi.uploadImg({ file });
      if (err) return;
      this.$toast.clear();
      console.log(res);
      // this.sendMessage({
      //   data: res.data,
      //   type: 3,
      // });
    },
    notAllow() {
      this.$alert("你已经被禁言", {
        confirmButtonText: "确定",
        showClose: false,
        callback: () => {},
      });
    },
    notView() {
      this.$alert("你已经被踢出聊天室", {
        confirmButtonText: "确定",
        showClose: false,
        callback: () => {
          this.$router.push("/");
        },
      });
    },
    openPopup() {
      this.$refs.$popupMoney.show = true;
    },
    async chat() {
      this.loadingShare = true;
      const [err, res] = await userApi.chat();
      this.loadingShare = false;
      if (err) return;
      this.shareData = res.data;
      if (+res.data.chatStatus === 1) {
        //禁言
        this.notAllow();
      } else if (+res.data.chatStatus === 2) {
        //踢出
        this.notView();
      }
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
    visibilityChanged(v, i) {
      return (isVisible) => {
        if (isVisible) {
          this.$refs.$roomMsg[i].visib && this.$refs.$roomMsg[i].visib();
          if (v.new === true) {
            this.$store.commit("chat/setToOld", v);
          }
        }
      };
    },
    async send() {
      if (this.text) {
        if (this.showUserList) {
          this.selectUser(this.filteredUsers[this.selectedIndex]);
          return;
        }
        const matches = [...this.text.matchAll(/@(\S*)/g)]
          .map((m) => m[1])
          .filter((name) => name.length > 0);
        if (matches.length > 0) {
          const users = this.onlineUser.filter((user) =>
            matches.includes(user.username)
          );
          let playerId = users.map((v) => v.playerId);
          //去重复 playerId
          playerId = [...new Set(playerId)];
          this.sendMessage({
            type: 10,
            data: JSON.stringify({
              playerId: `${playerId}`,
              msg: this.text,
            }),
          });
        } else {
          this.sendMessage({
            data: this.text.trim(),
          });
        }
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
  created() {
    this.$store.dispatch("getSharaData");
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

.user-list {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #ddd;
  width: 100%;
  list-style: none;
  max-height: 150px;
  overflow-y: auto;
  color: #333;
}
.user-list li {
  padding: 0 5px;
  height: 48px;
  cursor: pointer;
  .user-pic {
    width: 38px;
    height: 38px;
  }
}
.user-list li.active {
  background: #f1f1f1;
}
</style>
