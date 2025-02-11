import app from "@/main";
import auth from "@/plugins/auth";
import { EventBus } from "@/plugins/bus";
let trimrWs = null;
export default {
  namespaced: true,
  state: {
    ws: null, // WebSocket 实例
    wsStatus: null, // WebSocket 连接状态
    messages: [], // 聊天消息记录
    playerId: null, // 当前用户的 playerId
    query: {
      pageNo: 1,
      pageSize: 20,
      totalPage: null,
    },
  },
  getters: {
    news: (state) => {
      const arr = state.messages.filter((v) => v.new === true);
      return arr;
    },
  },
  mutations: {
    addMsgPacket(state, v) {
      const index = state.messages.findIndex((item) => +item.id === +v.msgId);
      if (index === -1) return;
      try {
        app.$set(state.messages[index], "packet", JSON.parse(v.data));
      } catch (e) {
        console.log(e);
      }
    },
    setToOld(state, v) {
      const index = state.messages.findIndex((item) => +item.id === +v.id);
      if (index === -1) return;
      state.messages = state.messages.map((v, k) => {
        if (index >= k) {
          v.new = false;
        }
        return v;
      });
    },
    setToBack(state, v) {
      console.log("setToBack", v);
      const index = state.messages.findIndex((item) => +item.id === +v.id);
      if (index === -1) return;
      console.log(state.messages[index]);
      app.$set(state.messages[index], "status", 1);
    },
    setQuery(state, query) {
      state.query = query;
    },
    SET_WS(state, ws) {
      state.ws = ws;
      state.wsStatus = ws ? true : false;
    },
    ADD_MESSAGE(state, message) {
      if (message.message) {
        state.messages.push({
          ...message.message,
          new: message.message.playerId != app.$store.state.user.id,
        });
      } else {
        //过滤id相同的消息
        const messagefilter = message.filter((v) => {
          return !state.messages.some((item) => item.id === v.id);
        });
        console.log("messagefilter", messagefilter);
        state.messages.unshift(...messagefilter.reverse());
        //state.messages.unshift(...message.reverse());
      }
    },
    CLEAR_MESSAGES(state) {
      state.messages = []; // 清空消息记录
    },
    SET_PLAYER_ID(state, playerId) {
      state.playerId = playerId; // 设置当前用户的 playerId
    },
  },
  actions: {
    // 初始化 WebSocket
    initWebSocket({ commit, dispatch }) {
      //wss://api.orz-orz.cc
      const site =
        process.env.NODE_ENV === "production"
          ? window.WSPATH
          : process.env.VUE_APP_WS;
      const url = `${site}/player/ws/${auth.getToken()}`;
      const playerId = app.$store.state.user.id;

      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("WebSocket 已连接");
        commit("SET_PLAYER_ID", playerId); // 存储当前用户 ID
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        dispatch("handleMessage", message); // 处理接收到的消息
      };

      ws.onerror = (error) => {
        console.error("WebSocket 错误:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket 已关闭");
        commit("SET_WS", null);
      };
      window.ws = ws;
      trimrWs && clearInterval(trimrWs);
      trimrWs = setInterval(() => {
        try {
          ws.send(1);
        } catch (e) {
          console.log("ping error", e);
        }
      }, 20 * 1000);
      commit("SET_WS", ws);
    },

    // 关闭 WebSocket 连接
    closeWebSocket({ state, commit }) {
      if (state.ws) {
        state.ws.close();
        commit("SET_WS", null);
      }
    },

    // 发送消息
    sendMessage({ state }, { type = 0, data, msgId }) {
      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        const query = { type, data };
        if (msgId) {
          query.msgId = msgId;
        }
        const message = JSON.stringify(query);
        console.log("发送消息:", message);
        state.ws.send(message);
      } else {
        console.error("WebSocket 未连接或已关闭");
      }
    },
    // 处理接收到的消息
    handleMessage({ commit }, message) {
      //0 文本消息 2 分享合买 4 红包消息
      if ([0, 2, 4].includes(+message.type)) {
        // 文本消息
        commit("ADD_MESSAGE", { message });

        app.$nextTick(() => {
          const chatContainer = document.querySelector(".js-cont-room");
          if (!chatContainer) return;
          const scrollDistanceToBottom =
            chatContainer.scrollHeight -
            chatContainer.scrollTop -
            chatContainer.clientHeight;
          if (
            message.playerId == app.$store.state.user.id ||
            scrollDistanceToBottom < 300
          ) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        });
      } else if (message.type === 1) {
        //pageNo

        const resResults = JSON.parse(message.data);
        const { results, pageNo } = resResults;
        if (!results) return;
        commit("ADD_MESSAGE", results);
        //setQuery
        commit("setQuery", resResults);
        if (+pageNo === 1) {
          app.$nextTick(() => {
            const chatContainer = document.querySelector(".js-cont-room");
            if (chatContainer) {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            }
          });
        }
      } else if ([3].includes(+message.type)) {
        let data = JSON.parse(message.data);
        // 3 发红包响应的code消息 (1余额不足 2数量不正确)
        app.$message({
          message: data.code == 1 ? "余额不足" : "数量不正确",
          type: "error",
          duration: 2000,
          showClose: true,
        });
      } else if ([5].includes(+message.type)) {
        //查询红包 状态
        commit("addMsgPacket", message);
      } else if ([6].includes(+message.type)) {
        //抢红包响应数据
        // 接收消息:{"type":6,"data":"{\"code\":1}"}(0.抢到红包 1.已被抢空 2.已抢过红包)
        // 抢到红包返回{money:抢到金额,nickname:发送人,describes:红包标题}

        //抢红包后更新红包状态
        EventBus.$emit("redGetStatus", {
          ...message,
          data: JSON.parse(message.data),
        });
      } else if ([7].includes(+message.type)) {
        EventBus.$emit("getMoneyRecord", {
          ...message,
          data: JSON.parse(message.data),
        });
      } else if ([9].includes(+message.type)) {
        //撤回消息修改status
        commit("setToBack", JSON.parse(message.data));
      }
    },

    // 请求历史消息
    fetchHistory({ dispatch }, { pageNo, pageSize }) {
      const data = JSON.stringify({ pageNo, pageSize });
      dispatch("sendMessage", { type: 1, data });
    },
  },
};
