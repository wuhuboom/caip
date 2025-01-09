<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="下级⽤户列表">
      <template v-slot:right>
        <div class="right-box">邀请好友</div>
      </template>
    </AppTopBar>
    <div class="table-lists">
      <div class="row hearder">
        <div class="col">昵称</div>
        <div class="col">投注</div>
        <div class="col">佣金</div>
        <div class="col">余额</div>
        <div class="col">注册日期</div>
      </div>
      <div class="row" v-for="i in 20" :key="i">
        <div class="col">乘⻛破浪</div>
        <div class="col">0.00</div>
        <div class="col">0.00</div>
        <div class="col">0.00</div>
        <div class="col">12-11-1</div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="height"></div>
      <div class="btn">合计佣金：10.00</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromotionCommission",
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
.table-lists {
  .hearder {
    background: #f0f0f0;
    color: #333 !important;
    margin: 0 !important;
    padding: 0 30px;
  }
  .row {
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    color: #777777;
    border-bottom: 1px solid #eaeaea;
    margin: 0 30px;
    align-items: center;
  }
  .col {
    padding: 24px 0;
    text-align: center;
  }
}
.bottom-btn {
  .height {
    height: 126px;
  }
  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 126px;
    line-height: 126px;
    background: #ffe7e9;
    padding: 0 34px;
    font-size: 30px;
  }
}
</style>
