<template>
  <div class="my-group-buy" @click="goDetail">
    <p class="my-title center-center">{{ doc.data.lottery }}全天计划</p>
    <div class="conts font12">
      <p class="lottery font13 align-center">{{ doc.data.lottery }}</p>
      <ul class="list-txt expect">
        <li class="d-flex">
          <p>期号:</p>
          <p>{{ doc.data.expect }}</p>
        </li>
      </ul>
      <ul
        class="bet-code list-txt"
        v-for="(item, index) in betCode"
        :key="index"
      >
        <li class="d-flex">
          <p>投注玩法:</p>
          <p>{{ item.name }}</p>
        </li>
        <li class="d-flex">
          <p>投注内容:</p>
          <p>
            {{ item.positions?.map((subArr) => subArr.join(", ")).join("|") }}
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
      <p class="user-list">{{ doc.data.user }}</p>
      <p class="btns-bet center-center">我要跟投</p>
    </div>
  </div>
</template>

<script>
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
  computed: {
    theOne() {
      return this.$store.state.theOne;
    },
    betCode() {
      if (this.doc.data.betCode) {
        console.log(this.$util.parseFourStarInput(this.doc.data.betCode));
        return this.$util.parseFourStarInput(this.doc.data.betCode);
      }
      return [];
    },
  },
  methods: {
    btmStatus(v) {
      return (this.$store.state.btmStatus.find((doc) => +doc.id === +v) || {})
        .name;
    },
    goDetail() {
      //window.open(`#/order/detail/${this.doc.data.id}`);
      this.$router.push(`/order/detail/${this.doc.data.id}`);
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
    background-color: #fff;
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
</style>
