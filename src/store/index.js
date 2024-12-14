/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import userApi from "@/api/user";
import auth from "@/plugins/auth";
import util from "@/plugins/util";
import app from "@/main";
Vue.use(Vuex);
const lang = location.href.includes("zmkm") ? "zh" : "";
export default new Vuex.Store({
  state: {
    openStatus: [
      {
        name: "全部",
        id: -1,
      },
      {
        name: "未开奖",
        id: 0,
      },
      {
        name: "中奖",
        id: 1,
      },
      {
        name: "未中",
        id: 2,
      },
      {
        name: "已撤消",
        id: 3,
      },
    ],
    status: [
      {
        name: "进行中",
        id: 0,
      },
      {
        name: "待出票",
        id: 1,
      },
      {
        name: "待开奖",
        id: 2,
      },
      {
        name: "已撤消",
        id: 3,
      },
      {
        name: "已结束",
        id: 4,
      },
    ],
    shoeName: true,
    withdrawalLimitMsg: "",
    showMain: {
      show: false,
      msg: "",
    },
    topBar: {
      height: 0,
    },
    setPdTop: true,
    config: {
      area_code: [],
    },
    user: {},
    lang: lang || localStorage.getItem("lang") || "zh",
    // 令牌  初始化从本地获取 English  Germany Algeria India France
    token: auth.getToken(),
    serveData: {},
    fbMsg: {
      hasMsg: 0,
    },
    paySet: null,
    safeConfig: {},
    balanceRecord: [],
    recroed: {
      query: {},
      video: [],
    },
    fromRoute: {},
    safeData: {},
    devApp: {},
    scroll:
      " 尊敬的各位用户您好，在您充值之前 一定要核对好资料，请勿使用历史记录账号转账， 请勿修改充值提示金额，仔细确认收款人和收款账号后再进行转账，如您未按规定充值所造成的财产损失及其他后果需自行承担。祝您好运连连！",
    cat: [
      {
        src: "/static/product/ssc.png",
        id: 0,
        lotteryType: 0,
        lotteryName: "高频彩",
        list: [],
        open: false,
      },
      {
        src: "/static/product/five.png",
        lotteryName: "低频彩",
        id: 1,
        lotteryType: 1,
        list: [],
        open: false,
      },
    ],
    bankCard: [],
  },
  getters: {
    defaultCode(state) {
      if (!state.config.area_code.length) return "";
      return state.config.area_code[0];
    },
  },
  mutations: {
    setBankCard(state, data) {
      state.bankCard = data;
    },
    setCatList(state, data) {
      state.cat.forEach((v) => {
        v.list = data.filter((i) => +i.lotteryType === +v.lotteryType);
        v.list.map((v) => {
          return {
            ...v,
            lotteryType: +v.lotteryType,
          };
        });
      });
    },
    setApp(state, data) {
      state.devApp = data;
    },
    changeSafe(state, data) {
      console.log(data);
      state.safeData = data;
    },
    setFromRoute(state, data) {
      state.fromRoute = data;
    },
    setRecroed(state, data) {
      state.recroed = data;
    },
    setBalanceRecord(state, data) {
      state.balanceRecord = data;
    },
    setwithdrawalLimitMsg(state, data) {
      state.withdrawalLimitMsg = data;
    },
    setShowName(state, data) {
      state.shoeName = data;
    },
    setMainShow(state, data) {
      Object.assign(state.showMain, data);
    },
    setSafeConfig(state, data) {
      state.safeConfig = data;
    },
    changepaySet(state, data) {
      state.paySet = data;
    },
    setFbMsg(state, data) {
      state.fbMsg = data;
    },
    setServeData(state, data) {
      state.serveData = data;
    },
    setPdTop(state, data) {
      state.setPdTop = data;
    },
    setLang(state, lang) {
      state.lang = lang;
      localStorage.setItem("lang", lang);
      location.reload();
    },
    setToken(state, token) {
      state.token = token;
      auth.setToken(token);
    },
    setUser(state, data) {
      auth.setToken(JSON.stringify(data), "userInfo");
      state.user = data;
    },
    loginOut(state) {
      state.paySet = null;
      state.user = {};
      auth.clearToken();
      app.$router.push("/login/SignIn");
    },
    setCodeList(state, data) {
      state.config = data;
    },
    goServe(state) {
      if (!state.serveData.serviceAddr) return;
      location.href = state.serveData.serviceAddr;
      //window.open(state.serveData.serviceAddr);
    },
  },
  actions: {
    async getPaySet({ commit }) {
      const [err, res] = await userApi.getPwdPay();
      if (err) return;
      console.log(res.data.paySet);
      commit("changepaySet", res.data.paySet);
    },
    async getBankCard({ commit }) {
      const [err, res] = await userApi.virtualCurrencyList();
      if (err) return;
      commit("setBankCard", res.data);
    },
    async appDownload({ commit }, skip = true) {
      const appType = util.detectDevice();
      const [err, res] = await userApi.appUrl({ appType });
      if (err) return;
      const appList = {};
      res.data.forEach((v) => {
        appList[v.appType] = v;
      });
      commit("setApp", appList);
      if (!skip) return;
      const item = res.data.find((v) => v.appType === appType);
      if (!item) return;
      await userApi.appCount({ id: item.id });
      window.location.href = item.appUrl;
    },
    async getCodeList({ commit }, params) {
      const [err, result] = await userApi.authSysconfig();
      if (err) return;
      commit("setCodeList", result.data);
      console.log(params);
      commit("setMainShow", {
        show: false,
        msg: "",
      });
    },
    async getInfo({ commit }) {
      const [err, result] = await userApi.userInfo();
      if (err) return [err];
      commit("setUser", result.data);
      return [null, result];
    },
    async setSafeConfig({ commit }) {
      const [err, result] = await userApi.fbConf();
      if (err) return [err];
      commit("setSafeConfig", result.data);
      return [null, result];
    },
    async getServeData({ commit }, open = 0) {
      if (open) {
        app.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
      }
      const token = auth.getToken();
      const [err, result] = await userApi[
        `${token ? "servReq" : "servTmpReq"}`
      ]();
      app.$toast.clear();
      if (err) {
        if (Array.isArray(err.data) && err.data.length && open) {
          app.$toast(err.data[0].msg);
        }
        return [err];
      }
      if (open) {
        const host = window.btoa(window.location.origin);
        const link = result.data.serviceAddr;
        location.href =
          link.indexOf("?") !== -1
            ? `${link}&toUrl=${host}`
            : `${link}?toUrl=${host}`;
      } else {
        commit("setServeData", result.data);
        return [null, result];
      }
    },
    async getHasMsg({ commit }) {
      const [err, result] = await userApi.hasMsg();
      if (err) return [err];
      commit("setFbMsg", result.data);
      return [null, result];
    },
    async safeInfo({ commit }) {
      const [err, res] = await userApi.safeInfo();
      if (err) return;
      commit("changeSafe", res.data);
    },
    async playerLotteryList({ commit }) {
      const [err, res] = await userApi.playerLotteryList();
      if (err) return;
      commit("setCatList", res.data);
    },
  },
  modules: {},
});