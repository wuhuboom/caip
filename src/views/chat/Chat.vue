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
    <div ref="chatBox" class="flex-1 chat-box js-cont-room">
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

      <!-- <div class="time-box center-center">
        <div class="time">2024-11-15 00:52:11</div>
      </div>
      <div class="item-box left">
        <div class="img-box">
          <img src="" class="img" />
        </div>
        <div class="info-box">
          <div class="name text-ellipsis">阿萌</div>
          <div class="content-box">
            <div class="content">小双:245</div>
          </div>
        </div>
      </div>
      <div class="time-box center-center">
        <div class="time">2024-11-15 00:52:11</div>
      </div>
      <div class="item-box right">
        <div class="info-box">
          <div class="name text-ellipsis">阿萌</div>
          <div class="content-box">
            <div class="content">
              <div>@阿萌 下注成功</div>
              <div>小双:245 余分:4138.25</div>
            </div>
          </div>
        </div>
        <div class="img-box">
          <img src="" class="img" />
        </div>
      </div> -->
    </div>
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
        <div class="input-box" @keydown.enter.native.prevent="send">
          <input
            type="text"
            class="input"
            :placeholder="placeholder"
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
export default {
  name: "chatRoom",
  data() {
    return {
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
    };
  },
  directives: {
    ObserveVisibility,
  },
  components: {
    roomMsg,
    InfiniteLoading,
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
    wsStatus() {
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
    async afterRead({ file }) {
      //type "image/jpeg"
      if (file.type.indexOf("image/") === -1) {
        this.$toast("请上传图片");
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
      this.sendMessage({
        data: res.data,
        type: 3,
      });
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
        this.sendMessage({
          data: this.text.trim(),
        });
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
<style scoped lang="less">
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
  .height {
    height: 104px;
  }
  .wrap-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 104px;
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
</style>
