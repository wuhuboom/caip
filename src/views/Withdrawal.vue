<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="提现">
      <template v-slot:right>
        <div class="right-box" @click="$router.push('/WithdrawRecord')">
          提现记录
        </div>
      </template>
    </AppTopBar>

    <!-- 提现 未绑定 -->
    <template v-if="0">
      <div class="ye-box">
        可提现余额
        <div class="on">1000.00元</div>
      </div>
      <div class="bd-box">
        <div class="lists">
          <div class="left">
            <van-icon name="plus" class="plus-icon" />
            <div class="name">绑定银行卡</div>
          </div>
          <div class="right">
            <van-icon name="arrow" class="arrow-icon" />
          </div>
        </div>
        <div class="lists">
          <div class="left">
            <van-icon name="plus" class="plus-icon" />
            <div class="name">绑定微信</div>
          </div>
          <div class="right">
            <van-icon name="arrow" class="arrow-icon" />
          </div>
        </div>
        <div class="lists">
          <div class="left">
            <van-icon name="plus" class="plus-icon" />
            <div class="name">绑定支付宝</div>
          </div>
          <div class="right">
            <van-icon name="arrow" class="arrow-icon" />
          </div>
        </div>
      </div>
    </template>

    <!-- 提现 已绑定 -->
    <template>
      <div class="yh-box">
        <div class="gh-box" @click="resData(bankCard)" v-if="bankCard.id">
          <div class="left">
            <div class="yuan">
              <img
                class="d-img"
                src="@/assets/img/Recharge/yinhang.png"
                alt=""
              />
            </div>
            <div class="info">
              <div class="i-1">{{ bankCard.bankName }}</div>
              <div class="i-2">
                **** **** ****{{ bankCard.cardNumber.slice(-4) }}
              </div>
            </div>
          </div>
          <div class="right">
            <van-icon
              name="checked"
              v-if="form.id === bankCard.id"
              class="check-icon"
              :size="24"
            />
            <van-icon v-else name="circle" :size="24" class="check-icon" />
          </div>
        </div>
        <div class="gh-box" v-if="usdtCard.id" @click="resData(usdtCard)">
          <div class="left">
            <div class="yuan">
              <img class="d-img" src="@/assets/img/Recharge/usdt.png" alt="" />
            </div>
            <div class="info">
              <div class="i-1">{{ usdtCard.bankName }}</div>
              <div class="i-2">
                **** **** ****{{ usdtCard.cardNumber.slice(-4) }}
              </div>
            </div>
          </div>
          <div class="right">
            <van-icon
              name="checked"
              v-if="form.id === usdtCard.id"
              class="check-icon"
              :size="24"
            />
            <van-icon :size="24" v-else name="circle" class="check-icon" />
          </div>
        </div>
      </div>
      <div class="tx-box">
        <div class="item">
          可提现余额
          <div class="on">{{ divide(user.balance) }}元</div>
        </div>
        <div class="item">
          提现金额
          <input
            type="text"
            class="input"
            placeholder="请输入提款金额"
            v-model.trim="form.money"
          />
        </div>
        <div class="item">
          支付密码
          <input
            type="text"
            class="input"
            placeholder="请输入支付密码"
            v-model.trim="form.payPwd"
          />
        </div>
      </div>
      <div class="btn-box center-center" @click="ajaxBindCard">确定</div>
      <div class="ts-box">
        <div class="content-box">
          <div class="tips">
            <van-icon name="info" class="tips-icon" />
            温馨提示
          </div>
          <div class="li">1.每天提现限制3次</div>
          <div class="li">2.提现时间早上10点到晚上10点</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import userApi from "@/api/user";
const initForm = () => {
  return {
    ctype: 2,
    cardName: "",
    identity: "",
    cardNumber: "",
    bankName: "",
    subBranch: "",
  };
};
export default {
  name: "AppWithdrawal",
  data() {
    return {
      form: initForm(),
    };
  },
  computed: {
    statusCheck() {
      return [
        { name: `您的${this.bankTxt}还在审核中,请审核通过再提现`, id: 0 },
        { name: `审核通过`, id: 1 },
        { name: `您的${this.bankTxt}审核不通过,无法提现`, id: 2 },
      ];
    },
    bankTxt() {
      return this.ctype === 2 ? "银行卡" : "USDT地址";
    },
    user() {
      return this.$store.state.user;
    },
    Cards() {
      return this.$store.state.bankCard;
    },
    bankCard() {
      const doc = this.Cards.find((v) => +v.ctype === 2) || {};
      return doc;
    },
    usdtCard() {
      return this.Cards.find((v) => +v.ctype === 3) || {};
    },
  },
  methods: {
    resData(obj) {
      this.form = {
        ...initForm(),
        ...obj,
        usdtId: obj.id,
        type: obj.ctype,
        money: "",
        payPwd: "",
      };
    },
    async ajaxBindCard() {
      if (+this.form.statusCheck !== 1) {
        const msg =
          this.statusCheck.find((v) => +v.id === +this.form.statusCheck) || {};
        this.$toast(msg.name);
        return;
      }
      //金额必须正整数
      if (!/^[1-9]\d*$/.test(this.form.money)) {
        this.$toast.fail("提现金额必须为正整数");
        return;
      }
      //支付密码必须为6位数字
      if (!/^\d{6}$/.test(this.form.payPwd)) {
        this.$toast.fail("支付密码必须是6位数字");
        return;
      }
      this.$toast.loading({ duration: 0 });
      const [err] = await userApi.withdrawalReq({
        ...this.form,
      });
      if (err) return;
      this.$toast.clear();
      this.$store.dispatch("getBankCard");
      this.$toast.success("提现成功.等待管理员审核");
      this.$router.back();
    },
  },
  async created() {
    this.$store.dispatch("getInfo");
    this.$toast.loading({ duration: 0 });
    await this.$store.dispatch("getBankCard");
    this.$toast.clear();
    if (this.bankCard.id) {
      this.resData(this.bankCard);
    } else if (this.usdtCard.id) {
      this.resData(this.usdtCard);
    }
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
.ye-box {
  padding: 30px 28px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  .on {
    margin-left: 20px;
    color: #bf2935;
  }
}
.bd-box {
  margin-top: 20px;
  background: #fff;
  .lists {
    border-bottom: 1px solid #f9f9f9;
    padding: 28px 22px;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      color: #666666;
      .plus-icon {
        margin-right: 8px;
        font-size: 40px;
        color: #666666;
      }
    }
    .right {
      .arrow-icon {
        font-size: 40px;
        color: #ccc;
      }
    }
  }
}
.yh-box {
  background: #fff;
  .khm-box {
    padding: 28px 28px;
    border-bottom: 1px solid #e5e5e5;
  }
  .gh-box {
    padding: 24px 28px;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .yuan {
        width: 80px;
        height: 80px;
        border-radius: 100%;
      }
      .info {
        margin-left: 16px;
        .i-2 {
          font-size: 24px;
          color: #999999;
        }
      }
    }
    .right {
      .arrow-icon {
        font-size: 36px;
        color: #ccc;
      }
    }
  }
}
.tx-box {
  margin-top: 20px;
  background: #fff;
  .item {
    padding: 30px 28px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    .on {
      color: #bf2935;
      margin-left: 20px;
    }
    .input {
      margin-left: 20px;
      border: none;
      outline: none;
    }
  }
}
.btn-box {
  width: 694px;
  height: 88px;
  background: #bf2935;
  border-radius: 126px 126px 126px 126px;
  color: #fff;
  font-size: 32px;
  margin: 0 auto;
  margin-top: 56px;
}
.ts-box {
  padding: 32px 28px;
  margin-top: 40px;
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
.check-icon {
  color: #bf2935 !important;
}
</style>
