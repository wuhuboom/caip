<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="充值">
      <template v-slot:right>
        <div class="right-box">充值记录</div>
      </template>
    </AppTopBar>
    <div class="item-box">
      <div class="left">账户余额</div>
      <div class="right on">0.00元</div>
    </div>
    <div class="cz-box">
      <div class="item-box">
        <div class="left">充值金额</div>
        <div class="right">10.00元</div>
      </div>
      <div class="num-box">
        <div class="num on">50元</div>
        <div class="num">100元</div>
        <div class="num">500元</div>
        <div class="num">100元</div>
      </div>
    </div>
    <div class="fs-box">
      <div class="item on">
        <div class="left">
          <div class="zf-icon zhifubao"></div>
          <div class="name">支付宝充值<span class="on">(2%手续费)</span></div>
        </div>
        <div class="right">
          <van-icon name="checked" class="check-icon" />
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="zf-icon weixin"></div>
          <div class="name">微信充值</div>
        </div>
        <div class="right">
          <van-icon name="circle" class="check-icon" />
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="zf-icon yinhang"></div>
          <div class="name">银行卡充值</div>
        </div>
        <div class="right">
          <van-icon name="circle" class="check-icon" />
        </div>
      </div>
    </div>
    <div class="ts-box">
      <div class="content-box">
        <div class="tips">
          <van-icon name="info" class="tips-icon" />
          温馨提示
        </div>
        <div class="li">
          1.每次充值时，请获取最新的收款账户信息，禁止保存收款账户信息。
        </div>
        <div class="li">
          2.禁止使用之前的收款账户进行支付，因使用过期收款账户充值而导致的损失，平台概不负责。
        </div>
        <div class="li">
          3.使用本平台进行洗钱或诈骗活动的，平台有权终止会员服务并冻结相关账户。
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="height"></div>
      <div class="btn-box">
        <div class="btn center-center">立即充值</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppRecharge",
  data() {
    return {};
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
.item-box {
  display: flex;
  background: #fff;
  padding: 30px 28px;
  .left {
    flex: 1;
  }
  .on {
    color: #bf2935;
  }
}
.cz-box {
  margin-top: 20px;
  background: #fff;
  .num-box {
    border-top: 1px solid #e5e5e5;
    padding-bottom: 26px;
    padding-left: 28px;
    display: flex;
    flex-wrap: wrap;
    .num {
      margin-top: 26px;
      margin-right: 26px;
      width: 154px;
      height: 68px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666666;
      border-radius: 12px 12px 12px 12px;
      border: 1px solid #666666;
      overflow: hidden;
      &.on {
        border: 1px solid #bf2935;
        color: #bf2935;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          right: -1px;
          bottom: -1px;
          width: 36px;
          height: 36px;
          background: url("@/assets/img/Recharge/gou.png") no-repeat;
          background-size: 100% auto;
        }
      }
    }
  }
}
.fs-box {
  background-color: #fff;
  margin-top: 20px;
  .item {
    margin-left: 28px;
    border-bottom: 1px solid #e5e5e5;
    padding: 22px 0;
    padding-right: 28px;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    &.on {
      .check-icon {
        color: #bf2935 !important;
      }
    }
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .on {
        font-size: 24px;
        color: #bf2834;
      }
      .zf-icon {
        width: 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        margin-right: 20px;
        &.zhifubao {
          background-image: url("@/assets/img/Recharge/zhifubao.png");
        }
        &.weixin {
          background-image: url("@/assets/img/Recharge/weixin.png");
        }
        &.yinhang {
          background-image: url("@/assets/img/Recharge/yinhang.png");
        }
      }
    }
    .right {
      .check-icon {
        font-size: 40px;
        color: #e5e5e5;
      }
    }
  }
}
.ts-box {
  padding: 32px 28px;
  .content-box {
    background: #f3f3f3;
    border-radius: 10px 10px 10px 10px;
    padding: 16px 28px;
    font-size: 22px;
    color: #999999;
    .tips {
      display: flex;
      color: #c82834;
      align-items: center;
      margin-bottom: 12px;
      .tips-icon {
        margin-right: 12px;
        color: #c82834;
        font-size: 36px;
      }
    }
    .li {
      margin-top: 2px;
    }
  }
}
.bottom-box {
  .height {
    height: 152px;
  }
  .btn-box {
    padding: 32px 28px;
    background: #f9f9f9;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .btn {
      height: 88px;
      border-radius: 126px 126px 126px 126px;
      background: #bf2935;
      font-size: 32px;
      color: #ffffff;
    }
  }
}
</style>
