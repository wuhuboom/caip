<template>
  <van-popup class="bind-bet-pop" v-model="show" position="bottom">
    <ul class="title-bets center-center p-l-24 p-r-24 justify-between">
      <li class="font12">
        <span class="color999">账户余额:</span> {{ divide(user.balance) }}
      </li>
      <li class="font16">跟投计划</li>
      <li @click="show = false"><van-icon name="cross" :size="16" /></li>
    </ul>
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
  },
  methods: {
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
      if (price === "all") {
        this.detail.clientMoney = this.detail.sellCount;
        this.$refs.$buyDialog.open(
          `全包金额: ${this.detail.clientMoney}元，确定全包?`
        );
        return;
      }
      if (!price) {
        this.$refs.$tipsDialog.open("请输入购买金额");
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
      const [err] = await userApi.lotteryBetsJoin({
        betId: this.detail.id,
        betCount: this.detail.clientMoney,
      });
      if (err) return;
      this.detail.clientMoney = "";
      this.$toast.success("购买成功");
      this.getDetail();
    },
    async getDetail() {
      const [err, res] = await userApi.betsOrderDetail({
        id: this.id,
      });
      if (err) return;
      res.data.clientMoney = "";
      res.data.sellCount = res.data.betTotal - res.data.betCountCurr / 100;
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
      // this.$confirm("分享成功，是否查看聊天室消息?", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "success",
      //   customClass: "g-confirm-box",
      // })
      //   .then(() => {
      //     this.$router.push("/chat/room");
      //   })
      //   .catch(() => {});
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
  height: 126px;
  position: relative;
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
</style>
