<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="公告"></AppTopBar>
    <div class="lists-box">
      <div
        class="lists"
        v-for="i in 10"
        :key="i"
        @click="$tool.goPage('/notice-details')"
      >
        <div class="left text-ellipsis">
          <div class="name text-ellipsis">江苏快三加奖10%，活动三天</div>
          <div class="time">2017-08-14 15:20:36</div>
        </div>
        <div class="right">
          <van-icon name="arrow" color="#E5E5E5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppNotice",
  data() {
    return {};
  },
};
</script>
<style scoped lang="less">
.lists-box {
  .lists {
    padding: 24px 28px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    .left {
      flex: 1;
      margin-right: 40px;

      .name {
        font-size: 32px;
      }

      .time {
        color: #999999;
        font-size: 24px;
        margin-top: 5px;
      }
    }

    .right {
      font-size: 32px;
    }
  }
}
</style>
