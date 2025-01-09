<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="忘了密码"></AppTopBar>
    <div class="input-wrap">
      <div class="input-box flex-wrap">
        <input class="input" type="text" placeholder="请输入新密码" />
      </div>
      <div class="input-box flex-wrap">
        <input class="input" type="text" placeholder="再次输入密码" />
      </div>
      <div class="input-box flex-wrap">
        <input class="input" type="text" placeholder="已绑定手机号" />
      </div>
      <div class="input-box flex-wrap">
        <input class="input" type="text" placeholder="输入验证码" />
        <div class="code-btn">获取验证码</div>
      </div>
    </div>
    <div class="submit-btn center-center">确认更改</div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {};
  },
};
</script>
<style scoped lang="less">
.input-wrap {
  background: #fff;

  .input-box {
    padding: 0 28px;
    border-bottom: 1px solid #e5e5e5;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }
  }

  .input {
    flex: 1;
    height: 96px;
    border: none;
  }

  .code-btn {
    color: #bf2834;
  }
}

.submit-btn {
  width: 694px;
  height: 88px;
  background: #bf2935;
  border-radius: 126px 126px 126px 126px;
  color: #fff;
  font-size: 32px;
  margin: 0 auto;
  margin-top: 132px;
}
</style>
