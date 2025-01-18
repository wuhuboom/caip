<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="支付密码"></AppTopBar>
    <van-form @submit="confirm">
      <div class="forms-input-wrap">
        <div class="input-box flex-wrap">
          <van-field
            v-model.trim="form.newpwd"
            class="input"
            type="text"
            placeholder="请输入新密码"
            :rules="[
              { required: true, message: $t('backapi.passwordIsEmpty') },
              {
                pattern: /^\d{6}$/,
                message: '支付密码必须是6位数字',
              },
            ]"
          />
        </div>
        <div class="input-box flex-wrap">
          <van-field
            v-model.trim="form.confirmed"
            class="input"
            type="text"
            placeholder="再次输入密码"
            :rules="[
              { required: true, message: $t('backapi.passwordIsEmpty') },
              {
                validator: validateTwo,
                message: this.$t('ruls.passtwo.unequal'),
              },
            ]"
          />
        </div>
        <div class="input-box flex-wrap">
          <van-field
            v-model.trim="form.code"
            class="input"
            type="text"
            placeholder="输入验证码"
            :rules="[{ required: true, message: '验证码不能为空' }]"
          />
          <div class="code-btn" @click="startCountdown">
            {{ isCounting ? countdown + "秒" : "获取验证码" }}
          </div>
        </div>
      </div>
      <van-button class="forms-submit-btn center-center" native-type="submit"
        >确认更改</van-button
      >
    </van-form>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "RegisterDialog",
  data() {
    return {
      countdown: 60,
      isCounting: false,
      interval: null,
      loading: false,
      form: {
        code: "",
        newpwd: "",
        confirmed: "",
      },
      showReg: false,
    };
  },
  methods: {
    validateTwo(value) {
      return value === this.form.newpwd;
    },
    async getCode() {
      await userApi.phoneCode();
    },
    async confirm() {
      if (this.loading) return;
      this.loading = true;
      const [err] = await userApi.editPwdPay(this.form);
      this.loading = false;
      if (err) return;
      this.$toast.success("支付密码设置成功");
      this.$router.back();
    },
    resCountdown() {
      this.countdown = 60;
      this.isCounting = false;
      this.interval && clearInterval(this.interval);
    },
    async startCountdown() {
      if (this.isCounting) return; // Prevent multiple clicks
      this.isCounting = true;
      await this.getCode();
      this.interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.interval);
          this.isCounting = false;
          this.countdown = 60; // Reset countdown
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    this.resCountdown();
  },
};
</script>
<style scoped lang="less"></style>
