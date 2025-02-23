<template>
  <div class="order-detail m-t-4" @click.stop="goDetail">
    <p class="align-center">
      <img class="d-img m-r-4 ord" src="@/assets/img/ord.png" alt="" />
      #{{ doc.data.lottery }}
    </p>
    <div class="detail m-l-8 m-t-8 flex-column">
      <dl class="oder-desc d-flex justify-between p-l-8 p-r-8">
        <dd class="align-center">
          <img class="d-img m-r-4 fire" src="@/assets/img/fire.png" alt="" />
          {{ doc.data.user }}#发起合买
        </dd>
        <dd class="money">￥{{ divide(doc.data.money) }}</dd>
      </dl>
      <dl class="justify-between p-l-8 p-r-8">
        <dd>
          <p class="rate align-center">
            <span class="rate-num">{{ `${doc.data.bingos}%` }}</span>
          </p>
        </dd>
        <dd>
          <p class="now-btn center-center">立即跟</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
export default {
  name: "PopupMoney",
  data() {
    return {};
  },
  props: {
    doc: {
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
<style scoped lang="scss">
.order-detail {
  cursor: pointer;
  min-width: 250px;
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
