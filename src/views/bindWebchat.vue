<template>
  <div class="c-page bg-grey">
    <AppTopBar
      :topBarTitle="usdtCard.id ? '修改微信账号' : '绑定微信账号'"
    ></AppTopBar>
    <van-form @submit="confirm">
      <div class="forms-input-wrap">
        <div class="input-box flex-wrap">
          <van-field
            v-model.trim="form.payPwd"
            class="input"
            type="password"
            placeholder="输入支付密码"
            :rules="[
              { required: true, message: $t('backapi.passwordIsEmpty') },
              {
                pattern: /^\d{6}$/,
                message: '支付密码必须是6位数字',
              },
            ]"
          />
        </div>
        <div class="input-box flex-column">
          <p class="input-title p-t-16 p-b-16">上传微信收款码</p>
          <van-uploader v-model="fileList" :after-read="afterRead" />
        </div>
      </div>

      <van-button class="forms-submit-btn center-center" native-type="submit"
        >确定</van-button
      >
    </van-form>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "bindCard",
  data() {
    return {
      form: {
        ctype: 1,
        identity: "",
        cardNumber: "",
        bankName: "微信",
        payPwd: "",
        fileList: [],
      },
    };
  },
  computed: {
    Cards() {
      return this.$store.state.bankCard;
    },
    bankCard() {
      const doc = this.Cards.find((v) => +v.ctype === 2) || {};
      return doc;
    },
    usdtCard() {
      return this.Cards.find((v) => +v.ctype === 1) || {};
    },
  },
  methods: {
    async afterRead({ file }) {
      //type "image/jpeg"
      if (file.type.indexOf("image/") === -1) {
        this.$toast("请上传图片");
        return;
      }
      //限制图片大小10M
      if (file.size > 1024 * 1024 * 10) {
        this.$toast("图片大小不能超过10M");
        return;
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      const [err, res] = await userApi.uploadImg({ file });
      if (err) return;
      this.$toast.clear();
      console.log(res);
      // this.sendMessage({
      //   data: res.data,
      //   type: 3,
      // });
    },
    bankCardValidator(value) {
      const bankCardPattern = /^\d{16,19}$/;
      return bankCardPattern.test(value);
    },
    idCardValidator(value) {
      const idCardPattern =
        /^(^[1-9]\d{5}(18|19|20|21|22|23|24|25|26|27|28|29)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$)$/;
      return idCardPattern.test(value);
    },
    async confirm() {
      this.$toast.loading({ duration: 0 });
      const keys = this.usdtCard.id ? "bindBankCardEditReq" : "bindBankCard";
      const [err] = await userApi[`${keys}`]({
        ...this.form,
        cardNumberTwice: this.form.cardNumber,
      });

      if (err) return;
      this.$toast.success("绑定成功");
      this.$router.back();
      this.$store.dispatch("getBankCard");
    },
  },
  async created() {
    await this.$store.dispatch("getBankCard");
    Object.assign(this.form, this.usdtCard);
  },
};
</script>
<style scoped lang="less"></style>
