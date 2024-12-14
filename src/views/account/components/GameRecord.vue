<template>
  <div class="recharge-main">
    <div
      class="custom-record-tabs"
      style="margin-left: 15px; margin-bottom: 15px; margin-right: 15px"
    >
      <div
        class="custom-record-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="tab = item.id"
        :class="{ 'custom-record-tab-active': tab == item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Game0 from "./Game0.vue";
import Game1 from "./Game1.vue";
import Game2 from "./Game2.vue";
export default {
  name: "AccountCenter",
  data() {
    return {
      navs: [
        {
          name: "自购记录",
          id: 0,
        },
        {
          name: "合买记录",
          id: 1,
        },
        {
          name: "追号记录",
          id: 2,
        },
      ],
      tab: 0,
    };
  },
  computed: {
    // 根据当前 tab id 返回对应的组件
    currentComponent() {
      //navs 调用组件
      const components = {
        0: Game0,
        1: Game1,
        2: Game2,
      };
      return components[this.tab] || null;
    },
  },
};
</script>
<style scoped lang="scss"></style>
