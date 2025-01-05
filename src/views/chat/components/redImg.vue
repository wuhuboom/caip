<template>
  <div class="m-t-4 red-img">
    <img class="d-img pointer" :src="red1" alt="" @click="open" />
    <van-popup class="popupOpen pointer" v-model="showOpen">
      <ul class="flex-column center-center font14">
        <li class="align-center font14">
          <img
            class="d-img user-red m-r-8"
            :src="
              doc.img
                ? doc.img.includes('http')
                  ? doc.img
                  : `${$baseURL}/${doc.img}`
                : userPic
            "
          />
          收到{{ doc.user }}的红包
        </li>
        <li class="d-desc m-t-12">恭喜发财, 大吉大利</li>
      </ul>
    </van-popup>
    <van-popup class="popupFinish" v-model="showFinish">
      <ul class="flex-column center-center font14 m-b-8">
        <li class="align-center font14 names">
          <img
            class="d-img user-red m-r-8"
            :src="
              doc.img
                ? doc.img.includes('http')
                  ? doc.img
                  : `${$baseURL}/${doc.img}`
                : userPic
            "
          />
          收到{{ doc.user }}的红包
        </li>
        <li class="d-desc m-b-8">恭喜发财, 大吉大利</li>
        <li class="d-meng d-flex m-b-8">
          1212.00
          <span>元</span>
        </li>
        <li class="view pointer">
          全部领取记录<van-icon :size="12" name="arrow" />
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
import red1 from "@/assets/img/red1.png";
import red2 from "@/assets/img/red2.png";
export default {
  name: "RedImg",
  data() {
    return {
      red1,
      red2,
      showOpen: false,
      showFinish: false,
    };
  },
  props: {
    doc: {
      type: Object,
      default: () => {},
    },
    userPic: {
      type: String,
      default: "",
    },
  },
  methods: {
    open() {
      this.showFinish = true;
    },
  },
};
</script>
<style scoped lang="scss">
.red-img {
  width: 234px;
  height: 86px;
  img {
    object-fit: contain;
  }
}
.popupOpen {
  padding-top: 73px;
  width: 255px;
  height: 397px;
  background: url("@/assets/img/openRed.png") no-repeat center;
  background-size: 100% 100%;
  color: #feedaf;

  .d-desc {
    font-size: 18px;
  }
}
.user-red {
  width: 16px;
  height: 16px;
}
.popupFinish {
  padding-top: 204px;
  width: 255px;
  height: 399px;
  background: url("@/assets/img/finishRed.png") no-repeat center;
  background-size: 100% 100%;
  .names {
    color: #191919;
  }
  .d-desc {
    color: #999999;
    font-size: 12px;
  }
  .d-meng {
    font-size: 42px;
    color: #cdac74;
    align-items: baseline;
    span {
      font-size: 12px;
    }
  }
  .view {
    color: #b78756;
    font-size: 12px;
  }
}
</style>
