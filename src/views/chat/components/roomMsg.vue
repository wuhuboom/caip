<template>
  <div>
    <div class="center-center time-box p-t-24 p-b-24">
      <p class="time">{{ $dayjsTime(doc.time) }}</p>
    </div>
    <div
      class="d-flex"
      style="overflow: hidden"
      :class="{ 'my-msg': doc.playerId === user.id }"
    >
      <div class="room-msg p-l-24 p-l-24 d-flex m-b-12">
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
          <li class="name align-center m-b-8">
            <span class="m-r-8 color333">{{ doc.user }}</span>
          </li>
          <li
            class="msg-txt-box d-flex"
            v-long-press="() => recallMessage(doc)"
          >
            <component
              v-if="[2, 4, 8].includes(+doc.type)"
              :is="currentComponent(+doc.type)"
              :userPic="userPic"
              :doc="doc"
              ref="$component"
            ></component>
            <p class="msg-txt p-x-8 m-t-4" v-else>{{ doc.data }}</p>
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
import { mapActions } from "vuex";
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
      const status = await this.comfire("是否撤回消息");
      if (!status) return;
      this.sendMsg({
        type: 1,
        data: JSON.stringify({
          type: 1,
          data: doc.id,
        }),
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
