<template>
  <div v-if="show" style="z-index: 999">
    <div class="cp-popup-mask"></div>
    <div class="cp-popup-main" style="width: 900px; height: 400px; z-index: 9">
      <div class="cp-popup-title">
        <div class="cp-popup-title-content">
          <div style="color: rgb(230, 162, 60)">绑定银行卡</div>
          <i class="el-icon-close" @click="close" style="cursor: pointer"></i>
        </div>
      </div>
      <div class="cp-popup-body" style="width: 900px">
        <div class="cp-popup-body-content">
          <form class="el-form el-form--label-right el-form--inline">
            <div class="bank-card-dialog-row" style="margin-top: 30px">
              <div class="common_layout_center_h" style="margin-right: 120px">
                <div class="el-form-item is-required">
                  <label
                    for="AccountName"
                    class="el-form-item__label"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">持卡人</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      maxlength="30"
                      class="recharge-dialog-input"
                    /><!---->
                  </div>
                </div>
              </div>
              <div class="common_layout_center_h">
                <div class="el-form-item is-required">
                  <label
                    for="IdCard"
                    class="el-form-item__label"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">身份证</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      type="text"
                      maxlength="18"
                      class="recharge-dialog-input"
                    /><!---->
                  </div>
                </div>
              </div>
            </div>
            <div class="bank-card-dialog-row">
              <div class="common_layout_center_h" style="margin-right: 120px">
                <div class="el-form-item is-required">
                  <label
                    for="BankCardNo"
                    class="el-form-item__label"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">银行卡号</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      type="number"
                      maxlength="19"
                      class="recharge-dialog-input"
                    /><!---->
                  </div>
                </div>
              </div>
              <div class="common_layout_center_h">
                <div class="el-form-item is-required">
                  <label
                    for="BankName"
                    class="el-form-item__label"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">银行名称</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      maxlength="30"
                      class="recharge-dialog-input"
                    /><!---->
                  </div>
                </div>
              </div>
            </div>
            <div class="bank-card-dialog-row">
              <div class="common_layout_center_h">
                <div class="el-form-item is-required">
                  <label
                    for="BankBranch"
                    class="el-form-item__label"
                    style="width: 100px"
                    ><span class="recharge-dialog-span">开户支行</span></label
                  >
                  <div class="el-form-item__content">
                    <input
                      placeholder="填写格式：xx省xx市xx区xxxx支行"
                      class="recharge-dialog-input"
                      style="width: 632px"
                    /><!---->
                  </div>
                </div>
              </div>
            </div>
            <!---->
          </form>
        </div>
      </div>
      <div class="cp-popup-buttons">
        <div class="cp-button-main cp-popup-button" style="margin-right: 50px">
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
export default {
  name: "BindCard",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
