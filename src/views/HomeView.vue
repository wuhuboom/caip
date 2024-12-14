<template>
  <div>
    <section class="app-main">
      <div>
        <div class="main-page-banners">
          <div style="height: 360px">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="(p, i) in slider" :key="i">
                <img class="d-img" :src="p.imageUrl" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="main-page-account">
            <InfoMain />
          </div>
        </div>
        <div class="main-page-3d">
          <div class="main-page-car">
            <div class="main-page-plat">
              <div class="main-page-notice">
                <div class="main-page-notice-title">公告信息</div>
                <div style="width: 370px">
                  <p
                    class="marquee-tips"
                    style="
                      font-size: 12px;
                      color: white;
                      animation: marqueeqwzh0 28s linear 0s infinite normal none;
                    "
                  >
                    {{ $store.state.scroll }}
                  </p>
                </div>
              </div>
              <div class="main-page-cp">
                <div class="common_layout_center_v">
                  <a href="#/game/detail/ssc/ssc_cq" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_ssc.png') 0% 0% / 100% 100%;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                  <a href="#/game/detail/five/five_gd" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_11_5.png') 0% 0% / 100% 100%;
                        margin-top: 6px;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                </div>
                <div class="common_layout_center_v main-page-cp-middle">
                  <a href="#/game/detail/three/three_js" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_k3.png') 0% 0% / 100% 100%;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                  <a href="#/game/detail/happy/happy_gd" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_kl.png') 0% 0% / 100% 100%;
                        margin-top: 6px;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                </div>
                <div class="common_layout_center_v">
                  <a href="#/game/detail/pk/pk_xyft" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_pk10.png') 0% 0% / 100% 100%;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                  <a href="#/game/detail/lf/lf_3d" class=""
                    ><div
                      class="cp-item-main"
                      style="
                        background: url('/static/cp_dp.png') 0% 0% / 100% 100%;
                        margin-top: 6px;
                      "
                    >
                      <div class="cp-item-title"></div></div
                  ></a>
                </div>
                <div style="margin-left: 14px">
                  <div class="lottery-tab-main">
                    <div class="lottery-tab-discover">
                      <svg
                        width="100%"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 11px"
                        >
                          中奖公告
                        </text>
                      </svg>
                    </div>
                    <div class="lottery-tab-container">
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              gc**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            gcdh凯哥
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            186.00元
                          </text>
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              虚伪**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            虚伪的现实
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            186.00元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              小小**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            小小胖仔
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            125.00元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              不太**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            不太会玩
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            187.50元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              君子**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            君子如约
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            1937.50元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              不太**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            不太会玩
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            150.00元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              目标**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            目标五个亿
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            2738.33元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              小小**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            小小胖仔
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            516.67元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              虚伪**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            虚伪的现实
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            372.00元
                          </text>

                          <!---->
                        </svg>
                      </div>
                      <div class="lottery-tab-content">
                        <div class="lottery-tab-content-left">
                          <div class="lottery-tab-num"></div>
                          <svg
                            width="100%"
                            height="30"
                            xmlns="http://www.w3.org/2000/svg"
                            style="flex: 1 1 0%"
                          >
                            <text
                              text-anchor="middle"
                              dominant-baseline="middle"
                              x="50%"
                              y="50%"
                              fill="#522B1D"
                              class="cp-text"
                              style="font-size: 10px"
                            >
                              蝉语**
                            </text>
                          </svg>
                        </div>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!---->
                          <text
                            text-anchor="start"
                            dominant-baseline="middle"
                            x="0%"
                            y="50%"
                            fill="#522B1D"
                            style="font-size: 10px"
                          >
                            蝉语888
                          </text>
                        </svg>
                        <svg
                          width="100%"
                          height="30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <text
                            text-anchor="middle"
                            dominant-baseline="middle"
                            x="50%"
                            y="50%"
                            fill="#522B1D"
                            class="cp-text"
                            style="font-size: 10px"
                          >
                            132.86元
                          </text>

                          <!---->
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="main_page_card">
                <a href="#/game/detail/ssc/ssc_cq" class=""
                  ><div class="cp_card_main" style="margin-left: 102px">
                    <img src="@/static/cp_card_ssc.png" width="93" />
                    <div
                      class="cp-card-title"
                      style="width: 93px; justify-content: flex-start"
                    >
                      <svg
                        width="58"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 10px"
                        ></text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div></a
                >
                <a href="#/game/detail/five/five_gd" class=""
                  ><div class="cp_card_main" style="margin-left: 6px">
                    <img src="@/static/cp_card_11_5.png" width="83" />
                    <div
                      class="cp-card-title"
                      style="width: 83px; justify-content: flex-start"
                    >
                      <svg
                        width="60"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 10px"
                        ></text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div></a
                >
                <a href="#/game/detail/three/three_js" class=""
                  ><div class="cp_card_main" style="margin-left: 16px">
                    <img src="@/static/cp_card_k3.png" width="77" />
                    <div
                      class="cp-card-title"
                      style="width: 77px; justify-content: flex-start"
                    >
                      <svg
                        width="62"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 10px"
                        ></text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div></a
                >
                <a href="#/game/detail/happy/happy_gd" class=""
                  ><div class="cp_card_main" style="margin-left: 23px">
                    <img src="@/static/cp_card_kl.png" width="67" />
                    <div
                      class="cp-card-title"
                      style="width: 67px; justify-content: flex-start"
                    >
                      <svg
                        width="62"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 10px"
                        ></text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div></a
                >
                <a href="#/game/detail/pk/pk_bj" class=""
                  ><div class="cp_card_main" style="margin-left: 33px">
                    <img src="@/static/cp_card_pk10.png" width="77" />
                    <div
                      class="cp-card-title"
                      style="width: 77px; justify-content: flex-end"
                    >
                      <svg
                        width="60"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 10px"
                        ></text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div></a
                >
                <a href="#/game/detail/lf/lf_3d" class=""
                  ><div class="cp_card_main" style="margin-left: 22px">
                    <img src="@/static/cp_card_fc.png" width="83" />
                    <div
                      class="cp-card-title"
                      style="width: 83px; justify-content: flex-end"
                    >
                      <svg
                        width="54"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 10px"
                        ></text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div></a
                >
                <a href="#/game/detail/ssc/ssc_cq" class=""
                  ><div class="cp_card_main" style="margin-left: 16px">
                    <img src="@/static/cp_card_more.png" width="93" />
                    <div
                      class="cp-card-title"
                      style="width: 93px; justify-content: flex-end"
                    >
                      <svg
                        width="54"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          text-anchor="middle"
                          dominant-baseline="middle"
                          x="50%"
                          y="50%"
                          fill="#FDD99B"
                          class="cp-text"
                          style="font-size: 10px"
                        ></text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div></a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="main-page-recommend">
          <div class="main-page-recommend-content">
            <div class="promotion-main">
              <div class="promotion-title">优惠活动</div>
              <div class="promotion-images">
                <div class="el-image promotion-image">
                  <img src="@/static/p1.jpeg" class="el-image__inner" /><!---->
                </div>
                <div class="el-image promotion-image">
                  <img src="@/static/p2.jpeg" class="el-image__inner" /><!---->
                </div>
              </div>
            </div>
            <div
              class="lottery-recommend-main"
              style="margin-right: 9px; margin-left: 9px"
            >
              <div class="lottery-recommend-label">平台推荐</div>
              <div class="lottery-recommend-images">
                <a href="#/game/detail/ssc/ssc_cq" class=""
                  ><div class="lottery-item-main lottery-item-left">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_ssc_cq.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/detail/ssc/ssc_xj" class=""
                  ><div class="lottery-item-main lottery-item-middle">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_ssc_xj.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/detail/ssc/ssc_hn" class=""
                  ><div class="lottery-item-main lottery-item-right">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_ssc_five.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
              </div>
              <div class="lottery-recommend-divider"></div>
              <div class="lottery-recommend-images">
                <a href="#/game/detail/three/three_gx" class=""
                  ><div class="lottery-item-main lottery-item-left">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_k3_gx.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/detail/happy/happy_gd" class=""
                  ><div class="lottery-item-main lottery-item-middle">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_happy_gd.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
                <a href="#/game/detail/pk/pk_xyft" class=""
                  ><div class="lottery-item-main lottery-item-right">
                    <div class="el-image lottery-item-image">
                      <img
                        src="@/static/lottery_boat.png"
                        class="el-image__inner"
                      /><!---->
                    </div>
                    <div class="lottery-item-text"></div></div
                ></a>
              </div>
            </div>
            <div class="main-page-games">
              <div class="game-item-main">
                <div class="el-image game-item-image">
                  <img
                    src="@/static/cp_ssc.png"
                    class="el-image__inner"
                  /><!---->
                </div>
                <div class="game-item-text">
                  <div>
                    <div class="game-item-title">平台游戏</div>
                    <div class="game-item-desc">
                      <svg
                        width="100%"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!---->
                        <text
                          text-anchor="start"
                          dominant-baseline="middle"
                          x="0%"
                          y="50%"
                          fill="#8F614D"
                          style="font-size: 11px"
                        >
                          丰富游戏，精彩无限
                        </text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div>
                  <a href="#/game/detail/ssc/ssc_cq" class=""
                    ><div class="game-item-button">
                      <div>
                        立即游戏
                        <i class="el-icon-caret-right"></i>
                      </div></div
                  ></a>
                </div>
              </div>
              <div class="game-item-main">
                <div class="el-image game-item-image">
                  <img
                    src="@/static/cp_dp.png"
                    class="el-image__inner"
                  /><!---->
                </div>
                <div class="game-item-text">
                  <div>
                    <div class="game-item-title">平台游戏</div>
                    <div class="game-item-desc">
                      <svg
                        width="100%"
                        height="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <!---->
                        <text
                          text-anchor="start"
                          dominant-baseline="middle"
                          x="0%"
                          y="50%"
                          fill="#8F614D"
                          style="font-size: 11px"
                        >
                          丰富游戏，精彩无限
                        </text>
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                        <!---->
                      </svg>
                    </div>
                  </div>
                  <a href="#/game/detail/lf/lf_3d" class=""
                    ><div class="game-item-button">
                      <div>
                        立即游戏
                        <i class="el-icon-caret-right"></i>
                      </div></div
                  ></a>
                </div>
              </div>
            </div>
            <div class="app-bar-main">
              <div class="app-bar-item">
                <div class="app-bar-div">
                  <div id="id_android" @click="goApp(0)">
                    <QrcodeVue :value="dev[0] || ''" :size="67" />
                  </div>
                </div>
                <div class="app-bar-title">App安卓版</div>
              </div>
              <div class="app-bar-item">
                <div class="app-bar-div">
                  <div id="id_ios" @click="goApp(1)">
                    <QrcodeVue :value="dev[1] || ''" :size="67" />
                  </div>
                </div>
                <div class="app-bar-title">App苹果版</div>
              </div>
            </div>
          </div>
        </div>
        <div style="z-index: 999">
          <!---->
        </div>
        <!---->
      </div>
    </section>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import userApi from "@/api/user";
import InfoMain from "@/components/InfoMain";
export default {
  name: "HomePage",
  data() {
    return {
      slider: [],
      notice: {
        content: "",
      },
    };
  },
  computed: {
    dev() {
      return this.$store.state.devApp;
    },
  },
  components: {
    InfoMain,
    QrcodeVue,
  },
  methods: {
    async getNotice() {
      const [err, res] = await userApi.notice();
      if (err) return;
      this.notice = res.data[0] || {};
    },
    async sliderSlide() {
      const [err, res] = await userApi.homeswiper();
      if (err) return;
      this.slider = res.data;
    },
    async homeDialog() {
      const [err, res] = await userApi.homeDialog();
      if (err) return;
      console.log(res);
    },
    goApp(appType) {
      if (!this.dev[appType]) {
        return;
      }
      window.open(this.dev[appType].appUrl);
    },
  },
  created() {
    this.$store.commit("setPdTop", false);
    this.$store.dispatch("appDownload", false);

    this.homeDialog();
    this.sliderSlide();
    this.getNotice();
  },
};
</script>
