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
        <div
          v-if="detail.id"
          class="top-bets-bot align-center justify-between p-l-16 p-r-18"
        >
          <div
            class="cat-list"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <div class="font16 cat-txt align-center justify-around">
              {{ detail.lotteryNameH5 }}
              <van-icon :name="!showmenu ? 'arrow-down' : 'arrow-up'" />
            </div>
            <ul class="cat-down" v-if="showmenu">
              <li
                class="center-center"
                v-for="(item, index) in catList"
                :key="index"
                @click="changeId(item.id)"
              >
                {{ item.lotteryNameH5 }}
              </li>
            </ul>
          </div>
          <div
            class="table-boxs"
            @mouseenter="handleMouseEnter1"
            @mouseleave="handleMouseLeave1"
          >
            <ul
              class="table-lists align-center justify-around p-l-8 p-r-8"
              @click="(showmenu = false), (showother = !showother)"
            >
              <li>{{ prize.cycleNum }}期</li>
              <li class="center-center m-r-4 m-l-4">
                <p
                  v-for="(v, i) in prize.openArr"
                  class="openbets center-center"
                  :class="[
                    'openbets' + i,
                    { 'm-r-4': i != prize.openArr.length - 1 },
                  ]"
                  :key="i"
                >
                  {{ v }}
                </p>
              </li>
              <li>
                <van-icon :name="!showother ? 'arrow-down' : 'arrow-up'" />
              </li>
            </ul>
            <div class="cat-down" v-if="showother">
              <ul
                class="align-center justify-around p-x-4"
                v-for="(v, i) in otherPrize"
                :key="i"
                style="height: 45px"
                :class="{ b1s: i != otherPrize.length - 1 }"
              >
                <li class="center-center">{{ v.cycleNum }}期</li>
                <li
                  class="center-center colorfff m-r-4 m-l-4"
                  style="color: #fff"
                >
                  <p
                    class="openbets center-center"
                    :class="[
                      'openbets' + i2,
                      { 'm-r-4': i2 != prize.openArr.length - 1 },
                    ]"
                    v-for="(v2, i2) in v.openArr"
                    :key="i2"
                  >
                    {{ v2 }}
                  </p>
                </li>
                <li style="opacity: 0"><van-icon name="arrow-down" /></li>
              </ul>
            </div>
          </div>
          <div class="align-center">
            <p class="m-r-4">{{ detail.nextExpect.nextExpect }}</p>
            投注中
            <van-count-down :time="detail.nextExpect?.countdown * 1000">
              <template #default="timeData">
                <div class="colorfff timeData align-center m-l-8">
                  <span class="block center-center m-r-8">{{
                    timeData.hours >= 10 ? timeData.hours : `0${timeData.hours}`
                  }}</span>

                  <span class="block center-center m-r-8">{{
                    timeData.minutes >= 10
                      ? timeData.minutes
                      : `0${timeData.minutes}`
                  }}</span>

                  <span class="block center-center">{{
                    timeData.seconds >= 10
                      ? timeData.seconds
                      : `0${timeData.seconds}`
                  }}</span>
                </div>
              </template>
            </van-count-down>
            <p
              class="align-center color-yellow m-l-8 p-r-8"
              @click="
                $router.push({
                  path: `/game/hall`,
                  query: {
                    id: curCat.id,
                    type: curCat.lotteryType,
                  },
                })
              "
            >
              <span>去投注</span><van-icon class="m-l-4" name="arrow" />
            </p>
          </div>
        </div>
        <div class="flex-1 cont y-container js-cont-room p-t-12">
          <infinite-loading
            direction="top"
            @infinite="infiniteHandler"
          ></infinite-loading>
          <roomMsg
            @reply="replay"
            :disabled="disabled"
            @replay="replay"
            :data-msg-id="v.id"
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
          <div
            class="unread-mention center-center"
            @click="goBtm"
            v-if="aites.length"
          >
            <van-badge
              :data-badge="aites.length"
              :content="aites.length"
              max="99"
            >
              <span class="at-symbol center-center">@</span>
            </van-badge>
          </div>
          <ul v-if="showUserList" class="user-list">
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
            <div
              class="m-l-16 color999 reply-txt p-l-4 p-r-4 align-center"
              v-if="doc.id"
            >
              <!-- 0 文本, 8图片, 10 @ -->
              <ul class="m-r-8">
                <li>
                  回复：<span>{{ doc.user }}</span>
                </li>
                <li class="font12 els" style="max-width: 400px">
                  <template v-if="[10, 13].includes(+doc.type)">
                    <p class="" v-html="highlightedText(doc.data?.msg)"></p>
                  </template>
                  <template v-else-if="doc.type === 8">
                    <div style="width: 20px; height: 20px">
                      <img
                        class="d-img"
                        :src="
                          doc.data.includes('http')
                            ? doc.data
                            : `${$baseURL}/${doc.data}`
                        "
                      />
                    </div>
                  </template>
                  <template v-else>
                    {{ doc.data }}
                  </template>
                </li>
              </ul>
              <p class="center-center" @click="doc = {}">
                <van-icon name="cross" color="#000" />
              </p>
            </div>
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
      doc: {},
      showother: false,
      showmenu: false,
      detail: {
        mulConfig: [],
        nextExpect: {},
      },
      results: [],
      id: null,
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
    ...mapGetters(["catList"]),
    prize() {
      return this.results[0] || {};
    },
    otherPrize() {
      return this.results.slice(1);
    },
    curCat() {
      return this.catList.find((v) => v.id === this.id);
    },
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
    highlightedText(v) {
      console.log(v);
      return v.replace(
        /@(\w+)/g,
        '<span style="color:#488fca;margin:0 2px;">@$1</span>'
      );
    },
    replay(v) {
      this.doc = v;
      this.$refs.inputRef.$refs.textarea.focus();
    },
    goBtm() {
      //aites  :data-msg-id="v.id" 滑动到可视区域
      const lastId = this.aites[this.aites.length - 1].id;
      document.querySelector(`[data-msg-id="${lastId}"]`)?.scrollIntoView();
    },
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
        if (this.doc.id) {
          //发送数据:{"type":13,"data":"{\"id\":回复消息ID,\"msg\":\"消息内容\"}}"}
          const cont = {
            id: this.doc.id,
            msg: this.text,
          };
          if (matches.length > 0) {
            const users = this.onlineUser.filter((user) =>
              matches.includes(user.username)
            );
            let playerId = users.map((v) => v.playerId);
            //去重复 playerId
            cont.playerId = [...new Set(playerId)];
          }
          this.sendMessage({
            type: 13,
            data: JSON.stringify(cont),
          });
          this.doc = {};
        } else if (matches.length > 0) {
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
    async lotteryBetsOrder() {
      const query = {
        id: this.id,
        pageNo: 1,
        pageSize: 8,
      };
      const [err, res] = await userApi.lotteryHisExpect(query);
      if (err) {
        return;
      }
      res.data.results = res.data.results.map((v) => {
        v.openArr = v.openNum.split(",");
        return v;
      });
      this.results = res.data.results;
    },
    async getDetail() {
      const [err, res] = await userApi.betsDetail({ id: this.id });
      if (err) return;
      res.data.mulConfig = JSON.parse(res.data.mulConfig);
      //value
      if (!res.data.nextExpect) {
        res.data.nextExpect = {};
      }
      console.log(this.detail.id, res.data.id);
      if (
        this.detail.id !== res.data.id ||
        this.detail.nextExpect.nextExpect !== res.data.nextExpect.nextExpect
      ) {
        this.detail = res.data;
        this.lotteryBetsOrder();
      }
    },
    changeId(id) {
      this.id = id;
      sessionStorage.setItem("lotteryId", id);
      this.getDetail();
      this.showmenu = false;
    },
    handleMouseLeave() {
      // 延时隐藏菜单
      this.timeoutId = setTimeout(() => {
        this.showmenu = false;
      }, 300); // 500 毫秒延时
    },
    handleMouseEnter() {
      // 清除延时定时器，防止鼠标快速进入后延时隐藏
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.showmenu = true;
    },
    handleMouseLeave1() {
      // 延时隐藏菜单
      this.timeoutId1 = setTimeout(() => {
        this.showother = false;
      }, 300); // 500 毫秒延时
    },
    handleMouseEnter1() {
      // 清除延时定时器，防止鼠标快速进入后延时隐藏
      if (this.timeoutId1) {
        clearTimeout(this.timeoutId1);
      }
      this.showother = true;
    },
  },
  created() {
    this.$store.dispatch("getSharaData");
    this.id = +sessionStorage.getItem("lotteryId") || +this.catList[0].id;
    this.getDetail();
    //getDetail d定时检查
    this.timer = setInterval(() => {
      this.getDetail();
    }, 6000);
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
    this.timer && clearInterval(this.timer);
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
$head: 57px;
.rooms {
  width: 800px;
  height: $height;
  background: #f5f5f5;
  border-radius: 0px 0px 0px 0px;
  position: relative;

  .head {
    height: $head;
    font-size: 20px;
    color: #000000;
    border-bottom: 1px solid #dedcdb;
    position: relative;
  }
  .cont {
    padding-top: $head !important;
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
.unread-mention {
  top: -40px;
  right: 16px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 16px;
  font-weight: bold;

  color: #666;
}

/* 让 @ 符号稍微变小 */
.at-symbol {
  font-size: 14px;
  width: 32px; /* 控制徽章大小 */
  border-radius: 50%; /* 圆形 */
  height: 32px;
  background-color: #ffffff; /* 近似 Telegram 的蓝色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 轻微阴影 */
}
.reply-txt {
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #f0f0f0;
}
.openbets {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #dcae3e;
}
.openbets1 {
  background: #58b2e3;
}
.openbets2 {
  background: #de9fe7;
}
.openbets3 {
  background: #efb187;
}
.openbets4 {
  background: #dc6957;
}
.top-bets-bot {
  position: absolute;
  left: 0;
  top: $head;
  width: 100%;
  height: 51px;
  background: #6280ff;
  .cat-list {
    position: relative;
    .cat-txt {
      width: 123px;
      height: 30px;
      background-color: rgba(155, 174, 255, 0.65);
      border-radius: 5px 5px 5px 5px;
    }
  }
}
.cat-down {
  cursor: pointer;
  color: #333;
  position: absolute;
  left: 0;
  top: 36px;
  width: 100%;
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  & > li {
    height: 34px;
    border-bottom: 1px solid #ededed;
  }
  & > li:last-child {
    border-bottom: none;
  }
}
.table-boxs {
  position: relative;
}
.b1s {
  border-bottom: 1px solid #f5f6f7;
}
.timeData {
  width: 110.5px;
  height: 38px;

  .block {
    background: url("@/assets/img/bets-num.png") no-repeat;
    background-size: 100% 100%;
    width: 30.5px;
    height: 32px;
    font-size: 22px;
    color: #000000;
  }
}
.color-yellow {
  color: #f6c343;
}
</style>
