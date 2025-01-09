<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="个人中心"></AppTopBar>
    <div class="item-box">
      <div class="item">
        <div class="left">头像</div>
        <div class="right">
          <van-uploader>
            <div class="center-center">
              <img src="" class="img" />
              <van-icon name="arrow" class="arrow-icon" />
            </div>
          </van-uploader>
        </div>
      </div>
    </div>
    <div class="item-box">
      <div class="item" @click="$tool.goPage('/nick-name')">
        <div class="left">昵称</div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/name-authentication')">
        <div class="left">实名认证</div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/binding')">
        <div class="left">我的银行卡</div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/change-phone')">
        <div class="left">手机号码</div>
        <div class="right">188****3221</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {};
  },
};
</script>
<style scoped lang="less">
.item-box {
  background: #fff;
  margin-bottom: 20px;
  .item {
    margin-left: 28px;
    padding-top: 28px;
    padding-bottom: 28px;
    padding-right: 28px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    .img {
      width: 96px;
      height: 96px;
      border-radius: 100%;
      margin-right: 24px;
    }
    .left {
      flex: 1;
    }
    .right {
      display: flex;
      align-items: center;
      .arrow-icon {
        font-size: 36px;
        color: #ccc;
      }
    }
  }
}
</style>
