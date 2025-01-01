<template>
  <div>
    <div v-if="playerId">12345</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "@/plugins/auth";
export default {
  name: "chatRoom",
  computed: {
    user() {
      return this.$store.state.user;
    },
    ...mapState("chat", ["messages", "playerId"]), // 绑定聊天消息记录
  },
  methods: {
    ...mapActions("chat", [
      "initWebSocket",
      "closeWebSocket",
      "sendMessage",
      "fetchHistory",
    ]),
  },
  mounted() {
    this.initWebSocket({
      url: `wss://api.orz-orz.cc/player/ws/${auth.getToken()}`,
      playerId: this.user.id,
    });
  },
};
</script>
