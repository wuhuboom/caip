<template>
  <van-popup class="bind-bet-pop" v-model="show" position="bottom">
    <div class="font12">
      <ul class="title-bets center-center p-l-24 p-r-24">
        <li class="font12">
          <span class="color999">账户余额:</span> {{ divide(user.balance) }}
        </li>
        <li class="font16">跟投计划</li>
        <li @click="show = false"><van-icon name="cross" :size="16" /></li>
      </ul>
      <div class="p-l-24 p-r-24">
        <ul class="detail-msg">
          <li>
            <div class="justify-between p-b-24 color999">
              <div class="align-center">
                <img
                  v-if="isCna"
                  class="d-img beting m-r-16"
                  src="@/assets/img/beting-sign.png"
                  alt=""
                />
                <p>{{ detail.expect }}期</p>
              </div>
              <div v-if="detail.lottery?.nextExpect.countdown">
                <div>距离截止时间</div>
                <div>
                  <van-count-down
                    @finish="openFish"
                    :time="detail.lottery?.nextExpect.countdown * 1000"
                  >
                    <template #default="timeData">
                      <div class="timeData d-flex">
                        <span class="block center-center">{{
                          timeData.hours >= 10
                            ? timeData.hours
                            : `0${timeData.hours}`
                        }}</span>
                        <span class="colon center-center">:</span>
                        <span class="block center-center">{{
                          timeData.minutes >= 10
                            ? timeData.minutes
                            : `0${timeData.minutes}`
                        }}</span>
                        <span class="colon center-center">:</span>
                        <span class="block center-center">{{
                          timeData.seconds >= 10
                            ? timeData.seconds
                            : `0${timeData.seconds}`
                        }}</span>
                      </div>
                    </template>
                  </van-count-down>
                </div>
              </div>
            </div>
            <p class="p-b-24 font14">{{ detail.lottery?.lotteryName }}</p>
            <p
              class="p-b-24 align-center"
              v-for="(item, index) in betCode"
              :key="index"
            >
              <span class="no-shrink m-r-16">{{ item.name }}</span>
              <span class="x-auto flex-1" style="white-space: nowrap">
                {{
                  item.positions?.map((subArr) => subArr.join(", ")).join("|")
                }}</span
              >
            </p>
          </li>
        </ul>
        <ul class="justify-between stepper align-center m-t-24">
          <li class="flex-1">
            <van-field
              v-model="detail.clientMoney"
              type="number"
              placeholder="请输入金额"
            />
            <!-- <van-stepper
              v-model="detail.clientMoney"
              min="1"
              :max="detail.sellCount"
              :show-plus="false"
              :show-minus="false"
            /> -->
          </li>
        </ul>
      </div>
      <ul class="center-center money-list">
        <!-- <li class="center-center m-r-32">
          共<span class="m-l-4 m-r-4 reds">{{ quantity }}</span
          >注
        </li> -->
        <li class="center-center">
          总金额<span class="m-l-4 m-r-4 reds">¥{{ divide(detail.money) }}</span
          >元
        </li>
      </ul>
      <ul class="p-x-32 justify-around buy-btm font14">
        <li class="flex-column center-center" @click="buyPlayer('all')">
          <p>剩余:{{ detail.sellCount }}元</p>
          <p>全包</p>
        </li>
        <li
          @click="buyPlayer(detail.clientMoney)"
          class="center-center"
          :class="{
            ends: !isCna,
          }"
        >
          {{ !isCna ? "已结束" : "直接下注" }}
        </li>
      </ul>
    </div>
    <tipsDialog ref="$tipsDialog" />
    <tipsDialog ref="$buyDialog" @sure="mySure" />
    <tipsDialog ref="$canAllDialog" @sure="ALLSure" />
    <tipsDialog ref="$canOneDialog" @sure="OneSure" />
  </van-popup>
</template>

<script>
import userApi from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "bindBetPop",
  data() {
    return {
      show: false,
      id: null,
      detail: {},
      expect: "",
      shareData: {
        // chatAble
        // recharge 3000
      },
    };
  },
  computed: {
    ...mapGetters(["catList"]),
    betCode() {
      console.log(this.detail);
      if (this.detail.betCode) {
        return this.$util.parseFourStarInput(this.detail.betCode);
      }
      return [];
    },
    quantity() {
      // 遍历 betCode。quantity;
      console.log(this.betCode);
      return this.betCode.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0);
    },
    user() {
      return this.$store.state.user;
    },
    theOne() {
      return this.$store.state.theOne;
    },
    cat() {
      return [...this.$store.state.cat];
    },
    curCat() {
      let catData = {};
      this.cat.forEach((v) => {
        v.list.forEach((c) => {
          if (+c.id === +this.detail.lotteryId) {
            catData = v;
          }
        });
      });
      return catData;
    },
    isMe() {
      return +this.user.id === +this.detail?.playerId;
    },
    isCna() {
      return this.detail.sellCount && +this.detail.status === 0;
    },
  },
  methods: {
    async openFish() {
      await Promise.all([this.getDetail(), this.chat()]);
    },
    async open(v) {
      this.id = v;
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      await Promise.all([this.getDetail(), this.chat()]);
      this.show = true;
      this.$toast.clear();
    },
    countPrice(item) {
      if (this.theOne.includes(item.name)) {
        return item.price;
      }
      return item.quantity * item.multiplier * item.price;
    },
    copy(v) {
      navigator.clipboard.writeText(v).then(() => {
        this.$toast("复制成功");
      });
    },
    getOpenStatus(v) {
      const item = this.$store.state.openStatus.find((d) => d.id === v);
      return item ? item.name : "";
    },
    async cancelAll() {
      this.$refs.$canAllDialog.open("确定要撤销吗？");
    },
    async ALLSure() {
      const [err] = await userApi.cancelTogether({
        id: this.id,
      });
      if (err) return;
      this.$toast.success("撤销成功");
      this.getDetail();
    },
    async cancel(expect) {
      this.expect = expect;
      this.$refs.$canOneDialog.open("确定要撤销吗？");
    },
    async OneSure() {
      const [err] = await userApi.lotteryMyOrderCancelRe2({
        expect: this.expect,
        id: this.id,
      });
      if (err) return;
      this.$toast.success("撤销成功");
      this.getDetail();
    },
    onCopySuccess() {
      this.$toast.success("复制链接成功");
    },
    getName(id) {
      const item = this.catList.find((v) => v.id === id);
      return item ? item.lotteryName : "";
    },
    getOpen(v) {
      if (!v) return ["_", "_", "_", "", "_"];
      return v.split(",").filter((v) => v);
    },
    showContent(v) {
      //visibility 0公开 1仅对跟单者公开 2截止后公开 3永久保密
      if (v === 0) {
        return true;
      }
      if (v === 1) {
        return this.detail.joins.some((v) => v.playerId === this.user.id);
      }
      if (v === 2) {
        return +this.detail.status === 4;
      }
      return false;
    },
    getVisibility(v) {
      const docs = [
        {
          name: "公开",
          status: 0,
        },
        {
          name: "仅对跟单者公开",
          status: 1,
        },
        {
          name: "截止后公开",
          status: 2,
        },
        {
          name: "永久保密",
          status: 3,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    getBtype(v) {
      // 0 btype 是否保底0全保 1部分 2不保
      const docs = [
        {
          name: "全保保底",
          status: 0,
        },
        {
          name: "部分保底",
          status: 1,
        },
        {
          name: "不保底",
          status: 2,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    getReType(v) {
      // 0 无追号 1中奖停 2中奖不停
      const docs = [
        {
          name: "无追号",
          status: 0,
        },
        {
          name: "中奖停",
          status: 1,
        },
        {
          name: "中奖不停",
          status: 2,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    validateInput(item, v) {
      let value = v.target.value.replace(/\D/g, "");
      if (value) {
        const numericValue = parseInt(value, 10);
        value = Math.min(Math.max(numericValue, 1), item.sellCount);
      }
      item.clientMoney = value;
    },
    buyPlayer(price) {
      if (!this.isCna) {
        this.$toast("合买已结束");
        return;
      }
      if (!price) {
        this.$refs.$tipsDialog.open("请输入购买金额");
        return;
      }
      if (price === "all") {
        this.detail.clientMoney = this.detail.sellCount;
        this.$refs.$buyDialog.open(
          `全包金额: ${this.detail.clientMoney}元，确定全包?`
        );
        return;
      }

      if (price > this.detail.sellCount) {
        this.$refs.$tipsDialog.open("购买金额不能大于剩余金额");
        return;
      }
      this.$refs.$buyDialog.open(`认购金额：￥${this.detail.clientMoney}`);
    },
    getExpects(v) {
      return (this.$store.state.openStatus.find((doc) => doc.id === v) || {})
        .name;
    },
    getStatus(v) {
      return (this.$store.state.status.find((doc) => doc.id === v) || {}).name;
    },
    btmStatus(v) {
      return (this.$store.state.btmStatus.find((doc) => doc.id === v) || {})
        .name;
    },
    async chat() {
      const [err, res] = await userApi.chat();
      if (err) return;

      this.shareData = res.data;
    },
    async mySure() {
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      const [err] = await userApi.lotteryBetsJoin({
        betId: this.detail.id,
        betCount: this.detail.clientMoney,
      });
      if (err) return;
      this.detail.clientMoney = "";
      this.$toast.success("购买成功");

      this.show = false;
    },
    async getDetail() {
      const [err, res] = await userApi.betsOrderDetail({
        id: this.id,
      });
      if (err) return;
      res.data.clientMoney = "";
      res.data.betCountCurr = res.data.betCountCurr / 100;
      res.data.betTotal = res.data.betTotal / 100;
      res.data.sellCount = res.data.betTotal - res.data.betCountCurr;
      res.data.betListArr = res.data.betCode
        ? this.$util.parseFourStarInput(res.data.betCode)
        : [];
      //res.data.clientMoney = res.data.sellCount;
      for (let key in res.data) {
        this.$set(this.detail, key, res.data[key]);
      }
    },
    comfire(v) {
      return new Promise((resolve) => {
        this.$dialog
          .confirm({
            message: v,
            confirmButtonColor: "#3291FF",
            className: "confirm-no-tile-dialog",
          })
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            resolve(0);
          });
      });
    },
    async shareToChatRoom() {
      if (+this.shareData.shareDisabled === 0) {
        this.$toast.fail(`分享已禁用`);
        return;
      }
      if (this.detail.status !== 0) {
        this.$toast("合买已结束，无法分享");
        return;
      }
      if (!this.shareData.chatAble) {
        this.$toast(`充值${this.shareData.recharge}才能解锁聊天`);
        return;
      }
      const status = await this.comfire("确定分享到聊天室吗？");
      if (!status) return;
      this.$toast.loading({
        forbidClick: false, // 允许点击和滚动
        duration: 0, // 持续时间为 0 表示不会自动关闭
      });
      const [err] = await userApi.lotteryBetsShare({
        id: this.id,
      });
      this.sleep(1000);
      this.$toast.clear();
      if (err) return;
      this.$toast.success("分享成功");
    },
  },
};
</script>
<style scoped lang="scss">
.bind-bet-pop {
  border-radius: 24px 24px 0px 0px;
}
.repaly-txt {
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  border: 2px solid #f0f0f0;
}
.replays {
  background-color: #f5f5f5;
}
.title-bets {
  width: 100%;
  height: 126px;
  border-bottom: 2px solid #e5e5e5;
  position: relative;
  margin-bottom: 36px;
  & > li:nth-child(1) {
    position: absolute;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
  }
  & > li:nth-child(3) {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.beting {
  width: 94px;
  height: 32px;
}
.timeData {
  justify-content: flex-end;
  color: #ff4d3e;
}
.detail-msg {
  border-bottom: 2px dashed #e5e5e5;
}
.stepper {
  margin-bottom: 300px;
  ::v-deep {
    .van-cell {
      background-color: #fafafa;
    }
  }
}

.money-list {
  height: 68px;
  background: #ffe0e2;
  .reds {
    color: #e50012;
  }
}
.buy-btm {
  color: #fff;
  & > li {
    width: 298px;
    height: 90px;
    background: #5d7aff;
    border-radius: 12px 12px 12px 12px;
  }
  & > li:last-child {
    background: #bf2935;
  }
  & > li.ends {
    background: #999999;
  }
}
</style>
