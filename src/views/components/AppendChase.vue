<template>
  <van-popup v-model="show" position="bottom">
    <div class="c-page">
      <AppTopBar :back="close" topBarTitle="自动追期"></AppTopBar>
      <div
        class="time-box center-center"
        v-if="detail.nextExpect?.countdown !== undefined"
      >
        距{{ detail.nextExpect.nextExpect }}期截止:
        <van-count-down
          class="time"
          :time="milliseconds"
          format="DD天HH小时mm分ss秒"
        />
      </div>
      <div class="zq-box center-center">
        追
        <input
          type="text"
          class="input"
          v-model="period"
          @input="changePeriod"
        />
        期
      </div>
      <div class="table-box">
        <div class="row header">
          <div class="col">期数</div>
          <div class="col">倍数</div>
          <div class="col">单倍金额</div>
          <div class="col">当前投入</div>
        </div>
        <div class="row" v-for="(v, i) in list" :key="i">
          <div class="col align-center" @click="choseRow(i)">
            <van-checkbox
              class="m-r-8 no-shrink"
              icon-size="12px"
              v-model="v.checked"
              checked-color="#ee0a24"
            ></van-checkbox>
            <p class="flex-1">{{ v.name }}期</p>
          </div>
          <div class="col">
            <input type="text" v-model="v.multiplier" class="input" />
          </div>
          <div class="col num">
            {{ divide(v.multiplier * bets.totalALL * 1 * $betPrice, false) }}元
          </div>
          <div class="col">
            {{
              divide(
                v.multiplier * bets.totalALL * v.multiplier * $betPrice,
                false
              )
            }}元
          </div>
        </div>
      </div>
      <p class="m-t-20 total-msg center-center">
        总注数<span>{{ chaseToal }}</span
        >,总金额<span>{{ chaseMoney }}</span
        >元
      </p>
      <div class="bottom-box">
        <div class="height"></div>
        <div class="b-fixed">
          <div class="radio-box center-center">
            <van-checkbox
              v-model="radio"
              icon-size="16px"
              checked-color="#ee0a24"
              >中奖后停止追号</van-checkbox
            >
          </div>
          <div class="btn center-center" @click="lotteryBetsRes">提交</div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "AppendChase",
  data() {
    return {
      period: 2,
      radio: 1,
      show: false,
      list: [],
      bets: {
        multiple: 1, //倍数
        totalALL: 0, //多数注数
        totalMoney: 0, //总金额
      }, //投注信息
    };
  },
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: Number,
      default: null,
    },
    tableList: {
      type: Array,
      default: () => [],
    },
    milliseconds: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    chaseToal() {
      return (
        this.list.filter((item) => item.checked).length * this.bets.totalALL
      );
    },
    chaseMoney() {
      return this.list.reduce((pre, cur) => {
        if (cur.checked) {
          return (
            pre +
            cur.multiplier *
              this.bets.totalALL *
              cur.multiplier *
              this.$betPrice
          );
        }
        return pre;
      }, 0);
    },
  },
  methods: {
    changePeriod(v) {
      let n = v.target.value.trim();
      if (!n) return;
      n = v.target.value.replace(/[^\d]/g, "") || 2;
      if (n < 2) {
        n = 2;
      }
      if (n > 5) {
        n = 5;
      }
      this.period = n;
      const count = this.list.filter((item) => item.checked).length;
      if (n === count) {
        return;
      }
      this.list.forEach((item, idx) => {
        if (idx < this.period) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    },
    choseRow(idx) {
      this.list[idx].checked = !this.list[idx].checked;
      this.period = this.list.filter((item) => item.checked).length;
    },
    dataForm() {
      const obj = {
        stop: this.radio ? 1 : 0,
        content: "",
      };
      const list = this.list.filter((item) => item.checked);
      list.forEach((item) => {
        if (!obj.content) {
          obj.content = `${item.name},${item.multiplier}`;
        } else {
          obj.content += `|${item.name},${item.multiplier}`;
        }
      });
      return obj;
    },
    async lotteryBetsRes() {
      const nums = this.list.filter((item) => item.checked).length;
      //2-5期
      if (nums < 2) {
        this.$toast("追号期数不能少于2期");
        return;
      }
      if (nums > 5) {
        this.$toast("追号期数不能大于5期");
        return;
      }
      let dataStr = "";
      this.tableList.forEach((v) => {
        if (!dataStr) {
          dataStr = `${v.model} ${v.text} ${this.bets.multiple} ${v.total}`;
        } else {
          dataStr += `/${v.model} ${v.text} ${this.bets.multiple} ${v.total}`;
        }
      });
      const params = {
        lotteryId: this.id,
        ...this.dataForm(),
        betCode: dataStr,
        together: 0,
      };
      this.$toast.loading({ duration: 0, message: "投注中..." });
      const [err] = await userApi.lotteryBetsRe(params);
      if (err) return;
      this.close();
      this.$emit("buySuccess");
      this.$toast("追号成功");
    },
    delALL() {
      this.$emit("delALL", 0);
    },
    async getList() {
      const [err, res] = await userApi.lotteryExpects({
        id: this.id,
      });
      if (err) return;
      res.data = res.data.slice(0, 5);
      this.list = res.data.map((item, idx) => {
        return {
          name: item,
          checked: [0, 1].includes(idx) ? true : false,
          multiplier: 1,
        };
      });
    },
    async open(v) {
      if (this.tableList.length === 0) {
        this.$toast("请先选择投注");
        return;
      }
      this.$toast.loading({ duration: 0 });
      await this.getList();
      this.$toast.clear();
      this.bets = v;
      this.show = true;
    },
    close() {
      this.show = false;
    },
    changeRadio() {
      this.radio = this.radio == 1 ? 0 : 1;
    },
  },
};
</script>
<style scoped lang="less">
.time-box {
  padding: 14px 0;
  text-align: center;
  font-size: 24px;
  color: #777777;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  .time {
    color: #fc4546;
    font-size: 24px;
    margin-left: 10px;
  }
}
.zq-box {
  height: 94px;
  background: #e8e8e8;
  color: #999999;
  font-weight: 500;
  .input {
    height: 54px;
    width: 146px;
    background: #ffffff;
    border: 1px solid #999999;
    text-align: center;
    margin: 0 32px;
    color: #333;
    font-weight: bold;
  }
}
.table-box {
  padding: 0 30px;
  .row {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    border-bottom: 1px solid #efefef;
    font-size: 24px;
    color: #777777;
    padding: 24px 0;
    align-items: center;
    text-align: center;
  }
  .col {
    &:first-child {
      text-align: left;
    }
  }
  .header {
    color: #6a6a6a;
    font-weight: bold;
  }
  .input {
    width: 110px;
    height: 54px;
    text-align: center;
    border: 1px solid #d1d1d1;
    color: #000;
    font-weight: 500;
    font-size: 24px;
  }
  .num {
    color: #be2933;
  }
}
.bottom-box {
  .height {
    height: 260px;
  }
  .b-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    .radio-box {
      width: 100%;
      padding-top: 28px;
    }
    .btn {
      width: 684px;
      height: 92px;
      background: #be2834;
      margin: 28px auto;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
.total-msg {
  font-size: 32px;
  span {
    color: #be2933;
  }
}
</style>
