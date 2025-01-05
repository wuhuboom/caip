<template>
  <van-popup class="popupMoney" v-model="show">
    <p class="pop-title center-center m-t-24 m-b-32">发红包</p>
    <van-form class="ntf-yellow-form" @submit="onSubmit">
      <van-field
        v-model="form.username"
        class="m-b-32"
        autocomplete="new-password"
        label="红包个数"
        placeholder="请填写红包个数"
        :rules="[{ required: true, message: '请填写红包个数' }]"
      >
        <template #button> <span class="left-text p-r-8">个</span> </template>
      </van-field>
      <van-field
        v-model="form.password"
        autocomplete="new-password"
        label="红包金额"
        :rules="[{ required: true, message: '请填写金额' }]"
      >
        <template #button> <span class="left-text p-r-8">元</span> </template>
      </van-field>
      <ul class="center-center m-t-48">
        <li class="m-r-32" @click="show = false">
          <van-button round block type="info" native-type="button"
            >取消</van-button
          >
        </li>
        <li>
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </li>
      </ul>
    </van-form>
  </van-popup>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import userApi from "@/api/user";
export default {
  name: "PopupMoney",
  data() {
    return {
      show: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit");
    },
  },
};
</script>
<style scoped lang="scss">
.popupMoney {
  width: 510px;
  height: 307px;
  background: #774230;
  padding-left: 58px;
  .left-text {
    color: #000;
  }
  .pop-title {
    font-size: 16px;
    color: #feedaf;
  }
}
</style>
