import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
Vue.config.productionTip = false;
import util from "@/plugins/util";
// import element from "./plugins/element";
// Vue.use(element);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import vant from "./plugins/vant";

Vue.use(vant);
import "@/assets/page.css";
import "@/assets/base.scss";
const num =
  process.env.NODE_ENV === "production"
    ? window.UNIFIED_NUMBER
    : process.env.VUE_APP_UNIFIED_NUMBER;
Vue.prototype.divide = (v, fix = true) => {
  if (!fix) return Math.trunc(v * 100) / 100;
  return Math.trunc((v * 100) / num) / 100;
};
Vue.prototype.$util = util;
const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
export default app;
