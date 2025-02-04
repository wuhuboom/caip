<template>
  <div class="c-page bg-grey">
    <PurchaseRecord />
  </div>
</template>

<script>
import PurchaseRecord from "@/views/PurchaseRecord.vue";
export default {
  name: "MyBallRecord",
  components: {
    PurchaseRecord,
  },
  data() {
    return {
      tab: 0,
    };
  },
  computed: {
    // 根据当前 tab id 返回对应的组件
  },
};
</script>
<style scoped lang="less"></style>
