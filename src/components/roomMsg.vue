<template>
  <div class="d-flex" :class="{ 'my-msg': item.playerId === user.id }">
    <div class="room-msg p-l-24 p-l-24 d-flex m-b-12">
      <img
        class="d-img user-pic"
        :class="[item.playerId === user.id ? 'm-l-12' : ' m-r-12']"
        :src="item ? userPic : ''"
      />
      <ul class="flex-column">
        <li class="name align-center">
          <span class="m-r-8">{{ item.user }}</span>
          <span>{{ $dayjsTime(item.time) }}</span>
        </li>
        <li class="msg-txt-box d-flex">
          <p class="msg-txt p-x-8 m-t-4">{{ item.data }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import userPic from "@/assets/img/user-room.png";
export default {
  data() {
    return { userPic };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {},
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
