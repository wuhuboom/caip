<template>
  <div class="bg-grey flex-column" :style="{ height: `${chatHeight}px` }">
    <AppTopBar ref="topBar" topBarTitle="欢聚一堂">
      <template #right>
        <p class="center-center colorfff serve m-r-24" @click="serve">
          <img class="d-img" src="@/assets/img/card.png" alt="" />
          人工充值
        </p>
      </template>
    </AppTopBar>
    <topBets />
    <div ref="chatBox" class="flex-1 chat-box js-cont-room">
      <infinite-loading
        direction="top"
        @infinite="infiniteHandler"
      ></infinite-loading>
      <roomMsg
        :data-msg-id="v.id"
        :disabled="disabled"
        v-observe-visibility="visibilityChanged(v, i)"
        :item="v"
        v-for="(v, i) in messages"
        :key="i"
        ref="$roomMsg"
      />
    </div>
    <div
      v-if="aites.length"
      class="unread-mention center-center"
      @click="goBtm"
    >
      <van-badge :data-badge="aites.length" :content="aites.length" max="99">
        <span class="at-symbol center-center">@</span>
      </van-badge>
    </div>
    <van-action-sheet
      :overlay="false"
      v-model="showUserList"
      class="aite-box-sheet"
    >
      <ul class="user-list">
        <li
          class="align-center"
          v-for="(user, index) in filteredUsers"
          :key="index"
          :class="{ active: index === selectedIndex }"
          @click="selectUser(user)"
        >
          <img
            class="d-img user-pic m-r-8"
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
    </van-action-sheet>
    <div ref="bottomBox" class="bottom-box">
      <div class="height"></div>
      <div class="wrap-box" :class="{ 'btm-disabled': disabled }">
        <van-popover
          v-model="showPopover"
          trigger="click"
          placement="top-start"
        >
          <ul class="face-box">
            <li v-for="(v, i) in dataFace" :key="i" @click="insert(v)">
              {{ v }}
            </li>
          </ul>
          <template #reference>
            <div class="icon-box">
              <van-icon name="smile-o" class="icon" />
            </div>
          </template>
        </van-popover>
        <van-uploader class="m-l-8" :after-read="afterRead">
          <van-icon :size="28" name="photo-o" />
        </van-uploader>
        <img
          @click="openPopup"
          class="d-img redMony m-l-8 pointer"
          src="@/assets/img/redMony.png"
          alt=""
        />
        <div class="input-box" @keydown.enter.prevent="send">
          <input
            type="text"
            class="input"
            ref="inputRef"
            :placeholder="placeholder"
            @input="onInput"
            v-model="text"
          />
        </div>
        <div class="btn center-center" @click="send">发送</div>
      </div>
    </div>
    <popupMoney ref="$popupMoney" />
  </div>
</template>

<script>
import dataFace from "@/plugins/dataFace.json";
import userApi from "@/api/user";
import userPic from "@/assets/img/user-room.png";
import InfiniteLoading from "vue-infinite-loading";
import { mapState, mapActions, mapGetters } from "vuex";
import roomMsg from "@/views/chat/components/roomMsg.vue";
import { ObserveVisibility } from "vue-observe-visibility";
import popupMoney from "@/views/chat/components/popupMoney.vue";
import topBets from "@/views/chat/components/topBets.vue";
export default {
  name: "chatRoom",
  data() {
    return {
      filteredUsers: [],
      showUserList: false,
      selectedIndex: 0,
      mentionPosition: -1, // 记录 `@` 位置

      dataFace: dataFace.filter((v, i) => i < 50),
      showPopover: false,
      actions: [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }],
      chatHeight: window.innerHeight,
      userPic,
      text: "",
      shareData: {
        chatAble: 1, // 是否可聊天
        // recharge 3000
      },
      loadingShare: false,
      doc: {},
    };
  },
  directives: {
    ObserveVisibility,
  },
  components: {
    roomMsg,
    InfiniteLoading,
    popupMoney,
    topBets,
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
    ...mapGetters("chat", ["news", "aites"]),
  },
  watch: {
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
      const textarea = this.$refs.inputRef;
      return textarea ? textarea.selectionStart : -1;
    },
    onInput() {
      const value = this.text;
      const cursorPos = this.$refs.inputRef.selectionStart;
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
    highlightedText(v) {
      console.log(v);
      return v.replace(
        /@(\w+)/g,
        '<span style="color:#488fca;margin:0 2px;">@$1</span>'
      );
    },
    replay(v) {
      this.doc = v;
      this.$refs.inputRef.focus();
    },
    goBtm() {
      //aites  :data-msg-id="v.id" 滑动到可视区域
      const lastId = this.aites[this.aites.length - 1].id;
      document.querySelector(`[data-msg-id="${lastId}"]`)?.scrollIntoView();
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
    onSelect(action) {
      console.log(action);
    },
    openPopup() {
      this.$refs.$popupMoney.show = true;
    },
    notAllow() {
      this.$dialog.alert({
        message: "你已经被禁言",
        confirmButtonColor: "#3291FF",
      });
    },
    notView() {
      this.$dialog
        .alert({
          message: "你已经被踢出聊天室",
          confirmButtonColor: "#3291FF",
        })
        .then(() => {
          this.$router.push("/");
        });
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
      location.href = this.serveData;
    },
    alertReload() {
      if (this.wsStatus === false) {
        this.$dialog
          .alert({
            message: "已经离线，是否重连？",
            confirmButtonColor: "#3291FF",
          })
          .then(() => {
            location.reload();
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
              playerId: playerId,
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
      this.showPopover = false;
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
      if (this.query.totalPage !== null && pageNo > this.query.totalPage) {
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
<style scoped lang="less">
@height: 104px;
.chat-box {
  overflow-y: auto;
  .time-box {
    margin-top: 40px;
    .time {
      border-radius: 8px 8px 8px 8px;
      background: #cfcfcf;
      color: #fff;
      font-size: 24px;
      height: 36px;
      line-height: 36px;
      padding: 0 8px;
    }
  }
  .item-box {
    margin: 20px 12px 0;
    display: flex;
    &.right {
      justify-content: flex-end;
      .img-box {
        margin-left: 12px;
        margin-right: 0;
      }
      .info-box {
        .name {
          text-align: right;
        }
        .content-box {
          justify-content: flex-end;
          .content {
            border-radius: 16px 0px 16px 16px;
          }
        }
      }
    }
    .img-box {
      margin-right: 12px;
      .img {
        width: 72px;
        height: 72px;
        border-radius: 10px 10px 10px 10px;
      }
    }
    .info-box {
      .name {
        font-size: 24px;
        width: 500px;
      }
      .content-box {
        margin-top: 12px;
        display: flex;
        .content {
          font-size: 26px;
          background: #fff;
          border-radius: 0px 16px 16px 16px;
          padding: 14px 20px;
          max-width: 500px;
        }
      }
    }
  }
}
.bottom-box {
  z-index: 13;
  position: relative;
  .height {
    height: @height;
  }
  .wrap-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: @height;
    background: #fff;
    padding: 0 16px;
    display: flex;
    align-items: center;
    .icon-box {
      .icon {
        color: #666;
        font-size: 50px;
      }
    }
    .input-box {
      margin: 0 20px;
      flex: 1;
      .input {
        width: 100%;
        border: none;
      }
    }
    .btn {
      width: 128px;
      height: 72px;
      border-radius: 14px 14px 14px 14px;
      background: #bf2834;
      color: #fff;
      font-size: 26px;
    }
  }
}
.face-box {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  li {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
  }
}
.redMony {
  height: 60px;
  width: 60px;
}
.btm-disabled {
  .input::placeholder {
    color: #f56c6c;
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
.serve {
  img {
    width: 40px;
    height: 40px;
  }
}
.unread-mention {
  bottom: 140px;
  right: 16px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 32px;
  font-weight: bold;

  color: #666;
}
/* 让 @ 符号稍微变小 */
.at-symbol {
  font-size: 28px;
  width: 62px; /* 控制徽章大小 */
  border-radius: 50%; /* 圆形 */
  height: 64px;
  background-color: #ffffff; /* 近似 Telegram 的蓝色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 轻微阴影 */
}
.reply-txt {
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #f0f0f0;
}
.aite-box-sheet {
  padding-bottom: @height;
  z-index: 9 !important;
}
.user-list {
  color: #333;
}
.user-list li {
  padding: 0 10px;
  height: 86px;
  cursor: pointer;
  .user-pic {
    width: 76px;
    height: 76px;
  }
}
.user-list li.active {
  background: #f1f1f1;
}
</style>
