<template>
  <div class="c-page bg-grey">
    <AppTopBar
      topBarTitle="开奖结果"
      :showLeft="false"
      :showRight="false"
    ></AppTopBar>
    <div class="top-box">
      <div class="t-1">
        <div class="num item">9</div>
        <div class="num item">2</div>
        <div class="num item">3</div>
        <div class="item">亿</div>
        <div class="num item">8</div>
        <div class="num item">9</div>
        <div class="num item">6</div>
        <div class="num item">4</div>
        <div class="item">万</div>
      </div>
      <div class="t-2">平台累计中奖(元)</div>
    </div>
    <div class="lists-box">
      <div
        class="lists"
        v-for="i in 10"
        :key="i"
        @click="$tool.goPage('/winning-list')"
      >
        <div class="info">
          <div class="t-1">
            <span class="s-1">福彩3D</span>
            <span class="s-2">第2017093期 08-10 10:3</span>
          </div>
          <div class="t-2">
            <div class="item">08</div>
            <div class="item">08</div>
            <div class="item">08</div>
            <div class="item">08</div>
            <div class="item blue">07</div>
          </div>
        </div>
        <van-icon name="arrow" class="icon" color="#E5E5E5" />
      </div>
    </div>
    <AppBtmBar></AppBtmBar>
  </div>
</template>

<script>
export default {
  name: "DrawWinnerResult",
  data() {
    return {};
  },
};
</script>
<style scoped lang="less">
.top-box {
  padding-top: 24px;
  padding-bottom: 20px;
  text-align: center;
  .t-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bf2935;
    font-size: 40px;
    .num {
      height: 78px;
      background: #fff;
      border-radius: 12px 12px 12px 12px;
      padding: 0 12px;
      font-size: 60px;
      font-weight: bold;
    }
    .item {
      margin-right: 6px;
    }
  }
  .t-2 {
    color: #666666;
    margin-top: 20px;
  }
}
.lists-box {
  padding-left: 28px;
  background: #fff;
  .lists {
    border-bottom: 1px solid #e5e5e5;
    padding: 24px 0;
    display: flex;
    padding-right: 28px;
    align-items: center;
    .info {
      flex: 1;
      .t-1 {
        .s-1 {
          font-size: 30px;
        }
        .s-2 {
          color: #999999;
          font-size: 24px;
          margin-left: 18px;
        }
      }
      .t-2 {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 60px;
          height: 60px;
          background: #bf2935;
          color: #fff;
          border-radius: 100%;
          line-height: 60px;
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          margin-right: 20px;
          margin-top: 18px;
          &.blue {
            background: #3291ff;
          }
        }
      }
    }
    .icon {
      font-size: 28px;
    }
  }
}
</style>
