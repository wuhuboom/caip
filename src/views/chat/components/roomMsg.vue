<template>
  <div
    class="d-flex"
    :class="{
      'my-msg': doc.playerId === user.id,
      'center-center': doc.status == 1,
    }"
  >
    <ul
      v-if="doc.status == 1"
      class="center-center flex-column m-t-12 m-b-12 font14 color999"
    >
      <li class="m-b-4">{{ $dayjsTime(doc.time) }}</li>
      <li>
        {{ isMe ? "你撤回了一条消息" : `${doc.user}撤回了一条消息` }}
      </li>
    </ul>
    <div v-else class="room-msg p-l-24 p-l-24 d-flex m-b-12">
      <img
        class="d-img user-pic"
        :class="[doc.playerId === user.id ? 'm-l-12 m-r-24' : ' m-r-12']"
        :src="
          doc.img
            ? doc.img.includes('http')
              ? doc.img
              : `${$baseURL}/${doc.img}`
            : userPic
        "
      />
      <ul class="flex-column">
        <li class="name align-center">
          <span class="m-r-8">{{ doc.user }}</span>
          <span>{{ $dayjsTime(doc.time) }}</span>
        </li>
        <li class="msg-txt-box d-flex">
          <div @contextmenu="recallMessage($event, doc)">
            <component
              v-if="[2, 4, 8].includes(+doc.type)"
              :is="currentComponent(+doc.type)"
              :userPic="userPic"
              :doc="doc"
              ref="$component"
            ></component>
            <p class="msg-txt p-x-8 m-t-4" v-else>
              {{ doc.data }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import userPic from "@/assets/img/user-room.png";
import bindBuy from "@/views/chat/components/bindBuy.vue";
import redImg from "@/views/chat/components/redImg.vue";
import imgMsg from "@/views/chat/components/imgMsg.vue";
export default {
  data() {
    return { userPic };
  },
  components: {
    bindBuy,
    redImg,
    imgMsg,
  },
  computed: {
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
        this.$confirm(v, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "g-confirm-box",
        })
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async recallMessage(event, doc) {
      event.preventDefault();
      //time 1739257809520 两分钟内才能撤回
      if (new Date().getTime() - doc.time > 120000) return;
      if (!this.isMe) return;
      const status = await this.comfire("是否撤回消息？");
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
          return "bindBuy";
        case 3:
          return "redImg";
        case 8:
          return "imgMsg";
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
  }
}
.room-msg {
  color: #000;
  .user-pic {
    width: 38px;
    height: 38px;
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
    border-radius: 5px 5px 5px 5px;
    border: 1px solid #f0f0f0;
    display: inline-flex;
  }
}
</style>
