<template>
  <div v-if="show" style="z-index: 999">
    <div class="cp-popup-mask"></div>
    <div class="cp-popup-main" style="width: 900px; height: 520px; z-index: 9">
      <div class="cp-popup-title">
        <div class="cp-popup-title-content">
          <div style="color: rgb(230, 162, 60)">提现申请</div>
          <i class="el-icon-close" @click="close" style="cursor: pointer"></i>
        </div>
      </div>
      <div class="cp-popup-body" style="width: 900px">
        <div class="cp-popup-body-content">
          <el-form
            :model="form"
            ref="numberValidateForm"
            class="el-form el-form--label-right el-form--inline"
          >
            <div class="bank-card-dialog-row m-b-16" style="margin-top: 30px">
              <div class="align-center">
                <label
                  class="el-form-item__label no-start"
                  style="width: 100px"
                >
                  <span class="recharge-dialog-span"> 提现方式</span>
                </label>
                <div class="align-center">
                  <!-- cp-popup-button-cancel cp-popup-button -->
                  <div
                    class="cp-button-main m-t-0 m-b-0 m-r-16"
                    v-for="(item, index) in typelist"
                    :class="
                      curType === item.id
                        ? 'cp-popup-button'
                        : 'cp-popup-button-cancel'
                    "
                    :key="index"
                    @click="changType(item.id)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="bank-card-dialog-row" v-if="curType === 0">
              <div class="common_layout_center_h" style="margin-right: 120px">
                <el-form-item
                  prop="cardName"
                  :rules="[{ required: true, message: '持卡人不能为空' }]"
                  class="is-required"
                >
                  <label
                    class="el-form-item__label no-start"
                    style="width: 100px"
                  >
                    <span class="recharge-dialog-span"> 持卡人</span>
                  </label>
                  <div class="el-form-item__content">
                    <input
                      disabled
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.cardName"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
              <div class="common_layout_center_h" v-if="curType === 0">
                <el-form-item
                  prop="identity"
                  :rules="[
                    { required: true, message: '身份证不能为空' },
                    { validator: idCardValidator, trigger: 'blur' },
                  ]"
                  class="is-required"
                >
                  <label
                    class="el-form-item__label no-start"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">身份证</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      disabled
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.identity"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="bank-card-dialog-row">
              <div
                v-if="curType === 0"
                class="common_layout_center_h"
                style="margin-right: 120px"
              >
                <div class="el-form-item is-required">
                  <el-form-item
                    prop="cardNumber"
                    :rules="[
                      { required: true, message: '银行卡号不能为空' },
                      { validator: bankCardValidator, trigger: 'blur' },
                    ]"
                    class="is-required"
                  >
                    <label
                      class="el-form-item__label no-start"
                      style="width: 100px"
                      ><span class="recharge-dialog-span">银行卡号</span></label
                    >
                    <div class="el-form-item__content">
                      <input
                        disabled
                        maxlength="30"
                        class="recharge-dialog-input"
                        v-model.trim="form.cardNumber"
                      /><!---->
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div
                v-else
                class="common_layout_center_h"
                style="margin-right: 120px"
              >
                <div class="el-form-item is-required">
                  <el-form-item
                    prop="cardNumber"
                    :rules="[
                      { required: true, message: 'USDT-TRC20地址不能为空' },
                    ]"
                    class="is-required"
                  >
                    <label
                      class="el-form-item__label no-start"
                      style="width: 100px"
                      ><span class="recharge-dialog-span"
                        >USDT-TRC20</span
                      ></label
                    >
                    <div class="el-form-item__content">
                      <input
                        disabled
                        maxlength="30"
                        class="recharge-dialog-input"
                        v-model.trim="form.cardNumber"
                        style="width: 280px"
                      /><!---->
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="common_layout_center_h" v-if="curType === 0">
                <el-form-item
                  prop="bankName"
                  :rules="[{ required: true, message: '银行名称不能为空' }]"
                  class="is-required"
                >
                  <label
                    class="el-form-item__label no-start"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">银行名称</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      disabled
                      maxlength="30"
                      class="recharge-dialog-input"
                      v-model.trim="form.bankName"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="bank-card-dialog-row" v-if="curType === 0">
              <div class="common_layout_center_h">
                <el-form-item
                  prop="subBranch"
                  :rules="[{ required: true, message: '开户支行不能为空' }]"
                  class="is-required"
                >
                  <label
                    class="el-form-item__label no-start"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">开户支行</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      disabled
                      style="width: 296px"
                      class="recharge-dialog-input"
                      v-model.trim="form.subBranch"
                    />
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="bank-card-dialog-row">
              <div class="common_layout_center_h" style="margin-right: 120px">
                <div class="el-form-item is-required">
                  <el-form-item
                    prop="money"
                    :rules="[{ validator: validMoney, trigger: 'blur' }]"
                    class="is-required"
                  >
                    <label class="el-form-item__label" style="width: 100px"
                      ><span class="recharge-dialog-span">提现金额</span></label
                    >
                    <div class="el-form-item__content">
                      <input
                        maxlength="30"
                        class="recharge-dialog-input"
                        v-model.trim="form.money"
                      /><!---->
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="common_layout_center_h">
                <el-form-item
                  prop="payPwd"
                  :rules="[{ required: true, message: '请输入支付密码' }]"
                  class="is-required"
                >
                  <label class="el-form-item__label" style="width: 100px"
                    ><span class="recharge-dialog-span">支付密码</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      maxlength="30"
                      type="password"
                      class="recharge-dialog-input"
                      v-model.trim="form.payPwd"
                    /><!---->
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <p>每日只可以提现三次,提现手续费为0.</p>
        </div>
      </div>

      <div class="center-center">
        <div
          class="cp-button-main cp-popup-button"
          @click="submitForm('numberValidateForm')"
          v-loading="loading"
          style="margin-right: 50px"
        >
          <!---->
          确定
        </div>
        <div class="cp-button-main cp-popup-button-cancel" @click="close">
          <!---->
          取消
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user";
// usdtId: this.typeValue,
// type: this.chooseRecType.type,
// money: +this.amount,
// payPwd: this.form.password,
// code: this.form.vercode,
const initForm = () => {
  return {
    ctype: 2,
    cardName: "",
    identity: "",
    cardNumber: "",
    bankName: "",
    subBranch: "",
  };
};
export default {
  name: "BindCard",
  data() {
    return {
      loading: false,
      show: false,
      form: initForm(),
      cart: {},
      typelist: [
        { name: "银行卡提现", id: 0 },
        { name: "usdt提现", id: 1 },
      ],
      curType: 0,
      //statusCheck 0待审核1通过2拒绝
    };
  },
  computed: {
    statusCheck() {
      return [
        { name: `您的${this.bankTxt}还在审核中,清审核通过再提现`, id: 0 },
        { name: `审核通过`, id: 1 },
        { name: `您的${this.bankTxt}审核不通过,无法提现`, id: 2 },
      ];
    },
    bankTxt() {
      return this.curType === 0 ? "银行卡" : "USDT地址";
    },
    Cards() {
      return this.$store.state.bankCard;
    },
    bankCard() {
      const doc = this.Cards.find((v) => +v.ctype === 2) || {};
      return doc;
    },
    usdtCard() {
      return this.Cards.find((v) => +v.ctype === 3) || {};
    },
  },
  methods: {
    changType(id) {
      if (!this.usdtCard.id && id === 1) {
        this.$message.error("请先绑定USDT地址");
        return;
      }
      this.curType = id;
      //curType = item.id
      this.resData(id === 0 ? this.bankCard : this.usdtCard);
    },
    validMoney(rule, value, callback) {
      //金额为正整数
      const moneyPattern = /^[1-9]\d*$/;
      if (!value) {
        callback(new Error("请输入提现金额"));
      } else if (!moneyPattern.test(value)) {
        callback(new Error("请输入有效的提现金额"));
      } else {
        callback();
      }
    },
    idCardValidator(rule, value, callback) {
      const idCardPattern =
        /^(^[1-9]\d{5}(18|19|20|21|22|23|24|25|26|27|28|29)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$)$/;
      if (!value) {
        callback(new Error("请输入身份证号"));
      } else if (!idCardPattern.test(value)) {
        callback(new Error("请输入有效的身份证号"));
      } else {
        callback();
      }
    },
    bankCardValidator(rule, value, callback) {
      const bankCardPattern = /^\d{16,19}$/;
      if (!value) {
        callback(new Error("请输入银行卡号"));
      } else if (!bankCardPattern.test(value)) {
        callback(new Error("请输入有效的银行卡号"));
      } else {
        callback();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.ajaxBindCard();
      });
    },
    async ajaxBindCard() {
      if (+this.form.statusCheck !== 1) {
        const msg =
          this.statusCheck.find((v) => +v.id === +this.form.statusCheck) || {};
        this.$message.error(msg.name);
        return;
      }
      this.loading = true;
      const [err] = await userApi.withdrawalReq({
        ...this.form,
      });
      this.loading = false;
      if (err) return;
      this.show = false;
      this.$store.dispatch("getBankCard");
      this.$message.success("提现成功.等待管理员审核");
    },
    async open() {
      this.$toast.loading({
        duration: 0,
      });
      await this.$store.dispatch("getBankCard");
      this.$toast.clear();
      this.resData(this.bankCard);
      this.show = true;
    },
    resData(obj) {
      this.form = {
        ...initForm(),
        ...obj,
        usdtId: obj.id,
        type: obj.ctype,
        money: "",
        payPwd: "",
      };
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.recharge-dialog-input {
  text-align: left;
  padding-left: 4px;
}
.el-form-item__label::before {
  content: "*";
  color: rgb(245, 108, 108);
  margin-right: 4px;
  margin-left: 4px;
}
.no-start {
  &:before {
    display: none;
  }
}
::v-deep {
  .el-form-item__error {
    left: 100px;
  }
}
</style>
