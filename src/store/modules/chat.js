import app from "@/main";
export default {
  namespaced: true,
  state: {
    ws: null, // WebSocket 实例
    messages: [], // 聊天消息记录
    playerId: null, // 当前用户的 playerId
    query: {
      pageNo: 1,
      pageSize: 20,
      totalPage: null,
    },
  },
  mutations: {
    setQuery(state, query) {
      state.query = query;
    },
    SET_WS(state, ws) {
      state.ws = ws;
    },
    ADD_MESSAGE(state, message) {
      if (message.message) {
        state.messages.push(message.message);
      } else {
        state.messages.unshift(...message.reverse());
      }
      state.messages = Array.from(
        new Map(state.messages.map((item) => [item.id, item])).values()
      );
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
    initWebSocket({ commit, dispatch }, { url, playerId }) {
      console.log("初始化 WebSocket:", url, playerId);
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
      }
    },

    // 处理接收到的消息
    handleMessage({ commit }, message) {
      if (message.type === 0) {
        // 文本消息
        commit("ADD_MESSAGE", { message });
        console.log("接收到消息: 0", message);
        app.$nextTick(() => {
          const chatContainer = document.querySelector(".js-cont-room");
          if (chatContainer) {
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
