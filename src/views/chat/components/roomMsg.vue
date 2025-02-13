<template>
  <div>
    <div class="center-center time-box p-t-24 p-b-24">
      <p class="time">{{ $dayjsTime(doc.time) }}</p>
    </div>
    <div v-if="doc.status == 1">
      <p class="center-center m-t-12 m-b-12 font14 color999">
        {{ isMe ? "你撤回了一条消息" : `${doc.user}撤回了一条消息` }}
      </p>
    </div>
    <div
      v-else
      class="d-flex"
      style="overflow: hidden"
      :class="{ 'my-msg': isMe }"
    >
      <div class="room-msg p-l-24 p-l-24 d-flex m-b-12">
        <img
          class="d-img user-pic"
          :class="[isMe ? 'm-l-12 m-r-24' : ' m-r-12']"
          :src="
            doc.img
              ? doc.img.includes('http')
                ? doc.img
                : `${$baseURL}/${doc.img}`
              : userPic
          "
        />
        <ul class="flex-column">
          <li class="name align-center m-b-8">
            <span class="m-r-8 color333">{{ doc.user }}</span>
          </li>
          <li
            class="msg-txt-box d-flex"
            v-long-press="() => recallMessage(doc)"
          >
            <component
              v-if="[2, 4, 8, 13].includes(+doc.type)"
              :is="currentComponent(+doc.type)"
              :userPic="userPic"
              :doc="doc"
              ref="$component"
            ></component>
            <template v-else>
              <p
                class="msg-txt p-x-8 m-t-4"
                v-if="[10, 13].includes(+doc.type)"
                v-html="highlightedText(doc.data?.msg)"
              ></p>
              <p class="msg-txt p-x-8 m-t-4" v-else>
                {{ doc.data }}
              </p>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import userPic from "@/assets/img/user-room.png";
import bindBuy from "@/views/chat/components/bindBuy.vue";
import redImg from "@/views/chat/components/redImg.vue";
import imgMsg from "@/views/chat/components/imgMsg.vue";
import repalyMsg from "@/views/chat/components/repalyMsg.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userPic,
      actions: [
        { text: "撤回", value: 1, disabled: false },
        { text: "回复", value: 2, disabled: false },
      ],
    };
  },
  components: {
    bindBuy,
    redImg,
    imgMsg,
    repalyMsg,
  },
  computed: {
    popoverDisabled() {
      if (![0, 8, 10, 13].includes(+this.doc.type)) {
        return true;
      }
      return this.disabled;
    },
    countActions() {
      return this.actions.filter((v) => !v.disabled);
    },
    isMe() {
      return this.doc.playerId === this.user.id;
    },
    user() {
      return this.$store.state.user;
    },
    doc() {
      let data;
      try {
        data = JSON.parse(this.item.data);
      } catch (error) {
        data = this.item.data;
      }
      return {
        ...this.item,
        data,
      };
    },
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions("chat", [
      "initWebSocket",
      "closeWebSocket",
      "sendMessage",
      "fetchHistory",
    ]),
    comfire(v) {
      return new Promise((resolve) => {
        this.$dialog
          .confirm({
            message: v,
            confirmButtonColor: "#3291FF",
          })
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async recallMessage(doc) {
      //time 1739257809520 两分钟内才能撤回
      if (new Date().getTime() - doc.time > 120000) return;
      if (!this.isMe) return;
      const status = await this.comfire("是否撤回消息");
      if (!status) return;
      console.log("recallMessage", doc);
      this.sendMessage({
        type: 9,
        data: JSON.stringify({ id: doc.id }),
      });
    },
    visib() {
      if (this.$refs.$component?.visib) {
        this.$refs.$component?.visib();
      }
    },
    currentComponent(type) {
      switch (type) {
        case 2:
          //合买
          return "bindBuy";
        case 4:
          //红包
          return "redImg";
        case 8:
          //图片
          return "imgMsg";
        case 13:
          //回复
          return "repalyMsg";
        default:
          return "redImg";
      }
    },
  },
};
</script>
<style lang="scss">
.my-msg {
  justify-content: flex-end;
  //翻转
  //flex-direction: row-reverse;
  .room-msg {
    flex-direction: row-reverse;
  }
  .name {
    justify-content: flex-end !important;
  }
  .msg-txt {
    text-align: right;
  }
  .msg-txt-box {
    justify-content: flex-end;
    user-select: none; /* 禁止选中文本 */
    -webkit-user-select: none; /* 兼容 iOS & Safari */
    -webkit-touch-callout: none; /* 禁止长按弹出菜单 */
  }
}
.room-msg {
  color: #000;
  .user-pic {
    width: 76px;
    height: 76px;
  }
  .name {
    color: #999999;
    &,
    span {
      line-height: 1;
    }
  }
  .msg-txt {
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;
    border: 2px solid #f0f0f0;
    display: inline-flex;
  }
}
.time-box {
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
</style>
