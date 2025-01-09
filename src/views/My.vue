<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="我的" :showLeft="false">
      <template v-slot:right>
        <div class="right-box">
          <van-icon name="setting-o" @click="$tool.goPage('/set-up')" />
        </div>
      </template>
    </AppTopBar>
    <div class="tx-box">
      <div class="t-1" @click="$tool.goPage('/user-center')">
        <div class="left">
          <div class="img-box">
            <img src="" class="img" />
          </div>
          <div class="info">
            <div class="name">
              <div class="lin text-ellipsis">Patrick Lin</div>
              <div class="hy-icon"></div>
            </div>
            <div class="text">ID: 10038</div>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="t-2">
        <div class="item">
          <div class="num">120,00</div>
          <div class="text">可用余额(元)</div>
        </div>
        <div class="item">
          <div class="num">88,00</div>
          <div class="text">彩金</div>
        </div>
        <div class="item">
          <div class="num">220,00</div>
          <div class="text">可提现余额</div>
        </div>
      </div>
    </div>
    <div class="cz-box">
      <div class="item center-center" @click="$tool.goPage('/recharge')">
        <div class="name">充值</div>
      </div>
      <div class="item center-center" @click="$tool.goPage('/withdrawal')">
        <div class="name">
          提现
          <div class="num center-center">2</div>
        </div>
      </div>
    </div>
    <div class="lists-box">
      <div class="item" @click="$tool.goPage('/purchase-record')">
        <div class="left">
          <div class="l-icon i-1"></div>
          <div class="name">购彩记录</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="l-icon i-2"></div>
          <div class="name">资金明细</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/my-buy')">
        <div class="left">
          <div class="l-icon i-8"></div>
          <div class="name">合买记录</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="l-icon i-9"></div>
          <div class="name">追号记录</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/my-discount')">
        <div class="left">
          <div class="l-icon i-3"></div>
          <div class="name">优惠活动</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/promotion-commission')">
        <div class="left">
          <div class="l-icon i-4"></div>
          <div class="name">推广佣金</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/invite-friends')">
        <div class="left">
          <div class="l-icon i-5"></div>
          <div class="name">邀请好友</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/chat')">
        <div class="left">
          <div class="l-icon i-6"></div>
          <div class="name">在线客服</div>
        </div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
    </div>
    <AppBtmBar></AppBtmBar>
  </div>
</template>

<script>
export default {
  name: "AppMy",
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
    font-size: 40px;
  }
}
.tx-box {
  background: #fff;
  .t-1 {
    display: flex;
    padding: 40px 28px 30px;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .img {
        width: 96px;
        height: 96px;
        border-radius: 100%;
        display: block;
      }
      .info {
        margin-left: 24px;
        .name {
          font-size: 32px;
          display: flex;
          align-items: center;
          .lin {
            max-width: 300px;
          }
          .hy-icon {
            width: 32px;
            height: 32px;
            margin-left: 14px;
            background: url("@/assets/img/My/m7.png") no-repeat;
            background-size: 100% auto;
          }
        }
        .text {
          color: #666666;
        }
      }
    }
    .right {
      .arrow-icon {
        color: #ccc;
        font-size: 36px;
      }
    }
  }
  .t-2 {
    display: flex;
    border-top: 1px solid #e5e5e5;
    .item {
      padding: 26px 0;
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &::after {
        content: "";
        position: absolute;
        right: 0;
        width: 1px;
        height: 60px;
        background: #e5e5e5;
        top: 50%;
        margin-top: -30px;
      }
      &:last-child::after {
        display: none;
      }
      .num {
        font-size: 36px;
      }
      .text {
        color: #999999;
        font-size: 20px;
        margin-top: 6px;
      }
    }
  }
}
.cz-box {
  margin-top: 20px;
  display: flex;
  background: #fff;
  .item {
    flex: 1;
    height: 96px;
    font-size: 32px;
    color: #333333;
    font-weight: bold;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      width: 1px;
      height: 60px;
      background: #e5e5e5;
      top: 50%;
      margin-top: -30px;
    }
    &:last-child::after {
      display: none;
    }
    .name {
      position: relative;
      .num {
        position: absolute;
        right: -20px;
        top: -10px;
        background: #f33e45;
        color: #fff;
        font-size: 20px;
        border-radius: 20px;
        padding: 0 8px;
        min-width: 30px;
        height: 30px;
        font-weight: 400;
      }
    }
  }
}
.lists-box {
  padding-left: 28px;
  background: #fff;
  margin-top: 20px;
  .item {
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    padding: 24px 0;
    padding-right: 20px;
    &:last-child {
      border-bottom: none;
    }
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .l-icon {
        background-repeat: no-repeat;
        background-size: 100% auto;
        width: 48px;
        height: 48px;
        margin-right: 14px;
        &.i-1 {
          background-image: url("@/assets/img/My/m3.png");
        }
        &.i-2 {
          background-image: url("@/assets/img/My/m2.png");
        }
        &.i-3 {
          background-image: url("@/assets/img/My/m1.png");
        }
        &.i-4 {
          background-image: url("@/assets/img/My/m5.png");
        }
        &.i-5 {
          background-image: url("@/assets/img/My/m6.png");
        }
        &.i-6 {
          background-image: url("@/assets/img/My/m4.png");
        }
        &.i-8 {
          background-image: url("@/assets/img/My/m8.png");
        }
        &.i-9 {
          background-image: url("@/assets/img/My/m9.png");
        }
      }
    }
    .right {
      .arrow-icon {
        color: #ccc;
        font-size: 36px;
      }
    }
  }
}
</style>
