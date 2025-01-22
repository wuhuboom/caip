<template>
  <el-dialog
    class="RechargeDialog font12"
    title="充值"
    :visible.sync="show"
    append-to-body
    width="510px"
  >
    <div class="contDialog">
      <ul class="center-center nav font14">
        <li
          class="flex-1 center-center"
          :class="{ active: +item.id === id }"
          v-for="item in navs"
          :key="item.id"
          @click="changeId(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div v-if="id === 0">
        <div class="align-center">
          <div class="nav-left m-t-12">
            <p class="nav-left-tip center-center">通道列表</p>
            <ul>
              <li
                class="p-x-8 center-center"
                v-for="item in rechargeList"
                :key="item.id"
                :class="{ active: +item.id === +chooseRecType.id }"
                @click="chose(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="flex-1 rit center-center">
            <ul>
              <li v-if="chooseRecType.minMax">
                金额区间:
                <span>{{
                  `${chooseRecType.minMax ? chooseRecType.minMax : ""}`
                }}</span>
              </li>
              <li class="center-center m-t-20 m-b-16 m-r-16">
                充值金额:
                <el-input
                  class="enter-money m-l-12"
                  v-model.trim="money"
                  @blur="changeMoney"
                ></el-input>
              </li>
              <li>
                <p class="next center-center" @click="onSubmit">下一步</p>
              </li>
            </ul>
          </div>
        </div>
        <ul class="m-t-16">
          <li
            class="m-b-8"
            v-for="(item, index) in rechargeInstructions"
            :key="index"
            :class="{ yellow: [1, 2, 3, 4].includes(index) }"
          >
            {{ index + 1 }}.{{ item }}
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="p-t-24">
          <li class="m-b-16">币种: tcr20-usdt</li>
          <li class="align-start m-b-16">
            充值数量(usdt):
            <div>
              <div class="align-center">
                <el-input
                  class="enter-money m-l-12 no-grow"
                  v-model.trim="money"
                  @blur="changeMoney"
                ></el-input>
                <span class="m-l-12">U</span>
              </div>
              <div class="m-t-8 font12" v-if="uMinMax">
                <p class="m-b-4">
                  单笔充值限额:最低{{ uMinMax[0] }}个，最高{{ uMinMax[1] }}个
                </p>
                <p>每天充值限额:15000个</p>
              </div>
            </div>
          </li>
          <li class="m-b-16">
            实时汇率:<span class="m-l-12 yellow">1U={{ usdtPay.rate }}元</span>
          </li>
          <li class="m-b-16">
            预计到账:<span class="m-l-12">{{ total }}元</span>
          </li>
          <li class="m-b-16 center-center">
            <p class="next center-center" @click="onSubmit">下一步</p>
          </li>
          <li class="font12">
            <p class="m-b-8">
              1、请确认转U过程中U数量一致并且币种相同，否则无法自动到账
            </p>
            <p class="m-b-8">
              2、请在有效期时间内完成转币，超过转账时间请勿转账。
            </p>
            <p class="m-b-8">
              3、若您首次使用USDT充值，请查看U充值教程或联系在线客服。
            </p>
          </li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
export default {
  data() {
    return {
      show: false,
      navs: [
        {
          name: "在线充值",
          id: 0,
        },
        {
          name: "USDT快充",
          id: 1,
        },
      ],
      id: 0,
      rechargeList: [],
      chooseRecType: {},
      money: "",
      rechargeInstructions: [
        "请使用手机银行APP进行充值。",
        "每次充值都需要进入充值通道获取相应的银行卡号和充值金额，切勿直接转账。",
        "会员充值必须按照当笔充值所获取银行卡转账，切勿转账至保存转账记录的银行卡。",
        "银行卡转账户名需要与提款银行卡绑定户名一致，切勿找他人代充。",
        "转账金额必须与充值所获取的金额一致，切勿转入错误金额。",
        "转账成功30分钟如还未到账，请联系客服提供相关证明，如48小时内未反应，客服将不再受理。如未按照以上规定导致充值未到账的会员，后果将由本人承担。",
      ],
      loading: false,
      usdtPay: {},
    };
  },
  computed: {
    minMax() {
      if (this.id === 1) {
        return this.uMinMax;
      }
      if (!this.chooseRecType.minMax) return "";
      return this.chooseRecType.minMax.split("-").map((v) => +v);
    },
    uMinMax() {
      if (!this.usdtPay.minMax) return "";
      return this.usdtPay.minMax.split("-").map((v) => +v);
    },
    total() {
      if (this.money) {
        return (this.money * this.usdtPay.rate).toFixed(2);
      }
      return "";
    },
  },
  methods: {
    async onSubmit() {
      if (!this.money) {
        this.$message.error("请输入金额");
        return;
      }
      if (this.minMax.length) {
        if (this.money < this.minMax[0] || this.money > this.minMax[1]) {
          this.$message.error(`金额在${this.minMax[0]}-${this.minMax[1]}之间`);
          return;
        }
      }
      this.loading = true;
      const [err, res] = await userApi.rechargeOrder({
        payId: this.id === 0 ? this.chooseRecType.id : this.usdtPay.id,
        money: +this.money,
      });
      this.loading = false;
      if (err) {
        return;
      }
      if (res.data.UrlAddress) {
        window.location.href = res.data.UrlAddress;
      }
    },
    changeMoney() {
      this.money = this.money.replace(/[^\d]/g, "");
      if (this.money) {
        this.money = parseInt(this.money);
        return;
      }
      this.money = "";
    },
    chose(item) {
      if (!item) return;
      for (let k in item) {
        this.$set(this.chooseRecType, k, item[k]);
      }
      //this.amount = this.chooseRecType.def;
    },
    comfire() {
      return new Promise((resolve) => {
        this.$confirm("请联系人工客服", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: "g-confirm-box",
        })
          .then(() => {
            this.$store.dispatch("getServeData", 1);
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async recharge() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const [err, res] = await userApi.recharge();
      if (err) return;
      this.$toast.clear();
      if (!res.data || !res.data.length) {
        this.comfire();
        setTimeout(() => {
          this.show = false;
        }, 0);
        return;
      }
      this.rechargeList = res.data.filter((item) => +item.type !== 3);
      this.usdtPay = res.data.find((item) => +item.type === 3) || {};
      if (!this.rechargeList.length) return;
      this.chose(this.rechargeList[0]);
    },
    changeId(id) {
      if (+id === 1 && !this.usdtPay.id) {
        this.$message.error("暂未开放");
        return;
      }
      this.money = "";
      this.id = id;
    },
    async open(id = 0) {
      await this.recharge();
      this.show = true;
      this.id = id;
    },
  },
};
</script>

<style scoped lang="scss">
.align-start {
  display: flex;
  align-items: flex-start;
}
.yellow {
  color: #feedaf;
}
.nav-left {
  border-right: 1px solid #b78756;
  li {
    cursor: pointer;
  }
  .active {
    color: #feedaf;
  }
}
.nav-left-tip {
  height: 40px;
  border-bottom: 1px solid #b78756;

  min-width: 112px;
}
.rit {
  //文字不换行
  white-space: nowrap;
  color: #feedaf;
}
.next {
  cursor: pointer;
  width: 192px;
  height: 28px;
  color: #feedaf;
  background: linear-gradient(274deg, #c67d30 0%, #daa42a 53%, #c77c32 100%);
  border-radius: 0px 0px 0px 0px;
}
.enter-money {
  width: 102px;
  ::v-deep {
    .el-input__inner {
      width: 102px;
      height: 23px;
      background: #ffffff;
      border-radius: 12px 12px 12px 12px;
      padding: 0 8px;
      color: #333;
      &:hover {
        border: none;
      }
    }
  }
}
.contDialog {
  color: #ffffff;
  .nav {
    color: #feedaf;
    border: 1px solid #bf855d;
    background-color: #32160b;

    li {
      height: 36px;
      &.active {
        background-color: #8c2e2f;
      }
    }
    & > li:nth-child(2) {
      border-left: 1px solid #bf855d;
    }
  }
}
.RechargeDialog {
  .gold {
    color: #feedaf;
  }
  ::v-deep {
    .el-icon-close {
      color: #feedaf;
    }
    .el-dialog__title {
      color: #feedaf;
    }
    [role="dialog"] {
      background-color: #774230;
      color: #ffffff;
    }
  }
}
.nav-left {
}
</style>
