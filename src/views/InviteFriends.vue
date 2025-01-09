<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="邀请好友"></AppTopBar>
    <div class="i-main">
      <div class="title">推荐链接</div>
      <div class="l-box">
        <div class="left">https://huaban.com/pins</div>
        <div class="right center-center" @click="copy">复制链接地址</div>
      </div>
      <div class="text">
        你可以将以上地址通过QQ、MSN、微博、邮件等⽅式发给您的好友
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "InviteFriends",
  data() {
    return {};
  },
  methods: {
    copy() {
      navigator.clipboard.writeText("https://huaban.com/pins").then(() => {
        Toast("复制成功");
      });
    },
  },
};
</script>
<style scoped lang="less">
.i-main {
  padding: 28px;
  .title {
    font-size: 36px;
    font-weight: 500;
    padding-bottom: 40px;
    border-bottom: 1px solid #ccc;
  }
  .l-box {
    padding-top: 40px;
    padding-bottom: 80px;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      color: #3e4cde;
      width: 500px;
      word-break: break-all;
      margin-right: 50px;
    }
    .right {
      color: #be2834;
      font-weight: 500;
      width: 210px;
      height: 58px;
      border: 4px solid #c33743;
    }
  }
  .text {
    font-size: 24px;
    color: #a2a2a2;
  }
}
</style>
