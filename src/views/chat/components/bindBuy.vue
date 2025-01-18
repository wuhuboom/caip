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
            <span class="rate-num">{{ `${doc.data.bingos * 100}%` }}</span>
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
      this.$router.push(`/purchase-record-details?id=${this.doc.data.id}`);
    },
  },
};
</script>
<style scoped lang="scss">
.order-detail {
  cursor: pointer;
  min-width: 500px;
  height: 240px;
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  border: 2px solid #f0f0f0;
  padding: 28px 20px 28px;
  .ord {
    width: 36px;
    height: 36px;
  }
  .fire {
    width: 34px;
    height: 34px;
  }
  .detail {
    color: #fff;
    height: 140px;
    background: #00a752;
    border-radius: 10px 10px 10px 10px;

    justify-content: space-around;
  }
  .oder-desc {
    align-items: flex-end;
    font-size: 28px;
  }
  .money {
    font-size: 36px;
  }
  .rate {
    background: url("@/assets/img/rates.png") no-repeat center center;
    background-size: 100% 100%;
    width: 108px;
    height: 24px;
    font-size: 16px;
    color: #bf2935;
    padding-bottom: 4px;
    .rate-num {
      min-width: 56px;
      text-align: center;
    }
  }
  .now-btn {
    color: #03bf5f;
    width: 108px;
    height: 36px;
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;
    font-size: 20px;
  }
}
</style>
