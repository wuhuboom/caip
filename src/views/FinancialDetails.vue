<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="资金明细">
      <template v-slot:right>
        <div class="right-box" @click="selectType">
          近一周
          <van-icon name="arrow-down" class="arrow" />
        </div>
      </template>
    </AppTopBar>
    <div class="info-box">
      <div class="num">8888.88</div>
      <div class="text">账户余额(元)</div>
    </div>
    <!-- 没有内容 -->
    <div class="empty-box center-center" v-if="0">
      <div class="img"></div>
      <div class="text">您暂无账目明细记录</div>
    </div>
    <div class="pay-list">
      <div class="list" v-for="(list, index) in payLists" :key="index">
        <div class="left">
          <div class="img" :class="[list.type]"></div>
          <div class="n-box">
            <div class="name">{{ list.name }}</div>
            <div class="time">{{ list.time }}</div>
          </div>
        </div>
        <div class="right">
          <div
            class="num"
            :class="{
              fu: list.num.includes('-'),
            }"
          >
            {{ list.num }}
          </div>
          <van-icon name="arrow" v-if="list.isDetails" class="arrow" />
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model="selectShow"
      :actions="selectActions"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<script>
export default {
  name: "FinancialDetails",
  data() {
    return {
      selectShow: false,
      selectActions: [
        { name: "近一周" },
        { name: "近一月" },
        { name: "近三月" },
      ],
      payLists: [
        {
          name: "支付宝充值",
          time: "2017-08-13 23:30:30",
          num: "+10.00",
          type: "zhifubao",
        },
        {
          name: "银行卡充值",
          time: "2017-08-13 23:30:30",
          num: "+10.00",
          type: "yinhangka",
        },
        {
          name: "微信充值",
          time: "2017-08-13 23:30:30",
          num: "+10.00",
          type: "weixin",
        },
        {
          name: "提现失败退款",
          time: "2017-08-13 23:30:30",
          num: "+10250.00",
          type: "shibai",
          isDetails: true,
        },
        {
          name: "提现到账",
          time: "2017-08-13 23:30:30",
          num: "-10250.00",
          type: "shibai",
          isDetails: true,
        },
        {
          name: "保底返还",
          time: "2017-08-13 23:30:30",
          num: "+3.00",
          type: "fanhuan",
          isDetails: true,
        },
      ],
    };
  },
  methods: {
    selectType() {
      this.selectShow = true;
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
    .arrow {
      font-size: 32px;
      margin-left: 5px;
    }
  }
}
.info-box {
  padding: 42px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .num {
    color: #bf2935;
    font-size: 60px;
    font-weight: bold;
  }
  .text {
    color: #666666;
    margin-top: 6px;
  }
}
.pay-list {
  .list {
    background: #fff;
    display: flex;
    padding: 24px 28px;
    align-items: center;
    margin-bottom: 20px;
    .left {
      display: flex;
      align-items: center;
      .img {
        height: 80px;
        width: 80px;
        margin-right: 14px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        &.fanhuan {
          background-image: url("@/assets/img/FinancialDetails/fanhuan.png");
        }
        &.shibai {
          background-image: url("@/assets/img/FinancialDetails/shibai.png");
        }
        &.weixin {
          background-image: url("@/assets/img/FinancialDetails/weixin.png");
        }
        &.yinhangka {
          background-image: url("@/assets/img/FinancialDetails/yinhangka.png");
        }
        &.zhifubao {
          background-image: url("@/assets/img/FinancialDetails/zhifubao.png");
        }
      }
      .n-box {
        .name {
          font-size: 30px;
        }
        .time {
          font-size: 24px;
          color: #999999;
          margin-top: 4px;
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .num {
        font-size: 32px;
        color: #bf2935;
        &.fu {
          color: #000000;
        }
      }
      .arrow {
        font-size: 32px;
        margin-left: 6px;
        color: #999999;
      }
    }
  }
}
.empty-box {
  flex-direction: column;
  margin: 200px auto;
  .img {
    width: 200px;
    height: 200px;
    background: url("@/assets/img/PurchaseRecord/kong.png") no-repeat;
    background-size: 100% auto;
  }
  .text {
    color: #cccccc;
    margin-top: 50px;
  }
}
</style>
