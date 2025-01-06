<template>
  <div class="d-flex" :class="{ 'my-msg': doc.playerId === user.id }">
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
        <li class="name align-center">
          <span class="m-r-8">{{ doc.user }}</span>
          <span>{{ $dayjsTime(doc.time) }}</span>
        </li>
        <li class="msg-txt-box d-flex">
          <component
            v-if="[2].includes(+doc.type)"
            :is="currentComponent(+doc.type)"
            :userPic="userPic"
            :doc="doc"
          ></component>
          <p class="msg-txt p-x-8 m-t-4" v-else>{{ doc.data }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userPic from "@/assets/img/user-room.png";
import bindBuy from "@/views/chat/components/bindBuy.vue";
import redImg from "@/views/chat/components/redImg.vue";
export default {
  data() {
    return { userPic };
  },
  components: {
    bindBuy,
    redImg,
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
    currentComponent(type) {
      switch (type) {
        case 2:
          return "bindBuy";
        // 默认情况
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
