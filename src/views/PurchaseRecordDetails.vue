<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="订单详情"></AppTopBar>
    <div class="info-box">
      <div class="d1-box">
        <div class="left">
          <div class="img"></div>
          <div>排列三</div>
        </div>
        <div class="right">第20170903期</div>
      </div>
      <div class="d2-box">
        <div class="item">
          <div class="t1">24.00</div>
          <div class="t2">投注金额(元)</div>
        </div>
        <div class="item">
          <div class="t1">1%</div>
          <div class="t2">合买占比</div>
        </div>
        <div class="item">
          <div class="t1 on">100,000,000.00</div>
          <div class="t2">中奖金额(元)</div>
        </div>
      </div>
    </div>
    <div class="zj-box">
      <div class="title">开奖号码</div>
      <div class="content-kj">
        <div class="num on">07</div>
        <div class="num on">07</div>
        <div class="num on">07</div>
      </div>
      <div class="title">投注内容</div>
      <div class="content-tz">
        <div class="list">
          <div class="name">第一位</div>
          <div class="n-box">
            <div class="num">07</div>
            <div class="num">07</div>
            <div class="num">07</div>
          </div>
        </div>
        <div class="list">
          <div class="name">第一位</div>
          <div class="n-box">
            <div class="num">07</div>
            <div class="num">07</div>
            <div class="num">07</div>
          </div>
        </div>
        <div class="list">
          <div class="name">第一位</div>
          <div class="n-box">
            <div class="num">07</div>
            <div class="num">07</div>
            <div class="num">07</div>
          </div>
        </div>
        <div class="b-box">后三直选 12注 24元</div>
      </div>
    </div>
    <div class="bh-box">
      <div class="left">
        <div class="t-1">方案编号：CP57118603626</div>
        <div class="t-2">投注时间：2017-08-11 11:56:56</div>
      </div>
      <div class="right">
        <div class="copy" @click="copy">复制</div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="height"></div>
      <div class="btn">再次购买</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "PurchaseRecordDetails",
  data() {
    return {};
  },
  methods: {
    copy() {
      navigator.clipboard.writeText("复制的内容").then(() => {
        Toast("复制成功");
      });
    },
  },
};
</script>
<style scoped lang="less">
.info-box {
  background: #fff;
  .d1-box {
    display: flex;
    align-items: center;
    padding: 16px 30px;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 32px;
      font-weight: bold;
      .img {
        width: 66px;
        height: 66px;
        background: url("@/assets/img/PurchaseRecordDetails/pai.png") no-repeat;
        background-size: 100% auto;
        margin-right: 24px;
      }
    }
    .right {
      font-size: 26px;
    }
  }
  .d2-box {
    display: flex;
    border-top: 1px solid #e5e5e5;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 24px 0;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        background: #e5e5e5;
        height: 60px;
        width: 1px;
        margin-top: -30px;
      }
      &:last-child:after {
        display: none;
      }
      .t2 {
        color: #999999;
        font-size: 24px;
        margin-top: 10px;
      }
      .on {
        color: #bf2935;
      }
    }
  }
}
.zj-box {
  .title {
    font-size: 24px;
    margin-top: 32px;
    margin-bottom: 22px;
    text-align: center;
  }
  .content-kj {
    width: 660px;
    background: #ffffff;
    box-shadow: 0px 2 16px 2px rgba(0, 0, 0, 0.1);
    border-radius: 6px 6px 6px 6px;
    padding: 28px 32px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  .num {
    font-size: 32px;
    margin-right: 22px;
    color: #666666;
    &.on {
      color: #bf2935;
    }
  }
  .content-tz {
    width: 660px;
    background: #ffffff;
    box-shadow: 0px 2 16px 2px rgba(0, 0, 0, 0.1);
    border-radius: 6px 6px 6px 6px;
    margin: 0 auto;
    .list {
      padding: 20px 34px;
      border-top: 1px dashed #e5e5e5;
      &:first-child {
        border-top: none;
      }
      .name {
        color: #999999;
        font-size: 24px;
        margin-bottom: 4px;
      }
      .n-box {
        display: flex;
      }
    }
    .b-box {
      padding: 26px 0;
      text-align: center;
      border-top: 1px solid #e5e5e5;
    }
  }
}
.bh-box {
  padding: 0 42px;
  color: #999999;
  margin-top: 40px;
  display: flex;
  padding-bottom: 40px;
  .left {
    flex: 1;
    font-size: 24px;
    .t-2 {
      margin-top: 14px;
    }
  }
  .copy {
    border-radius: 6px 6px 6px 6px;
    background: #e5e5e5;
    height: 46px;
    line-height: 46px;
    padding: 0 22px;
    font-size: 20px;
  }
}
.bottom-box {
  .height {
    height: 98px;
  }
  .btn {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 98px;
    line-height: 98px;
    text-align: center;
    color: #fff;
    background: #bf2935;
    font-size: 32px;
  }
}
</style>
