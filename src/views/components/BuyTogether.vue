<template>
  <van-popup v-model="show" position="bottom">
    <div class="c-page">
      <AppTopBar topBarTitle="发起合买" :back="close"></AppTopBar>
      <div class="time-box">
        <div class="time-box" v-if="detail.nextExpect?.countdown !== undefined">
          距{{ detail.nextExpect.nextExpect }}期截止:
          <van-count-down
            class="time"
            :time="milliseconds"
            format="HH小时mm分ss秒"
          />
        </div>
      </div>
      <div class="lists-box">
        <div class="lists">
          <span class="title">我要认购</span>
          <input
            type="text"
            class="input m-l-24"
            v-model="form.betCountCurr"
            @blur="handelBetCountCurr"
          />
          <span class="title f-24">
            所占比例至少为总金额 {{ `${this.lotteryConf.toMin}%` }}
          </span>
        </div>
        <div class="lists">
          <div class="d-flex">
            <span class="title">是否保底</span>
            <div class="flex-1 select-box m-l-24">
              <div class="c-p-select align-center" @click="openSheet">
                <p class="flex-1 cont center-center">{{ curType.name }}</p>
                <img class="d-img" src="@/assets/img/My/down.png" alt="" />
              </div>
            </div>
          </div>
          <div>
            <div v-if="type === 1" class="align-center p-t-24">
              <input
                type="text"
                class="input m-l-0"
                v-model="typeMoney"
                @blur="handelTypeMoney"
              />
              <span>所占比例 {{ typeP }} (至少为总金额的5%)</span>
            </div>
            <div v-if="type !== 2" class="align-center p-t-24">
              <van-checkbox
                v-model="isFull"
                icon-size="16px"
                checked-color="#ee0a24"
              ></van-checkbox>
              <div class="m-l-4">
                系统最多参与订单总金额的90%,最大满单
                {{ sysBuy }}元
              </div>
            </div>
          </div>
        </div>
        <div class="lists d-flex">
          <span class="title">是否公开</span>
          <div class="flex-1 m-l-24 visibility-list">
            <van-radio-group v-model="visibility">
              <div class="d-flex m-b-24">
                <van-radio :name="0">公开</van-radio>
                <van-radio class="p-l-8" :name="1">仅对跟单者公开</van-radio>
              </div>
              <div class="d-flex">
                <van-radio :name="2">截止后公开</van-radio>
                <van-radio class="p-l-8" :name="3">永久保密</van-radio>
              </div>
            </van-radio-group>
          </div>
        </div>
        <div class="lists foot-desc align-center">
          <span class="title mr-44 align-center"
            >已添加<i>{{ tableList.length }}</i
            >单</span
          >
          <span class="title align-center"
            >总注数:<i>{{ bets.totalALL }}</i
            >注</span
          >
        </div>
      </div>
      <div class="bottom-btn">
        <div class="height"></div>
        <div class="btn justify-between align-center">
          <ul class="align-center foot-price">
            <li>总计</li>
            <li>{{ bets.totalMoney }}元</li>
          </ul>
          <ul class="align-center">
            <li class="canlce center-center" @click="close">取消</li>
            <li class="suer center-center" @click="lotteryBets">确认</li>
          </ul>
        </div>
      </div>
      <!-- 发布成功弹窗 -->
      <!-- <div class="publish-pop center-center">
      <div class="bg"></div>
      <div class="publish-main">
        <div class="top">发布成功</div>
        <div class="info-box">
          <div class="box-1">
            <div class="t-1">排列3 第2024304期(追4期)</div>
            <div class="t-2">购买份数:5 保底份数:5</div>
          </div>
          <div class="box-2">
            <div class="t-box">
              <div class="l-t">方案金额：</div>
              <div class="r-t">
                <span class="on">2.00</span>
                元
              </div>
            </div>
            <div class="t-box">
              <div class="l-t">份数：</div>
              <div class="r-t">
                <span class="on">2.00</span>
                元
              </div>
            </div>
            <div class="t-box">
              <div class="l-t">每份金额：</div>
              <div class="r-t">
                <span class="on">1.00</span>
                元
              </div>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <div class="btn">确认</div>
          <div class="btn on">分享好友</div>
        </div>
      </div>
    </div> -->
      <BtmActionSheet
        @select="select"
        :actions="sysList"
        ref="$BtmActionSheet"
      />
    </div>
  </van-popup>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "BuyTogether",
  data() {
    return {
      show: false,
      bets: {
        multiple: 1, //倍数
        totalALL: 0, //多数注数
        totalMoney: 0, //总金额
      },
      lotteryConf: {},
      form: {
        betCountCurr: 1, //认购份数
        betCountMin: 0, //保底份数
      },
      minNum: 0,
      type: 0,
      typeMoney: 0,
      isFull: true,
      sysList: [
        {
          name: "无保底",
          id: 0,
        },
        {
          name: "部分保底",
          id: 1,
        },
        {
          name: "全额保底",
          id: 2,
        },
      ],
      openList: false,
      visibilityList: [
        {
          name: "公开",
          id: 0,
        },
        {
          name: "仅对跟单者公开",
          id: 1,
        },
        {
          name: "截止后公开",
          id: 2,
        },
        {
          name: "永久保密",
          id: 3,
        },
      ],
      visibility: 0,
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
    curType() {
      return this.sysList.find((item) => item.id === this.type);
    },
    typeTotalMoney() {
      return this.bets.totalMoney;
    },
    toMin() {
      return this.lotteryConf.toMin / 100;
    },
    currP() {
      let p = (this.form.betCountCurr / this.typeTotalMoney) * 100;
      return `${p.toFixed(2)}%`;
    },
    typeP() {
      let p = (this.typeMoney / this.typeTotalMoney) * 100;
      return `${p.toFixed(2)}%`;
    },
    sysBuy() {
      let orther = 0;
      if (this.type) {
        orther = this.typeMoney;
      }
      return Math.max(0, this.typeTotalMoney - this.form.betCountCurr - orther);
    },
  },
  watch: {
    typeTotalMoney(val) {
      //认购金额至少为总金额的10%
      this.minNum = Math.ceil(val * this.toMin);
      this.form.betCountCurr = this.minNum;
    },
  },
  methods: {
    dataForm() {
      const { betCountCurr } = this.form;
      const obj = {
        betCountCurr,
        ftype: this.isFull ? 1 : 0,
        betCountMin: 0,
        btype: 2, // Default to no保底
        visibility: this.visibility,
      };

      if (this.type === 1) {
        // 部分保底
        obj.betCountMin = this.typeMoney;
        obj.btype = 1;
      } else if (this.type === 2) {
        // 全额保底
        obj.betCountMin = this.typeTotalMoney;
        obj.btype = 0;
        obj.ftype = 0;
      }

      return obj;
    },
    async lotteryBets() {
      let dataStr = "";
      this.tableList.forEach((v) => {
        if (!dataStr) {
          dataStr = `${v.model} ${v.text} ${this.bets.multiple} ${v.total}`;
        } else {
          dataStr += `/${v.model} ${v.text} ${this.bets.multiple} ${v.total}`;
        }
      });
      const [err] = await userApi.lotteryBets({
        lotteryId: this.id,
        betCode: dataStr,
        ...this.dataForm(),
      });
      if (err) return;
      this.close();
      this.$emit("buySuccess");
      this.$toast("合买成功");
    },
    handelBetCountCurr(v) {
      let n = v.target.value.trim();
      if (!n) return;
      n = v.target.value.replace(/[^\d]/g, "") || this.minNum;
      if (n < this.minNum) {
        this.$toast.fail(`认购金额至少为总金额的${this.lotteryConf.toMin}%`);
        this.form.betCountCurr = this.minNum;
      } else if (n > this.typeTotalMoney) {
        this.$toast.fail(`认购金额不能大于总金额`);
        this.form.betCountCurr = this.typeTotalMoney;
      } else {
        this.form.betCountCurr = n;
      }
    },
    handelTypeMoney(v) {
      let n = v.target.value.trim();
      if (!n) return;
      n = v.target.value.replace(/[^\d]/g, "") || this.minType;
      if (n < this.minType) {
        this.$toast.fail(`保底金额至少为总金额的5%`);
        this.typeMoney = this.minType;
      } else if (n > this.typeTotalMoney) {
        this.$toast.fail(`保底金额不能大于总金额`);
        this.typeMoney = this.typeTotalMoney;
      } else {
        this.typeMoney = n;
      }
    },
    select(item) {
      this.type = item.id;
    },
    openSheet() {
      this.$refs.$BtmActionSheet.open();
    },
    async getlotteryConf() {
      this.$toast.loading({
        forbidClick: false, // 允许点击和滚动
        duration: 0, // 持续时间为 0 表示不会自动关闭
      });
      const [err, res] = await userApi.lotteryConf();
      this.$toast.clear();
      if (err) return;
      this.lotteryConf = res.data;
    },
    async open(v) {
      if (this.tableList.length === 0) {
        this.$toast.fail(`订单金额低于 ${this.$betPrice} 元，不能发起合买`);
        return;
      }
      await this.getlotteryConf();
      if (v) {
        this.bets = v;
      }
      const num = +this.typeTotalMoney || 0;
      this.minNum = Math.ceil(num * this.toMin);
      this.minType = Math.ceil(num * 0.05);
      this.typeMoney = this.minType;
      this.form.betCountCurr = +this.minNum;
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style scoped lang="less">
.f-24 {
  font-size: 24px !important;
}
.bottom-btn {
  .height {
    height: 156px;
  }
  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    color: #fff;
    height: 98px;
    width: 100%;
    background: #fff;
    font-size: 32px;
    font-weight: 500;
  }
}
.time-box {
  padding: 14px 0;
  text-align: center;
  font-size: 24px;
  color: #777777;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e8e8e8;
  .time {
    color: #fc4546;
    font-size: 24px;
    margin-left: 10px;
  }
}
.lists-box {
  padding: 10px 32px;
  .lists {
    padding: 40px 0;
    border-bottom: 1px solid #efefef;
  }
  .mr-44 {
    margin-right: 44px;
  }
  .title {
    font-size: 32px;
    color: #777777;
    font-weight: 500;
  }
  .input {
    width: 146px;
    height: 54px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin: 0 22px;
    text-align: center;
  }
}
.publish-pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .publish-main {
    position: relative;
    width: 678px;
    border-radius: 16px;
    overflow: hidden;
    background-color: #fff;
    .top {
      background: #be2834;
      font-size: 34px;
      font-weight: 500;
      text-align: center;
      padding: 16px;
      color: #fff;
    }
    .info-box {
      padding: 0 26px;
      .box-1 {
        border-bottom: 1px solid #cccccc;
        padding: 24px 0;
        text-align: center;
        .t-1 {
          font-size: 32px;
          font-weight: 500;
        }
        .t-2 {
          color: #777777;
          margin-top: 8px;
        }
      }
      .box-2 {
        padding: 26px 0;
        .t-box {
          display: flex;
          margin-top: 12px;
          font-weight: 500;
          &:first-child {
            margin-top: 0;
          }
          .l-t {
            width: 300px;
            text-align: right;
          }
          .r-t {
            .on {
              color: #be2834;
              right: 4px;
            }
          }
        }
      }
    }
    .btn-box {
      display: flex;
      .btn {
        flex: 1;
        height: 88px;
        line-height: 88px;
        text-align: center;
        border: 1px solid #be2834;
        &.on {
          background: #be2834;
          color: #fff;
        }
      }
    }
  }
}
.c-p-select {
  width: 195px;
  height: 54px;
  background: #ffc424;
  .cont {
    font-weight: 500;
    font-size: 32px;
  }
  & > img {
    width: 36px;
    height: 36px;
  }
}
.visibility-list {
  ::v-deep {
    [role="radio"] {
      width: 50%;
    }
  }
}
.foot-desc {
  i {
    color: #000;
    margin: 0 8px;
  }
}
.f-28 {
  font-size: 28px !important;
}
.f-36 {
  font-size: 36px !important;
}
.f-32 {
  font-size: 32px !important;
}
.canlce {
  width: 180px;
  height: 98px;
  background: #484848;
}
.suer {
  width: 180px;
  height: 98px;
  background: #bf2935;
}
.foot-price {
  padding-left: 28px;
  color: #000;
  & > :last-child {
    color: #bf2935;
    margin-left: 18px;
  }
}
</style>
