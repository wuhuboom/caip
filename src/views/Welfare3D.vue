<template>
  <div class="c-page bg-grey">
    <!-- 顶栏 -->
    <AppTopBar class="app-top-bar" :titleSolt="true">
      <template v-slot:title>
        <div @click="showSelect = !showSelect">
          {{ detail.lotteryNameH5 }}-{{ value }}
          <van-icon
            :name="showSelect ? 'arrow-up' : 'arrow-down'"
            color="#fff"
          />
        </div>
        <div class="center-box" v-if="showSelect">
          <div class="bg" @click="showSelect = false"></div>
          <div class="downs-box">
            <div class="select-box">
              <div
                class="select"
                v-for="(item, index) in firstNavs"
                :key="index"
                @click="curTab = item"
                :class="{ on: curTab === item }"
              >
                {{ item }}
              </div>
            </div>
            <div v-for="(item, index) in secondNavs" :key="index">
              <p class="desc">{{ `${item.tip1}${item.tip2}` }}</p>
              <div class="select-box">
                <div
                  class="select"
                  v-for="(v, i) in item.list"
                  :key="i"
                  @click="value = v.txt"
                  :class="{ on: value === v.txt }"
                >
                  {{ v.txt }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:right>
        <div class="m-r-32">
          <van-badge :content="tableList.length" :data-badge="tableList.length">
            <van-icon @click="badge" name="cart-o" color="#fff" size="26" />
          </van-badge>
        </div>
      </template>
    </AppTopBar>

    <div class="before-lottery" v-if="showBeforeLottery">
      <div
        class="lists"
        v-for="(item, index) in tableData.results"
        :key="index"
      >
        <div class="left text-ellipsis">{{ item.cycleNum }}期</div>
        <div class="right text-ellipsis">
          <div class="num-box">
            <div class="num" v-for="(v, i) in item.openNum.split(',')" :key="i">
              {{ v }}
            </div>
          </div>
          <div class="time">
            {{ $dayjsTime(item.createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <div class="periods-box">
      <div class="left text-ellipsis">{{ detail.nextExpect.nextExpect }}期</div>
      <div class="right text-ellipsis" @click="showTop">
        <div class="time text-ellipsis center-center">
          <van-count-down
            class="time"
            @finish="openFish"
            @change="changeCount"
            :time="detail.nextExpect?.countdown * 1000"
            format="HH小时mm分ss秒"
          />
          <!-- {{ $dayjsTime(detail.nextExpect.stopTime) }} -->
          截止
        </div>
        <van-icon
          :name="showBeforeLottery ? 'arrow-up' : 'arrow-down'"
          color="#999"
          class="icon"
        />
      </div>
    </div>

    <div class="main-wrap">
      <div class="des-box">
        <div class="left">{{ curItemValue.desc }}</div>
        <div class="right" @click="$tool.goPage('/chat')">
          <div class="lt-icon"></div>
          进入聊天室
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <component
          :curPre="curPre"
          ref="$cont"
          @total="total = $event"
          :is="currentComponent"
          :key="value"
          v-bind="getComponentProps"
        ></component>
      </transition>
      <!-- <div class="xuan-box">
        <div class="xuan-list" v-for="o in 3" :key="o">
          <div class="left">
            <div class="item small">
              <div class="num-top on">百位</div>
              <div class="num-bottom">遗漏</div>
            </div>
          </div>
          <div class="right">
            <div class="item" v-for="i in 10" :key="i">
              <div
                class="num-top"
                :class="{
                  on: i === 1,
                }"
              >
                {{ i }}
              </div>
              <div class="num-bottom">4</div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="tips-box">
        <div class="t1">玩法提示：</div>
        <div class="t2">{{ curItemValue.desc }}</div>
      </div>
    </div>
    <BetOn
      :id="id"
      @delALL="delALL"
      @delOne="delOne"
      @buySuccess="buySuccess"
      :tableList="tableList"
      :detail="detail"
      :milliseconds="milliseconds"
      @openChase="openChase"
      @openGroupBuy="openGroupBuy"
      ref="$BetOn"
    />
    <tipsDialog @sure="clearData" ref="$finshDialog" />
    <AppendChase
      :id="id"
      :tableList="tableList"
      :detail="detail"
      @buySuccess="buySuccess"
      :milliseconds="milliseconds"
      ref="$AppendChase"
    />
    <BuyTogether
      :id="id"
      @delALL="delALL"
      @delOne="delOne"
      @buySuccess="buySuccess"
      :tableList="tableList"
      :detail="detail"
      :milliseconds="milliseconds"
      ref="$BuyTogether"
    />
    <!-- 底部 BuyTogether -->
    <div class="betting-box">
      <div class="height"></div>
      <div class="fixed">
        <div class="left">
          <div class="del-icon"></div>
          <div class="text" @click="pageDell">删除</div>
        </div>
        <div class="center">
          <div class="t1">{{ total }}注</div>
          <div class="t2">共{{ totalMoney }}元</div>
        </div>
        <div class="right" @click="add">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
import typeConfigList from "@/plugins/typeConfigList";
import ball1 from "./components/ball1";
import ball2 from "./components/ball2";
import ball3 from "./components/ball3";
import ball4 from "./components/ball4";
import ball5 from "./components/ball5";
import ball6 from "./components/ball6";
import ball7 from "./components/ball7";
import ball8 from "./components/ball8";
import ball9 from "./components/ball9";
import ball10 from "./components/ball10";
import ball11 from "./components/ball11";
import ball12 from "./components/ball12";
import ball13 from "./components/ball13";
import BetOn from "./components/BetOn";
import AppendChase from "./components/AppendChase";
import tipsDialog from "@/components/tipsDialog.vue";
import BuyTogether from "./components/BuyTogether";
export default {
  name: "Welfare3D",
  data() {
    return {
      milliseconds: 0,
      total: 0,
      preId: 0,
      linkQuery: this.$route.query,
      showMore: false,
      showSelect: false,
      showBeforeLottery: false,
      curTab: +this.$route.query.type === 1 ? "三星" : "四星",
      value: +this.$route.query.type === 1 ? "三星直选复式" : "四星直选复式",
      tableData: {},
      preData: {
        hot: [],
        losses: [],
        lastExpect: {},
      },
      detail: {
        mulConfig: [],
        nextExpect: {},
      },
      tableList: [],
      multiple: 1,
    };
  },
  components: {
    BuyTogether,
    AppendChase,
    tipsDialog,
    BetOn,
    ball1,
    ball2,
    ball3,
    ball4,
    ball5,
    ball6,
    ball7,
    ball8,
    ball9,
    ball10,
    ball11,
    ball12,
    ball13,
  },
  watch: {
    curTab() {
      this.secondNavs.forEach((item, index) => {
        item.list.forEach((v, idx) => {
          if (index === 0 && idx === 0) {
            this.value = v.txt;
          }
        });
      });
    },
  },
  computed: {
    getComponentProps() {
      if (this.value.includes("直选和值")) {
        return {
          className: "flex-start",
        };
      }
      if (this.value === "前三直选复式") {
        return {
          titleText: ["万位", "千位", "百位"],
        };
      }
      if (this.value === "中三直选复式") {
        return {
          titleText: ["千位", "百位", "十位"],
        };
      }
      if (this.value === "后三直选复式") {
        return {
          titleText: ["百位", "十位", "个位"],
        };
      }
      return {};
    },
    curPre() {
      const { losses, hot, zu3, zu3_hot, zu6, zu6_hot } = this.preData;

      switch (this.value) {
        // 三星直选复式
        case "三星直选复式":
          return this.preId === 0 ? losses : hot;

        case "三星组三复式":
        case "后三组三复式":
        case "中三组三复式":
        case "前三组三复式":
        case "三星组三胆拖":
        case "前三组三胆拖":
          return this.preId === 0 ? [zu3] : [zu3_hot];

        case "三星组六复式":
        case "后三组六复式":
        case "中三组六复式":
        case "前三组六复式":
        case "三星组六胆拖":
        case "前三组六胆拖":
          return this.preId === 0 ? [zu6] : [zu6_hot];

        // 四星直选复式
        case "四星直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k > 0)
            : hot.filter((_, k) => k > 0);

        // 前三直选复式
        case "前三直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k < 3)
            : hot.filter((_, k) => k < 3);

        // 中三直选复式
        case "中三直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k > 0 && k < 4)
            : hot.filter((_, k) => k > 0 && k < 4);

        // 后三直选复式
        case "后三直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k > 1 && k < 5)
            : hot.filter((_, k) => k > 1 && k < 5);

        // 中三组三胆拖
        case "中三组三胆拖":
          return this.preId === 0
            ? [this.preData.zu3_z3]
            : [this.preData.zu3_hot_z3];

        // 中三组六胆拖
        case "中三组六胆拖":
          return this.preId === 0
            ? [this.preData.zu6_z3]
            : [this.preData.zu6_hot_z3];

        // 后三组三胆拖
        case "后三组三胆拖":
          return this.preId === 0
            ? [this.preData.zu3_h3]
            : [this.preData.zu3_hot_h3];

        // 后三组六胆拖
        case "后三组六胆拖":
          return this.preId === 0
            ? [this.preData.zu6_h3]
            : [this.preData.zu6_hot_h3];
        case "前三直选组合":
          return this.preId === 0
            ? [this.preData.zxzh3]
            : [this.preData.zxzh_hot3];
        case "中三直选组合":
          return this.preId === 0
            ? [this.preData.zxzh2]
            : [this.preData.zxzh_hot2];
        case "后三直选组合":
          return this.preId === 0
            ? [this.preData.zxzh3]
            : [this.preData.zxzh_hot3];
        // 默认情况
        default:
          return [];

        //"zxzh1": 前三直选组合遗漏
        //"zxzh_hot1": 前三直选组合冷热
        //"zxzh2": 中三直选组合遗漏
        //"zxzh_hot2": 中三直选组合冷热
        //"zxzh3": 后三直选组合遗漏
        //"zxzh_hot3": 后三直选组合冷热
      }
    },
    currentComponent() {
      switch (this.value) {
        // 复式类型
        case "三星直选复式":
        case "后三直选复式":
        case "中三直选复式":
        case "前三直选复式":
          return "ball1";

        // 单式类型
        case "三星直选单式":
        case "后三直选单式":
        case "中三直选单式":
        case "前三直选单式":
          return "ball2";

        // 和值类型
        case "三星直选和值":
        case "后三直选和值":
        case "中三直选和值":
        case "前三直选和值":
          return "ball3";

        // 组三复式类型
        case "三星组三复式":
        case "后三组三复式":
        case "中三组三复式":
        case "前三组三复式":
          return "ball4";

        // 组三胆拖类型
        case "三星组三胆拖":
        case "后三组三胆拖":
        case "中三组三胆拖":
        case "前三组三胆拖":
          return "ball5";

        // 组三单式类型
        case "三星组三单式":
        case "后三组三单式":
        case "中三组三单式":
        case "前三组三单式":
          return "ball12";

        // 组六复式类型
        case "三星组六复式":
        case "后三组六复式":
        case "中三组六复式":
        case "前三组六复式":
          return "ball6";

        // 组六胆拖类型
        case "三星组六胆拖":
        case "后三组六胆拖":
        case "中三组六胆拖":
        case "前三组六胆拖":
          return "ball7";

        // 组六单式类型
        case "三星组六单式":
        case "后三组六单式":
        case "中三组六单式":
        case "前三组六单式":
          return "ball13";

        // 组选和值类型
        case "中三组选和值":
        case "后三组选和值":
        case "三星组选和值":
          return "ball8";

        // 四星类型
        case "四星直选复式":
          return "ball9";
        case "四星直选单式":
          return "ball10";

        // 直选组合类型
        case "后三直选组合":
        case "中三直选组合":
        case "前三直选组合":
          return "ball11";

        // 默认情况
        default:
          return "ball1";
      }
    },
    id() {
      return +this.linkQuery.id;
    },
    tabs() {
      if (+this.linkQuery.type === 1) {
        return {
          lotteryType1: typeConfigList["lotteryType1"],
        };
      }
      return {
        lotteryType0: typeConfigList["lotteryType0"],
        lotteryType2: typeConfigList["lotteryType2"],
        lotteryType3: typeConfigList["lotteryType3"],
        lotteryType4: typeConfigList["lotteryType4"],
      };
    },
    firstNavs() {
      let arr = [];
      for (let key in this.tabs) {
        this.tabs[key].forEach((item) => {
          if (!arr.includes(item.tip1)) {
            arr.push(item.tip1);
          }
        });
      }
      return arr;
    },
    secondNavs() {
      let arr = [];
      for (let key in this.tabs) {
        this.tabs[key].forEach((item) => {
          if (item.tip1 == this.curTab) {
            arr = this.tabs[key];
          }
        });
      }
      return arr;
    },
    curItemValue() {
      let arr = {};
      this.secondNavs.forEach((item) => {
        item.list.forEach((v) => {
          if (v.txt === this.value) {
            arr = v;
          }
        });
      });
      return arr;
    },
    totalMoney() {
      return this.divide(this.total * this.multiple * this.$betPrice, false);
    },
  },
  methods: {
    changeCount(v) {
      const { days, hours, minutes, seconds, milliseconds } = v;
      // 转换为总毫秒数
      this.milliseconds =
        days * 24 * 60 * 60 * 1000 +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000 +
        milliseconds;
    },
    openChase(v) {
      this.$refs.$AppendChase.open(v);
    },
    openGroupBuy(v) {
      this.$refs.$BuyTogether.open(v);
    },
    pageDell() {
      this.$refs.$cont.clear();
    },
    delALL() {
      this.tableList = [];
    },
    delOne(index) {
      this.tableList.splice(index, 1);
    },
    showTop() {
      this.showBeforeLottery = !this.showBeforeLottery;
      if (this.showBeforeLottery) {
        this.lotteryHisExpect();
      }
    },
    async getPreData(s) {
      if (s !== "stop") {
        const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
        if (err) return;
        const { lastExpect } = res.data;
        const cur = this.preData.lastExpect.cycleNum;
        if (cur && lastExpect.cycleNum !== cur) {
          this.preData = res.data;
          await this.getDetail();
        }
      }

      this.tirmr = setTimeout(this.getPreData, 3000);
    },
    async lotteryCurrExpect() {
      const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
      if (err) return;
      this.preData = res.data;
    },
    async getDetail() {
      const [err, res] = await userApi.betsDetail({ id: this.id });
      if (err) return;
      res.data.mulConfig = JSON.parse(res.data.mulConfig);
      if (!res.data.nextExpect) {
        res.data.nextExpect = {};
      }
      this.detail = res.data;
    },
    initDetail() {
      // this.getDetail();
      // this.lotteryCurrExpect();
      return Promise.all([this.getDetail(), this.lotteryCurrExpect()]);
    },
    async lotteryHisExpect() {
      const [err, res] = await userApi.lotteryHisExpect({
        pageNo: 1,
        pageSize: 10,
        id: +this.id,
      });
      if (err) return;
      this.tableData = res.data;
    },
    closeContDialog() {
      this.$refs.$BetOn?.close();
      this.$refs.$AppendChase?.close();
      this.$refs.$BuyTogether?.close();
    },
    buySuccess() {
      this.delALL();
      this.closeContDialog();
      this.$refs.$BetOn.multiple = 1;
    },
    openFish() {
      this.closeContDialog();
      this.$refs.$finshDialog.open(
        `当前期数【${this.detail.nextExpect.nextExpect}】已停止下注，是否清空已投注内容？`
      );
      this.showSelect = false;
      this.showBeforeLottery = false;
    },
    clearData() {
      if (this.$refs.$BetOn?.tableList?.length) {
        this.$refs.$BetOn.close();
        this.tableList = [];
      }
    },
    badge() {
      if (!this.tableList.length) {
        this.$toast("请先选择投注");
        return;
      }
      this.$refs.$BetOn.open();
    },
    add() {
      const status = this.$refs.$cont.add();
      if (!status) {
        // if (this.$refs.$BetOn.tableList?.length) {
        //   this.$refs.$cont?.close();
        //   this.$refs.$BetOn.open();
        // }
        return;
      }
      this.tableList.push({
        model: this.value,
        text: this.$refs.$cont.text,
        total: this.total,
      });
      this.$refs.$BetOn.open();
      this.$refs.$cont.clear();
    },
  },
  async created() {
    await this.initDetail();
    this.getPreData("stop");
  },
  beforeDestroy() {
    this.tirmr && clearTimeout(this.tirmr);
  },
};
</script>
<style scoped lang="less">
.app-top-bar {
  .center-box {
    position: fixed;
    top: 90px;
    left: 0;
    width: 100%;
    height: calc(100% - 90px);
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
    }
    .select-box {
      position: relative;
      background: #fff;
      padding: 40px 34px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 40px;
      .select {
        width: 200px;
        height: 68px;
        text-align: center;
        line-height: 68px;
        border: 1px solid #999999;
        border-radius: 14px;
        color: #666666;
        font-size: 28px;
        overflow: hidden;
        &.on {
          color: #bf2935;
          border: 1px solid #bf2935;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            background: url("@/assets/img/Welfare3D/dui.png") no-repeat;
            background-size: 100% auto;
            width: 36px;
            height: 36px;
            right: -1px;
            bottom: -1px;
          }
        }
      }
    }
  }
  .right-box {
    width: 100px;
    font-size: 48px;
    position: relative;
    .more-pop {
      position: absolute;
      right: 20px;
      top: 0.9rem;
      z-index: 99;
      background: #fff;
      border-radius: 6px 6px 6px 6px;
      box-shadow: 0px 6px 12px 2px rgba(0, 0, 0, 0.16);
      color: #666666;
      display: flex;
      font-size: 28px;
      align-items: center;
      padding: 24px 24px;

      .text {
        width: 400px;
      }
      .js-icon {
        background: url("@/assets/img/Welfare3D/js-icon.png") no-repeat;
        background-size: 100% auto;
        width: 48px;
        height: 48px;
        margin-right: 14px;
      }
      .top-icon {
        position: absolute;
        top: -25px;
        right: 8px;
        transform: rotate(-90deg);
        font-size: 40px;
      }
    }
  }
}
.before-lottery {
  .lists {
    display: flex;
    height: 64px;
    background: #fff;
    padding: 0 28px;
    line-height: 64px;
    font-size: 24px;
    &:nth-child(2n) {
      background: #f9f9f9;
    }
  }
  .left {
    text-align: center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: end;
    .num-box {
      flex: 1;
      text-align: center;
      color: #bf2935;
      font-size: 36px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      .num {
        width: 50px;
        text-align: center;
      }
    }
    .time {
      text-align: center;
    }
  }
}
.periods-box {
  display: flex;
  height: 100px;
  align-items: center;
  padding: 0 28px;
  background: #fff;
  .left {
    flex: 1;
  }
  .right {
    display: flex;
    align-items: center;
    .time {
      color: #bf2935;
      // margin-right: 36px;
    }
    .icon {
      font-size: 40px;
    }
  }
}
.main-wrap {
  padding: 28px 0;
  .des-box {
    display: flex;
    align-items: center;
    padding: 0 28px;
    .left {
      flex: 1;
      font-size: 24px;
      color: #999999;
    }
    .right {
      height: 60px;
      border-radius: 60px;
      border: 1px solid #fc302b;
      line-height: 60px;
      padding: 0 20px;
      color: #fc302b;
      font-size: 24px;
      display: flex;
      align-items: center;
      .lt-icon {
        width: 32px;
        height: 32px;
        background: url("@/assets/img/Welfare3D/lt.png") no-repeat;
        background-size: 100% auto;
        margin-right: 10px;
      }
    }
  }
  .xuan-box {
    .xuan-list {
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      padding: 40px 28px;
      .left {
      }
      .right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        margin-right: 30px;
        margin-bottom: 20px;
        &.small {
          margin-right: 30px;
          .num-top {
            color: #fff;
            font-weight: 400;
            font-size: 28px;
            min-width: 90px;
            padding: 0 8px;
            border-radius: 60px;
          }
        }
        .num-top {
          border: 2px solid #bf2935;
          height: 60px;
          line-height: 60px;
          font-weight: bold;
          font-size: 32px;
          color: #bf2935;
          min-width: 60px;
          text-align: center;
          border-radius: 100%;
          &.on {
            background: #bf2935;
            color: #fff;
          }
        }
        .num-bottom {
          font-size: 24px;
          color: #999999;
          text-align: center;
          margin-top: 24px;
        }
      }
    }
  }
  .tips-box {
    padding: 36px 28px;
    .t2 {
      color: #999999;
      margin-top: 8px;
    }
  }
}
.downs-box {
  background-color: #fff;
  position: relative;
  z-index: 2;
  .desc {
    font-size: 36px;
    color: #0b0909;
    text-align: left;
    padding-left: 34px;
  }
}
.betting-box {
  .height {
    height: 98px;
  }
  .fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 98px;
    align-items: center;
    background: #fff;
  }
  .left {
    text-align: center;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .del-icon {
      background: url("@/assets/img/Welfare3D/del.png") no-repeat;
      background-size: 100% auto;
      width: 44px;
      height: 44px;
    }
    .text {
      font-size: 22px;
      color: #cccccc;
      margin-top: 2px;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 10px;
      width: 1px;
      height: 60px;
      background: #e5e5e5;
    }
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    .t2 {
      color: #bf2935;
      margin-left: 16px;
    }
  }
  .right {
    width: 180px;
    line-height: 98px;
    background: #bf2935;
    color: #fff;
    font-size: 32px;
    text-align: center;
  }
}
</style>
