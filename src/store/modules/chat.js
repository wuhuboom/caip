import app from "@/main";
import auth from "@/plugins/auth";
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
    setToOld(state, v) {
      // state.messages = state.messages.map((v) => {
      //   v.new = false;
      //   return v;
      // });
      const index = state.messages.findIndex((item) => +item.id === +v.id);
      if (index === -1) return;
      state.messages = state.messages.map((v, k) => {
        if (index >= k) {
          v.new = false;
        }
        return v;
      });
      //state.messages[index].new = false;
    },
    setQuery(state, query) {
      state.query = query;
    },
    SET_WS(state, ws) {
      state.ws = ws;
      state.wsStatus = ws ? true : false;
      // state.messages = [];
      // state.query = {
      //   pageNo: 1,
      //   pageSize: 20,
      //   totalPage: null,
      // };
    },
    ADD_MESSAGE(state, message) {
      if (message.message) {
        state.messages.push({
          ...message.message,
          new: message.message.playerId != app.$store.state.user.id,
        });
      } else {
        state.messages.unshift(...message.reverse());
      }
      // state.messages = Array.from(
      //   new Map(state.messages.map((item) => [item.id, item])).values()
      // );
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
      console.log({
        url,
        playerId,
      });
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
    sendMessage({ state }, { type = 0, data }) {
      if (state.ws && state.ws.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ type, data });
        state.ws.send(message);
      } else {
        console.error("WebSocket 未连接或已关闭");
        // if (from === "pageSend") {
        // }
      }
    },
    // 处理接收到的消息
    handleMessage({ commit }, message) {
      if ([0, 2].includes(+message.type)) {
        // 文本消息
        commit("ADD_MESSAGE", { message });
        console.log("接收到消息: 0", message);
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
        console.log("历史消息: 1", JSON.parse(message.data));
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
      }
    },

    // 请求历史消息
    fetchHistory({ dispatch }, { pageNo, pageSize }) {
      const data = JSON.stringify({ pageNo, pageSize });
      dispatch("sendMessage", { type: 1, data });
    },
  },
};
