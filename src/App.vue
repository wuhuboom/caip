<template>
  <div class="app-layout-main" :class="{ 'p-t-100': $store.state.setPdTop }">
    <router-view name="AppTopBar"></router-view>
    <router-view :key="$router.currentRoute.fullPath" />
    <router-view name="AppBtmBar"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.p-t-100 {
  padding-top: 100px;
}
</style>
