<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="购彩记录">
      <template v-slot:right>
        <div class="right-box">
          近一周
          <van-icon name="arrow-down" class="arrow" />
        </div>
      </template>
    </AppTopBar>
    <div class="tab-box">
      <div class="tab on">全部</div>
      <div class="tab">待开奖</div>
      <div class="tab">已开奖</div>
    </div>
    <!-- 没有内容 -->
    <div class="empty-box center-center" v-if="0">
      <div class="img"></div>
      <div class="text">暂无购彩记录，开启您的大奖之旅吧</div>
      <div class="btn center-center">去购彩</div>
    </div>
    <div class="lists-box">
      <div
        class="lists"
        v-for="i in 3"
        :key="i"
        :class="{
          bonus: i === 2,
        }"
        @click="$tool.goPage('/purchase-record-details')"
      >
        <div class="top">
          <div class="left">排列三</div>
          <div class="right">第20170903期</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="d1 text-ellipsis">
              投注金额：<span class="on">10000.00元</span>
            </div>
            <div class="d2">投注时间：2017-08-13 23:00:00</div>
          </div>
          <div class="right">
            <div v-if="i === 2" class="num text-ellipsis">1000000000.00元</div>
            <div v-else>待开奖</div>
            <van-icon name="arrow" class="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchaseRecord",
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
    .arrow {
      font-size: 32px;
      margin-left: 5px;
    }
  }
}
.tab-box {
  display: flex;
  background: #fff;
  justify-content: space-around;
  .tab {
    width: 120px;
    height: 98px;
    line-height: 98px;
    text-align: center;
    color: #999999;
    &.on {
      color: #bf2935;
      border-bottom: 4px solid #bf2935;
      font-weight: bold;
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
  .btn {
    width: 600px;
    height: 98px;
    background: #bf2935;
    border-radius: 50px 50px 50px 50px;
    color: #fff;
    font-size: 32px;
    color: #ffffff;
    margin-top: 180px;
  }
}
.lists-box {
  .lists {
    background: #fff;
    margin-top: 20px;
    position: relative;
    &.bonus {
      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 120px;
        height: 120px;
        background: url("@/assets/img/PurchaseRecord/Group.png") no-repeat;
        background-size: 100% auto;
        margin-top: -60px;
      }
    }
    .top {
      border-bottom: 1px solid #e5e5e5;
      padding: 30px 32px;
      display: flex;
      align-items: center;
      .left {
        flex: 1;
      }
      .right {
        font-size: 26px;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      padding: 24px 28px;
      .left {
        flex: 1;
        .d1 {
          max-width: 400px;
          .on {
            color: #bf2935;
          }
        }
        .d2 {
          color: #999999;
          font-size: 24px;
          margin-top: 2px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        .arrow {
          font-size: 32px;
          color: #999999;
          margin-left: 10px;
        }
        .num {
          color: #bf2935;
          max-width: 300px;
        }
      }
    }
  }
}
</style>
