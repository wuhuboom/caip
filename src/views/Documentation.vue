<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="合买大厅">
      <!-- <template v-slot:right>
        <div class="right-box" @click="$tool.goPage('/buy-together')">
          发起合买
        </div>
      </template> -->
    </AppTopBar>
    <BtmActionSheet @select="select" :actions="sysList" ref="$BtmActionSheet" />
    <ul class="align-center justify-between p-l-24 p-r-24 header">
      <li>
        <input
          type="text"
          placeholder="输入发起人"
          v-model.trim="params.playerName"
        />
      </li>
      <li class="center-center">
        <p @click="openSheet">
          {{ curLottery.lotteryName }}
          <van-icon class="m-l-8" name="arrow-down" />
        </p>
      </li>
      <li
        class="check center-center color-fff"
        @click="lotteryBetsOrder({ pageNo: 1 })"
      >
        查询
      </li>
    </ul>
    <div class="p-x-24">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="lotteryBetsOrder"
      >
        <div
          class="dashen-box m-b-24"
          v-for="(item, i) in results"
          :key="i"
          @click="
            $router.push({
              path: '/purchase-record-details',
              query: { id: item.id },
            })
          "
        >
          <ul class="p-r-24 p-l-12 p-t-24 p-b-24 flex-column">
            <li class="justify-between align-center">
              <div>
                <p class="active font16 m-b-24">{{ item.lotteryName }}</p>
                <p class="color333">发起人：{{ item.playerName }}</p>
              </div>
              <p class="buy center-center color-fff">跟一单</p>
            </li>
            <li class="align-center b-t-m p-l-12">
              <p class="color777 align-center m-r-80">
                金额
                <span class="m-l-8 m-r-8 color333 bold">{{
                  divide(item.money)
                }}</span
                >元
              </p>
              <p class="color777 align-center m-r-80">
                剩余
                <span class="m-l-8 m-r-8 color333 bold">{{
                  item.sellCount
                }}</span
                >元
              </p>
            </li>
          </ul>
        </div>
      </van-list>
    </div>

    <AppBtmBar></AppBtmBar>
  </div>
</template>

<script>
import { Circle as MyCircle } from "vant";
import userApi from "@/api/user";
export default {
  name: "AppDocumentation",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MyCircle,
  },
  data() {
    return {
      loading: false,
      finished: false,
      params: {
        ftype: -1,
        playerName: "",
        lotteryId: "",
        betCountMin: -1,
        pageNo: 1,
        pageSize: 10,
      },
      tableData: {
        totalPage: null,
        totalCount: 0,
        results: [],
      },
    };
  },
  computed: {
    results() {
      return this.tableData.results;
    },
    curLottery() {
      return this.catList.find((v) => v.id === this.params.lotteryId);
    },
    sysList() {
      const arr = [
        {
          lotteryName: "全部游戏",
          id: "",
        },
      ];
      this.$store.state.cat.forEach((item) => {
        arr.push(...item.list);
      });
      return arr.map((v) => {
        return {
          name: v.lotteryName,
          id: v.id,
        };
      });
    },
    catList() {
      const arr = [
        {
          lotteryName: "全部游戏",
          id: "",
        },
      ];
      this.$store.state.cat.forEach((item) => {
        arr.push(...item.list);
      });
      return arr;
    },
  },
  methods: {
    openSheet() {
      this.$refs.$BtmActionSheet.open();
    },
    select(item) {
      this.params.lotteryId = item.id;
    },
    async lotteryBetsOrder(obj = {}) {
      if (obj.pageNo === 1) {
        this.tableData.results = [];
        this.$toast.loading({
          forbidClick: true,
        });
        window.scrollTo(0, 0);
      }
      this.loading = true;
      Object.assign(this.params, obj);
      const sendData = {
        ...this.params,
      };
      for (let key in sendData) {
        if (sendData[key] === "" || sendData[key] === -1) {
          delete sendData[key];
        }
      }
      const [err, res] = await userApi.lotteryBetsOrder(sendData);
      this.$toast.clear();
      this.loading = false;
      if (err) {
        this.finished = true;
        return;
      }
      res.data.results.forEach((v) => {
        const curMoney = v.betCountCurr;
        const fix = (curMoney / v.betTotal).toFixed(2);
        v.p = parseInt(fix * 100);
        v.clientMoney = "";
        //剩余
        v.sellCount = v.betTotal - curMoney;
      });
      this.params.pageNo++;
      if (this.params.pageNo > res.data.totalPage) {
        this.finished = true;
      }
      this.tableData.results = this.tableData.results.concat(res.data.results);
    },
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
.header {
  height: 90px;
  background: #ffffff;
  [type="text"] {
    padding: 0 16px;
    width: 214px;
    height: 58px;
    background: #f7f7f7;
    border-radius: 12px 12px 12px 12px;
    border: 2px solid #c9c9c9;
  }
  .check {
    width: 114px;
    height: 56px;
    background: #bf2834;
    border-radius: 12px 12px 12px 12px;
  }
}
.dashen-box {
  height: 238px;
  background: #bf2834;
  border-radius: 20px 20px 20px 20px;
  padding-left: 16px;
  & > ul {
    background-color: #fff;
    height: 100%;
    justify-content: space-between;
  }
  .buy {
    width: 148px;
    height: 58px;
    background: #bf2935;
    border-radius: 4px 4px 4px 4px;
  }
  .b-t-m {
    height: 68px;
    background: #f6fafb;
  }
}
</style>
