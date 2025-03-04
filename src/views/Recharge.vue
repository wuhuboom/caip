<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="充值">
      <template v-slot:right>
        <div class="right-box" @click="$router.push('/RechargeRecord')">
          充值记录
        </div>
      </template>
    </AppTopBar>
    <ul class="recharge-up-list p-t-32 flex-wrap">
      <li
        v-for="(item, index) in rechargeList"
        :key="index"
        :class="{ on: catName === item.name }"
        @click="chose(item.list[0])"
        class="center-center"
      >
        <div class="flex-column center-center up-cont">
          <p class="pic p-x-16">
            <img :src="item.img || dMoney" class="d-img" />
            <img class="rit-re d-img" src="@/assets/img/rit-re.png" alt="" />
          </p>
          <p class="p-t-16 p-b-16">{{ item.name }}</p>
        </div>
      </li>
    </ul>
    <div class="p-x-16 m-t-24 font14 pay-btm-cont">
      <p class="m-b-24 font16">选择通道</p>
      <ul class="pay-list">
        <li
          class="m-b-16 p-x-24"
          v-for="(item, index) in payList"
          :key="index"
          @click="chose(item)"
          :class="{ on: chooseRecType.id === item.id }"
        >
          {{ showTxt(item) }}
        </li>
      </ul>
    </div>
    <!-- <div class="item-box p-t-24 p-b-24">
      <div class="left">账户余额</div>
      <div class="right on">{{ divide(user.balance) }}元</div>
    </div> -->
    <div class="cz-box p-l-16 p-r-16">
      <div class="item-box align-center font16">
        <div class="left">充值金额:</div>
        <div class="right flex-1">
          <van-field
            v-model.trim="amount"
            type="number"
            placeholder="请输入充值金额"
          >
          </van-field>
        </div>
      </div>
    </div>
    <ul class="p-l-16 p-r-16 m-t-16 font12">
      <li class="align-center m-b-" v-if="minMax">
        单笔充值金额最低<span class="red-color"
          >{{ minMax[0] }}{{ chooseRecType.currencySymbol }},</span
        >
        最高<span class="red-color"
          >{{ minMax[1] }}{{ chooseRecType.currencySymbol }}</span
        >
      </li>
      <li class="red-color">(手续费:0.00)</li>
    </ul>
    <div class="bottom-box">
      <div class="btn-box">
        <div class="btn center-center" @click="onSubmit">立即充值</div>
      </div>
    </div>
    <div class="ts-box p-l-16 p-r-16">
      <div class="content-box">
        <div class="tips">
          <van-icon name="info" class="tips-icon" />
          温馨提示
        </div>
        <div class="li">
          1.每次充值时，请获取最新的收款账户信息，禁止保存收款账户信息。
        </div>
        <div class="li">
          2.禁止使用之前的收款账户进行支付，因使用过期收款账户充值而导致的损失，平台概不负责。
        </div>
        <div class="li">
          3.使用本平台进行洗钱或诈骗活动的，平台有权终止会员服务并冻结相关账户。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import dMoney from "@/assets/img/d-money.png";
export default {
  name: "AppRecharge",
  data() {
    return {
      dMoney,
      amount: "",
      catName: "",
      rechargeList: [],
      chooseRecType: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    quickAmountList() {
      if (this.chooseRecType.fast) {
        return this.chooseRecType.fast.split("-");
      }
      return [];
    },
    minMax() {
      if (!this.chooseRecType.minMax) return "";
      return this.chooseRecType.minMax.split("-").map((v) => +v);
    },
    payList() {
      return (
        this.rechargeList.find((item) => item.name === this.catName)?.list || []
      );
    },
  },
  methods: {
    showTxt(item) {
      if (item.minMax) {
        const arr = item.minMax.split("-");
        return `${item.name}(${arr[0]}${item.currencySymbol}-${arr[1]}${item.currencySymbol})`;
      }
      return item.name;
    },
    chose(item) {
      this.amount = "";
      if (!item) return;
      this.catName = item.catName;
      for (let k in item) {
        this.$set(this.chooseRecType, k, item[k]);
      }
      if (this.quickAmountList.length) {
        this.amount = this.quickAmountList[0];
      } else if (this.minMax.length) {
        this.amount = this.minMax[0];
      }
    },
    async recharge() {
      const [err, res] = await userApi.recharge();
      if (err) return;
      this.rechargeList = res.data.filter((item) => item?.list?.length);
      this.rechargeList.forEach((item) => {
        item.list.forEach((v) => {
          v.catName = item.name;
        });
      });
      if (!this.rechargeList.length) return;
      this.chose(this.rechargeList[0].list[0]);
    },
    async onSubmit() {
      if (!this.amount) {
        this.$toast("请输入金额");
        return;
      }
      if (this.minMax.length) {
        if (this.amount < this.minMax[0] || this.amount > this.minMax[1]) {
          this.$toast(`金额在${this.minMax[0]}-${this.minMax[1]}之间`);
          return;
        }
      }
      this.$toast.loading({ duration: 0 });
      const [err, res] = await userApi.rechargeOrder({
        payId: this.chooseRecType.id,
        money: this.amount * 1,
      });
      if (err) {
        return;
      }
      this.$toast.clear();
      if (res.data.UrlAddress) {
        window.location.href = res.data.UrlAddress;
      }
    },
  },
  created() {
    this.$store.dispatch("getInfo");
    this.recharge();
  },
};
</script>
<style scoped lang="less">
.app-top-bar {
  .right-box {
    color: #fff;
    margin-right: 40px;
    font-size: 26px;
  }
}
.item-box {
  display: flex;
  background: #fff;
  .left {
  }
  .on {
    color: #bf2935;
  }
  .right {
    text-align: left;
    ::v-deep input {
      text-align: left;
    }
  }
}
.cz-box {
  margin-top: 20px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  .num-box {
    border-top: 1px solid #e5e5e5;
    padding-bottom: 26px;
    padding-left: 28px;
    display: flex;
    flex-wrap: wrap;
    .num {
      margin-top: 26px;
      margin-right: 26px;
      width: 154px;
      height: 68px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666666;
      border-radius: 12px 12px 12px 12px;
      border: 1px solid #666666;
      overflow: hidden;
      &.on {
        border: 1px solid #bf2935;
        color: #bf2935;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          right: -1px;
          bottom: -1px;
          width: 36px;
          height: 36px;
          background: url("@/assets/img/Recharge/gou.png") no-repeat;
          background-size: 100% auto;
        }
      }
    }
  }
}
.fs-box {
  background-color: #fff;
  margin-top: 20px;
  .item {
    margin-left: 28px;
    border-bottom: 1px solid #e5e5e5;
    padding: 22px 0;
    padding-right: 28px;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    &.on {
      .check-icon {
        color: #bf2935 !important;
      }
    }
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .on {
        font-size: 24px;
        color: #bf2834;
      }
      .zf-icon {
        width: 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        margin-right: 20px;
        &.zhifubao {
          background-image: url("@/assets/img/Recharge/zhifubao.png");
        }
        &.weixin {
          background-image: url("@/assets/img/Recharge/weixin.png");
        }
        &.yinhang {
          background-image: url("@/assets/img/Recharge/yinhang.png");
        }
      }
    }
    .right {
      .check-icon {
        font-size: 40px;
        color: #e5e5e5;
      }
    }
  }
}
.ts-box {
  padding: 32px 0;
  .content-box {
    background: #f3f3f3;
    border-radius: 10px 10px 10px 10px;
    padding: 16px 28px;
    font-size: 22px;
    color: #999999;
    .tips {
      display: flex;
      color: #c82834;
      align-items: center;
      margin-bottom: 12px;
      .tips-icon {
        margin-right: 12px;
        color: #c82834;
        font-size: 36px;
      }
    }
    .li {
      margin-top: 2px;
    }
  }
}
.bottom-box {
  margin-top: 38px;
  .btn-box {
    padding: 32px 28px;
    background: #f9f9f9;
    .btn {
      margin: 0 auto;
      width: 360px;
      height: 88px;
      border-radius: 126px 126px 126px 126px;
      background: #bf2935;
      font-size: 32px;
      color: #ffffff;
    }
  }
}
.recharge-up-list {
  & > li {
    width: 20%;
    .pic {
      width: 100px;
      height: 100px;
      position: relative;
    }
    .rit-re {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 32px;
      height: 32px;
    }
    &.on {
      .pic {
        border-radius: 8px 8px 8px 8px;
        border: 2px solid #bf2834;
      }
    }
  }
}
.pay-list {
  & > li {
    background: #f2f2f2;
    border-radius: 8px 8px 8px 8px;
    &.on {
      border: 2px solid #bf2834;
      background-color: transparent;
      color: #bf2834;
    }
  }
}
.red-color {
  color: #e50012;
}
.pay-btm-cont {
  background-color: #fff;
}
</style>
