<template>
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
      <ul
        class="bet-code list-txt expect-color"
        v-for="(item, index) in betCode"
        :key="index"
      >
        <li class="d-flex">
          <p>投注玩法:</p>
          <p>{{ item.name }}</p>
        </li>
        <li class="d-flex">
          <p>投注内容:</p>
          <p class="x-auto no-wrap">
            {{
              !detail.betCode
                ? getVisibility(detail.visibility)
                : item.positions?.map((subArr) => subArr.join(", ")).join("|")
            }}
          </p>
        </li>
        <li class="d-flex">
          <p>投注金额:</p>
          <p>{{ item.price }}元</p>
        </li>
        <li class="d-flex">
          <p>总命中率:</p>
          <p>{{ `${doc.data.bingos}%` }}</p>
        </li>
      </ul>
      <ul
        class="btm-status"
        v-for="(item, index) in doc.data.expects"
        :key="`${index}-index`"
      >
        <li class="justify-between">
          <p>{{ item.expect }}期</p>
          <p
            :class="{
              'color-green': item.status === 3,
              'color-red': item.status === 2,
            }"
          >
            {{ btmStatus(item.status) }}
          </p>
        </li>
      </ul>
      <p class="user-list">计划无神,跟反自由</p>
      <p class="btns-bet center-center">我要跟投</p>
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
      this.$router.push(`/order/detail/${this.doc.data.id}`);
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
  width: 244px;
  border-radius: 8px 8px;
  overflow: hidden;
  .my-title {
    height: 29px;
    background: #e7474c;
    color: #fff;
  }
  .list-txt {
    color: #505050;
  }
  .conts {
    padding: 0 12px 12px;
    font-size: 12px;
    background: url("@/assets/img/room.png") no-repeat 189px 8px #fff;
    background-size: 40px 40px;
  }
  .expect {
    margin-bottom: 4px;
    & > li {
      p:first-child {
        margin-right: 12px;
      }
    }
  }
  .lottery {
    font-size: 13px;
    height: 30px;
    color: #000;
  }
  .bet-code {
    & > li {
      margin-bottom: 4px;
      p:first-child {
        margin-right: 8px;
      }
    }
  }
  .btm-status {
    padding: 12px;
    background-color: #eff8ff;
  }
  .color-green {
    color: #02b500;
  }
  .color-red {
    color: #e7474c;
  }
  .user-list {
    padding: 12px 0;
  }
  .btns-bet {
    height: 31px;
    background: #e7474c;
    border-radius: 8px 8px 8px 8px;
    color: #fff;
  }
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
</style>
