<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="福彩3D开奖信息列表"></AppTopBar>
    <div class="lists-wrap">
      <div class="lists" v-for="i in 10" :key="i">
        <div class="left">
          <div class="time">第2017093期 08-10 10:30</div>
          <div class="info">
            <div class="item on center-center">07</div>
            <div class="item center-center">08</div>
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" color="#E5E5E5" />
        </div>
      </div>
    </div>
    <div class="buy-box">
      <div class="height"></div>
      <div class="btn center-center">去购彩</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WinningList",
  data() {
    return {};
  },
};
</script>
<style scoped lang="less">
.lists-wrap {
  padding-left: 28px;
  .lists {
    border-bottom: 1px solid #e5e5e5;
    padding: 24px 0;
    padding-right: 24px;
    display: flex;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }
    .left {
      flex: 1;
      margin-right: 40px;
      .info {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 60px;
          height: 60px;
          font-size: 32px;
          color: #bf2935;
          border-radius: 100%;
          margin-right: 20px;
          margin-top: 20px;
          &.on {
            background: #bf2935;
            color: #fff;
          }
        }
      }
    }
    .right {
      font-size: 32px;
    }
  }
}
.buy-box {
  .height {
    height: 98px;
  }
  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #bf2935;
    height: 98px;
    color: #fff;
    font-size: 32px;
  }
}
</style>
