import Vue from "vue";
import dayjs from "dayjs";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./locale";
import util from "@/plugins/util";
import VueClipboard from "vue-clipboard2";
import global from "./components/global";
import "amfe-flexible";
import element from "./plugins/element";
// 公共样式
import "@/assets/style/base.less";
import "@/assets/font/iconfont.css";
import "@/assets/style/resVant.scss";
import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";
import VueLuckyCanvas from "@lucky-canvas/vue";
import Tool from "@/utils/tool";
Vue.use(VueLuckyCanvas);
Locale.use("en-US", enUS);
Vue.config.productionTip = false;
Vue.use(global);
Vue.use(VueClipboard);
Vue.use(element);
Vue.prototype.$tool = Tool;
const num =
  process.env.NODE_ENV === "production"
    ? window.UNIFIED_NUMBER
    : process.env.VUE_APP_UNIFIED_NUMBER;
Vue.prototype.divide = (v, fix = true) => {
  if (!fix) {
    return (Math.trunc(v * 100) / 100).toFixed(2); // 始终保留两位小数
  }
  return (Math.trunc((v * 100) / num) / 100).toFixed(2); // 始终保留两位小数
};
Vue.prototype.$betPrice = 2;
Vue.prototype.$dayjsTime = (time = new Date(), f = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(time).format(f);
};
Vue.prototype.$util = util;
const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
export default app;
