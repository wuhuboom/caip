<template>
  <div v-if="show" style="z-index: 999">
    <div width="1200" style="z-index: 999">
      <div class="cp-popup-mask"></div>
      <div
        class="cp-popup-main"
        style="width: 1200px; min-height: 400px; z-index: 9"
      >
        <div class="cp-popup-title">
          <div class="cp-popup-title-content">
            <div style="color: rgb(255, 236, 124)">走势图：河内五分彩</div>
            <i class="el-icon-close" @click="close" style="cursor: pointer"></i>
          </div>
        </div>
        <div class="cp-popup-body">
          <div class="cp-popup-body-content" style="overflow: hidden">
            <div class="charts-tabs">
              <div class="charts-tab-item charts-tab-item-active">
                五星走势图
              </div>
              <div class="charts-tab-item">五星综合走势图</div>
              <div class="charts-tab-item">前三综合走势图</div>
              <div class="charts-tab-item">中三综合走势图</div>
              <div class="charts-tab-item">后三综合走势图</div>
              <div class="charts-tab-item">前二综合走势图</div>
              <div class="charts-tab-item charts-tab-item-border">
                后二综合走势图
              </div>
            </div>
            <div class="charts-selects">
              <div class="row-start">
                <div class="cp-checkbox-main">
                  <div class="cp-checkbox-image"></div>
                  <div style="margin-left: 10px">遗漏</div>
                </div>
                <div class="cp-checkbox-main charts-interval">
                  <div class="cp-checkbox-image"></div>
                  <div style="margin-left: 10px">折线</div>
                </div>
              </div>
              <div class="row-start">
                <div class="charts-interval charts-interval-active">
                  最近30期
                </div>
                <div class="charts-interval">今日数据</div>
              </div>
            </div>
            <div class="table-header" style="max-width: 100%">
              <div
                class="table-header-border"
                style="width: 90px; line-height: 40px"
              >
                期数
              </div>
              <div
                class="table-header-border"
                style="width: 70px; line-height: 40px"
              >
                开奖号码
              </div>
              <div class="table-header-border" style="flex: 10 1 0%">
                <div>
                  <div
                    style="
                      line-height: 20px;
                      border-bottom: 1px solid rgb(198, 156, 65);
                    "
                  >
                    万位
                  </div>
                  <div class="table-row">
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div>0</div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        1
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        2
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        3
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        4
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        5
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        6
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        7
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        8
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-header-border" style="flex: 10 1 0%">
                <div>
                  <div
                    style="
                      line-height: 20px;
                      border-bottom: 1px solid rgb(198, 156, 65);
                    "
                  >
                    千位
                  </div>
                  <div class="table-row">
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div>0</div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        1
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        2
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        3
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        4
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        5
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        6
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        7
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        8
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-header-border" style="flex: 10 1 0%">
                <div>
                  <div
                    style="
                      line-height: 20px;
                      border-bottom: 1px solid rgb(198, 156, 65);
                    "
                  >
                    百位
                  </div>
                  <div class="table-row">
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div>0</div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        1
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        2
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        3
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        4
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        5
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        6
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        7
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        8
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-header-border" style="flex: 10 1 0%">
                <div>
                  <div
                    style="
                      line-height: 20px;
                      border-bottom: 1px solid rgb(198, 156, 65);
                    "
                  >
                    十位
                  </div>
                  <div class="table-row">
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div>0</div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        1
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        2
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        3
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        4
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        5
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        6
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        7
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        8
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-header-border" style="flex: 10 1 0%">
                <div>
                  <div
                    style="
                      line-height: 20px;
                      border-bottom: 1px solid rgb(198, 156, 65);
                    "
                  >
                    个位
                  </div>
                  <div class="table-row">
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div>0</div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        1
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        2
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        3
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        4
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        5
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        6
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        7
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        8
                      </div>
                    </div>
                    <div style="flex: 1 1 0%; line-height: 20px">
                      <div style="border-left: 1px solid rgb(198, 156, 65)">
                        9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="position: relative; overflow: hidden auto; height: 545px"
            >
              <div class="chart-table" style="max-width: 100%">
                <div class="table-row">
                  <div class="table-cell no-shrink" style="width: 90px">
                    20241214121
                  </div>
                  <div class="table-cell no-shrink" style="width: 70px">
                    3,8,8,5,5
                  </div>
                  <div class="table-row bg-blue" style="flex: 10 1 0%">
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class="blue-ball">3</div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                  </div>
                  <div class="table-row bg-yellow" style="flex: 10 1 0%">
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class="red-ball">8</div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                  </div>
                  <div class="table-row bg-blue" style="flex: 10 1 0%">
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class="green-ball">8</div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                  </div>
                  <div class="table-row bg-yellow" style="flex: 10 1 0%">
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class="red-ball">5</div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                  </div>
                  <div class="table-row bg-blue" style="flex: 10 1 0%">
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class="blue-ball">5</div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                    <div class="table-cell" style="flex: 1 1 0%">
                      <div class=""></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user";
const initForm = () => ({
  ctype: 3,
  identity: "",
  cardNumber: "",
  bankName: "TRC20",
  payPwd: "",
});
export default {
  name: "BindCard",
  data() {
    return {
      loading: false,
      show: false,
      form: initForm(),
    };
  },
  methods: {
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
      const trc20Pattern = /^T[a-zA-Z1-9]{10,}$/;
      if (!value) {
        callback(new Error("请输入 TRC20 地址"));
      } else if (!trc20Pattern.test(value)) {
        callback(new Error("请输入有效的 TRC20 地址"));
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
      this.loading = true;
      const [err] = await userApi.bindBankCard({
        ...this.form,
        cardNumberTwice: this.form.cardNumber,
      });
      this.loading = false;
      if (err) return;
      this.show = false;
      this.$store.dispatch("getBankCard");
    },
    open() {
      this.form = initForm();
      this.show = true;
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
::v-deep {
  .el-form-item__error {
    left: 200px;
  }
}
</style>
