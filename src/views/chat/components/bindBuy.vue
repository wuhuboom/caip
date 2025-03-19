<template>
  <div>
    <div class="my-group-buy" @click="goDetail">
      <p class="my-title center-center">{{ doc.data.lottery }}全天计划</p>
      <div class="conts font12">
        <p class="lottery font13 align-center">{{ doc.data.lottery }}</p>
        <ul class="list-txt expect expect-color">
          <li class="d-flex">
            <p>期号:</p>
            <p>{{ doc.data.expect }}</p>
          </li>
        </ul>
        <p class="center-center" v-if="!detail.id"><van-loading /></p>
        <template v-else>
          <ul
            class="bet-code list-txt expect-color"
            v-for="(item, index) in betCode.filter((v, k) => k == 0)"
            :key="index"
          >
            <li class="d-flex">
              <p>投注玩法:</p>
              <p class="x-auto no-wrap">
                {{
                  !detail.betCode ? getVisibility(detail.visibility) : item.name
                }}
              </p>
            </li>
            <li class="d-flex">
              <p class="no-shrink">投注内容:</p>
              <p class="x-auto no-wrap">
                {{
                  !detail.betCode
                    ? getVisibility(detail.visibility)
                    : item.positions?.map((subArr) => subArr.join("")).join("|")
                }}
              </p>
            </li>
          </ul>
          <ul class="bet-code list-txt expect-color" v-if="detail.myBetCount">
            <li class="d-flex">
              <p>投注金额:</p>
              <p class="x-auto no-wrap">
                {{ divide(detail.myBetCount / 100, false) }}元
              </p>
            </li>
          </ul>
        </template>
        <p class="user-list">计划无神,跟反自由</p>
        <p class="btns-bet center-center">我要跟投</p>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "PopupMoney",
  data() {
    return {
      show: true,
      detail: {},
    };
  },
  props: {
    doc: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    theOne() {
      return this.$store.state.theOne;
    },
    betCode() {
      if (this.doc.data.betCode) {
        return this.$util.parseFourStarInput(this.doc.data.betCode);
      }
      return [];
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    countPrice(item) {
      if (this.theOne.includes(item.name)) {
        return item.price;
      }
      return item.quantity * item.multiplier * item.price;
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
    btmStatus(v) {
      return (this.$store.state.btmStatus.find((doc) => +doc.id === +v) || {})
        .name;
    },
    goDetail() {
      console.log(this.doc.data, "---");
      this.$emit("openBetPop", this.doc.data.id);
      //this.$router.push(`/purchase-record-details?id=${this.doc.data.id}`);
    },
    async visib() {
      if (this.detail.id) return;
      const [err, res] = await userApi.betsOrderDetail({
        id: this.doc.data.id,
      });
      if (err) return;
      this.detail = res.data;
    },
  },
};
</script>
<style scoped lang="scss">
.my-group-buy {
  cursor: pointer;
  width: 488px;
  border-radius: 16px 16px;
  overflow: hidden;
  .my-title {
    height: 58px;
    background: #e7474c;
    color: #fff;
  }
  .list-txt {
    color: #505050;
  }
  .conts {
    padding: 0 24px 24px;
    font-size: 24px;
    background: url("@/assets/img/room.png") no-repeat 378px 16px #fff;
    background-size: 80px 80px;
  }
  .expect {
    margin-bottom: 8px;
  }
  .expect-color {
    & > li {
      p:first-child {
        margin-right: 24px;
        color: #505050;
      }
      p:last-child {
        color: #b78756;
      }
    }
  }
  .lottery {
    font-size: 26px;
    height: 60px;
    color: #000;
  }
  .bet-code {
    & > li {
      margin-bottom: 8px;
      p:first-child {
        margin-right: 16px;
      }
    }
  }
  .btm-status {
    padding: 24px;
    background-color: #eff8ff;
  }
  .color-green {
    color: #02b500;
  }
  .color-red {
    color: #e7474c;
  }
  .user-list {
    padding: 24px 0;
  }
  .btns-bet {
    height: 62px;
    background: #e7474c;
    border-radius: 16px 16px 16px 16px;
    color: #fff;
  }
}
.bind-bet-pop {
  border-radius: 24px 24px 0px 0px;
  height: 126px;
}
</style>
