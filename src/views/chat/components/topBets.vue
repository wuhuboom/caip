<template>
  <van-popup
    class="chat-top-bets"
    v-model="show"
    position="top"
    :overlay="false"
  >
    <div>
      <div class="top-bets-cont colorfff flex-column justify-around font13">
        <ul class="justify-between p-l-16 p-r-16">
          <li class="d-flex">
            <van-icon name="list-switch" class="m-r-16 m-t-4" :size="20" />
            <div>
              <p class="font16 m-b-8">
                <span>重庆时时彩</span>
              </p>
              <p>20250220026期</p>
            </div>
          </li>
          <li class="align-center">
            投注中
            <span></span><span></span><span></span>
            <p class="align-center color-yellow m-l-16">
              <span>去投注</span><van-icon class="m-l-16" name="arrow" />
            </p>
          </li>
        </ul>
        <div>
          <ul class="table-lists align-center justify-around">
            <li>{{ prize.cycleNum }}期</li>
            <li class="center-center">
              <p
                v-for="(v, i) in prize.openArr"
                class="openbets center-center"
                :class="[
                  'openbets' + i,
                  { 'm-r-8': i != prize.openArr.length - 1 },
                ]"
                :key="i"
              >
                {{ v }}
              </p>
            </li>
            <li>
              <van-icon name="arrow-down" />
            </li>
          </ul>
        </div>
      </div>
      <p class="slides"></p>
    </div>
  </van-popup>
</template>

<script>
import { mapGetters } from "vuex";
import userApi from "@/api/user";
export default {
  data() {
    return {
      show: true,
      id: null,
      results: [],
    };
  },
  computed: {
    ...mapGetters(["catList"]),
    prize() {
      return this.results[0] || {};
    },
    otherPrize() {
      return this.results.slice(1);
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    async lotteryBetsOrder() {
      const query = {
        id: this.id,
        pageNo: 1,
        pageSize: 8,
      };
      const [err, res] = await userApi.lotteryHisExpect(query);
      if (err) {
        return;
      }
      res.data.results = res.data.results.map((v) => {
        v.openArr = v.openNum.split(",");
        return v;
      });
      this.results = res.data.results;
    },
  },
  created() {
    this.id = +this.catList[0].id;
    this.lotteryBetsOrder();
  },
};
</script>
<style scoped lang="scss">
.chat-top-bets {
  z-index: 3 !important;
  padding-top: 90px;
}
.top-bets-cont {
  background: url("@/assets/img/betsbg.png") no-repeat center;
  background-size: 100% 100%;
  height: 246px;
  .table-lists {
    width: 686px;
    height: 96px;
    background: #7284d8;
    border-radius: 12px 12px 12px 12px;
    margin: 0 auto;
  }
  .color-yellow {
    color: #f6c343;
  }
  .openbets {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #dcae3e;
  }
  .openbets1 {
    background: #58b2e3;
  }
  .openbets2 {
    background: #de9fe7;
  }
  .openbets3 {
    background: #efb187;
  }
  .openbets4 {
    background: #dc6957;
  }
}
</style>
