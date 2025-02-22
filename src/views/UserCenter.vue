<template>
  <div class="c-page bg-grey">
    <AppTopBar topBarTitle="个人中心"></AppTopBar>
    <div class="item-box">
      <div class="item">
        <div class="left">头像</div>
        <div class="right">
          <van-uploader :after-read="afterRead" accept="image/*">
            <div class="center-center">
              <img
                :src="
                  user.headerImg
                    ? `${$baseURL}/${user.headerImg}`
                    : DefaultAvatar
                "
                class="img"
              />
              <van-icon name="arrow" class="arrow-icon" />
            </div>
          </van-uploader>
        </div>
      </div>
    </div>
    <div class="item-box">
      <!-- <div class="item" @click="$tool.goPage('/name-authentication')">
        <div class="left">实名认证</div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div> -->
      <div
        class="item"
        @click="$tool.goPage(bankCard.id ? '/edtMyCard' : '/bindCard')"
      >
        <div class="left">我的银行卡</div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="bindUsdt">
        <div class="left">我的USDT</div>
        <div class="right">
          <van-icon name="arrow" class="arrow-icon" />
        </div>
      </div>
      <div class="item" @click="$tool.goPage('/change-phone')">
        <div class="left">手机号码</div>
        <div class="right">
          {{ user.phone?.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") }}
          <!--user.phone 188****3221 -->
        </div>
      </div>
      <div class="item">
        <!-- @click="$tool.goPage('/nick-name')" -->
        <div class="left">昵称</div>
        <div class="right">
          {{ user.nickname }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultAvatar from "@/assets/img/DefaultAvatar.jpg";
import userApi from "@/api/user";
export default {
  name: "UserCenter",
  data() {
    return { DefaultAvatar };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    paySet() {
      return this.$store.state.paySet;
    },
    Cards() {
      return this.$store.state.bankCard;
    },
    bankCard() {
      return this.Cards.find((v) => +v.ctype === 2) || {};
    },
    usdtCard() {
      return this.Cards.find((v) => +v.ctype === 3) || {};
    },
  },
  methods: {
    async afterRead(file) {
      const [err] = await userApi.editHeader({
        file: file.file,
      });
      if (err) return;
      await this.sleep(1000);
      this.$store.dispatch("getInfo");
    },
    bindUsdt() {
      if (this.paySet !== 1) {
        this.$toast.fail("请先设置支付密码");
        return this.$router.push("/payPassword");
      }
      this.$router.push("/bindUsdt");
    },
  },
  async created() {
    this.$toast.loading({ duration: 0 });
    this.$store.dispatch("getPaySet");
    await this.$store.dispatch("getBankCard");
    this.$toast.clear();
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
