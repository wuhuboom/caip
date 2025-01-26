import axios from "axios";
import app from "@/main";
import to from "await-to-js";
const baseURL =
  process.env.NODE_ENV === "production"
    ? window.BASEPATH
    : process.env.VUE_APP_API;
const instance = axios.create({
  baseURL: `${baseURL}/player`,
  timeout: 8 * 1000,
  responseType: "json", // Add this line to set the default responseType
});
instance.interceptors.request.use(
  (config) => {
    const token = app.$store.state.token;
    if (token) config.headers.Token = token;
    if (config.data && typeof config.data === "object") {
      // 创建一个 FormData 实例
      const formData = new FormData();

      // 遍历请求参数对象，将每个参数添加到 FormData 中
      for (let key in config.data) {
        formData.append(key, config.data[key]);
      }

      // 将 FormData 设置为请求的参数
      config.data = formData;
    }
    config.params = Object.assign({}, config.params || {}, {
      // reqConfig: process.env.VUE_APP_FIX,
    });

    return config;
  },
  (err) => Promise.reject(err)
);
const specialCode = [];
instance.interceptors.response.use(
  (res) => {
    let result = res.data || {};
    let { code, msg, data } = result;
    if ([500].includes(code)) {
      msg = "系统繁忙，请稍后再试。";
    }
    //401-无权访问 402-未登录或者登录失效 403-账号已被禁用
    if ([401, 402, 403].includes(code)) {
      const isLogin = res.config.url.includes("/auth/login");
      app.$toast.clear();
      if (!isLogin) {
        app.$store.commit("loginOut");
        app.$router.push({
          name: "SignIn",
        });
      }
      if (code == 403 && isLogin) {
        app.$message.error(app.$t("login.fail"));
        //app.$toast(app.$t("login.fail"));
      }
      return Promise.reject({ code });
    }
    if (code !== 200) {
      //&& msg
      if (!specialCode.includes(code)) {
        if (code === 188) {
          //188 系统维护中
          app.$store.commit("setMainShow", {
            show: true,
            msg,
          });
          //app.$toast(app.$t("UserProfile.Notification"));
        } else if (code === 409) {
          app.$message.error(app.$t("backapi.self.alert.fast.access.tip.text"));
          // app.$toast(app.$t("backapi.self.alert.fast.access.tip.text"));
        } else {
          let title = "";
          if (data && data.length > 0) {
            title = data[0].msg || app.$t("backapi." + data[0].msgKey);
          }
          title = title || msg;
          if (title) {
            app.$message.error(title);
            // app.$toast(title);
          } else {
            app.$toast.clear();
          }
        }
      }
      console.log("Promise.reject", code);
      return Promise.reject(result);
    }
    return result;
  },
  async (err) => {
    // app.$toast(txtFail);
    //app.$message.error("网络错误，请稍后重试");
    app.$toast.clear();
    return Promise.reject(err);
  }
);

// 2. 导出一个通过新axios实例调用接口的函数
export default ({
  url,
  method = "get",
  params,
  data,
  headers,
  responseType,
  noAutoFormData = true,
}) => {
  const promise = instance({
    url,
    method,
    params,
    data,
    responseType,
    headers,
    noAutoFormData,
  });
  return to(promise);
};
