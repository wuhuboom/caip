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
          <div class="order-detail" @click="goDetail" v-if="doc.type == 2">
            <p class="align-center">
              <img class="d-img m-r-4 ord" src="@/assets/img/ord.png" alt="" />
              #{{ doc.data.lottery }}
            </p>
            <div class="detail m-l-8 m-t-8 flex-column">
              <dl class="oder-desc d-flex justify-between p-l-8 p-r-8">
                <dd class="align-center">
                  <img
                    class="d-img m-r-4 fire"
                    src="@/assets/img/fire.png"
                    alt=""
                  />
                  {{ doc.data.user }}#发起合买
                </dd>
                <dd class="money">￥{{ divide(doc.data.money) }}</dd>
              </dl>
              <dl class="justify-between p-l-8 p-r-8">
                <dd>
                  <p class="rate align-center">
                    <span class="rate-num">{{
                      `${doc.data.bingos * 100}%`
                    }}</span>
                  </p>
                </dd>
                <dd>
                  <p class="now-btn center-center">立即跟</p>
                </dd>
              </dl>
            </div>
          </div>
          <p class="msg-txt p-x-8 m-t-4" v-else>{{ doc.data }}</p>
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
    goDetail() {
      //window.open(`#/order/detail/${this.doc.data.id}`);
      this.$router.push(`/order/detail/${this.doc.data.id}`);
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
.order-detail {
  cursor: pointer;
  width: 250px;
  height: 120px;
  background: #ffffff;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #f0f0f0;
  padding: 14px 10px 14px;
  .ord {
    width: 18px;
    height: 18px;
  }
  .fire {
    width: 17px;
    height: 17px;
  }
  .detail {
    color: #fff;
    width: 221px;
    height: 70px;
    background: #00a752;
    border-radius: 5px 5px 5px 5px;

    justify-content: space-around;
  }
  .oder-desc {
    align-items: flex-end;
    font-size: 14px;
  }
  .money {
    font-size: 18px;
  }
  .rate {
    background: url("@/assets/img/rates.png") no-repeat center center;
    background-size: 100% 100%;
    width: 54px;
    height: 12px;
    font-size: 8px;
    color: #bf2935;
    padding-bottom: 2px;
    .rate-num {
      min-width: 28px;
      text-align: center;
    }
  }
  .now-btn {
    color: #03bf5f;
    width: 54px;
    height: 18px;
    background: #ffffff;
    border-radius: 5px 5px 5px 5px;
    font-size: 10px;
  }
}
</style>
