<template>
  <div class="app-layout-nav">
    <div class="nav-bar-main app-nav-bar">
      <router-link
        class="nav-bar-link"
        v-for="(item, idx) in navs"
        :key="idx"
        :to="item.path"
      >
        <div
          class="nav-item-main"
          :class="{ 'nav-item-active': item.path == $route.path }"
        >
          <div>{{ item.name }}</div>
          <div class="nav-item-subtitle">{{ item.desc }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppTopBar",
  data() {
    return {
      navs: [
        {
          name: "首页",
          desc: "Home",
          path: "/",
        },
        {
          name: "游戏大厅",
          desc: "Game Hall",
          path: "/game/hall",
        },
        {
          name: "合买中心",
          desc: "Cooperation",
          path: "/cooperation/activity",
        },
        // {
        //   name: "定制跟单",
        //   desc: "Customizations",
        //   path: "/custom/follow",
        // },
        {
          name: "用户中心",
          desc: "Account",
          path: "/account/center",
        },
        {
          name: "App下载",
          desc: "DownLoad",
          path: "/download/app",
        },
        {
          name: "线路检测",
          desc: "Line Detection",
          path: "/line/index",
        },
        // {
        //   name: "聊天室",
        //   desc: "Chat Room",
        //   path: "/chat/room",
        // },
        {
          name: "U充教程",
          desc: "Usdt Course",
          path: "/usdtInfo/index",
        },
      ],
    };
  },
};
</script>
