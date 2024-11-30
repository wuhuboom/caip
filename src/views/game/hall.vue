<template>
  <div class="app-content game-hall-main">
    <div class="game-hall-left">
      <InfoMain />
      <div style="width: 263px">
        <div class="cp-category-main" cp-list="">
          <div class="cp-category-item" v-for="(item, idx) in cat" :key="idx">
            <div
              @click="item.open = !item.open"
              class="common_layout_center_h cp-category-title-container"
              :class="{ 'cp-category-title-container-active': item.open }"
            >
              <div class="cp-category-title">
                <div class="el-image cp-category-icon">
                  <img :src="item.src" class="el-image__inner" />
                </div>
                <div style="flex: 1 1 0%">{{ item.name }}</div>
              </div>
              <img
                width="17"
                :src="
                  item.open
                    ? '/static/gameHall/arrow_up.png'
                    : '/static/gameHall/arrow_down.png'
                "
              />
            </div>
            <div v-if="item.open">
              <div
                class="cp-category-children p-b-0"
                v-for="(doc, index) in item.list"
                :key="index"
              >
                <div
                  class="cp-category-text"
                  :class="{ 'cp-category-text-active': +doc.id === +id }"
                  @click="changeId(doc.id)"
                >
                  <div class="cp-category-name">{{ doc.lotteryName }}</div>
                  <div class="cp-category-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-hall-content">
      <div class="game-hall-notice">
        <div class="game-hall-bar">
          <div class="game-hall-bar-title">公告信息</div>
          <p
            class="marquee-tips"
            style="
              flex: 1 1 0%;
              animation: 28s linear 0s infinite normal none running marqueechwxz;
            "
          >
            {{ $store.state.scroll }}
          </p>
        </div>
      </div>
      <div class="game-hall-result-container">
        <div class="lottery-result-main game-hall-result">
          <div style="position: relative">
            <div class="common_layout_center_h lottery-result-title">
              <div class="el-image lottery-result-image">
                <img
                  src="/static/gameHall/lottery_result_right.png"
                  class="el-image__inner"
                /><!---->
              </div>
              <div class="lottery-result-text">
                {{ detail.lotteryName }}
              </div>
              <div class="lottery-result-date">
                {{ preData.lastExpect.cycleNum }}
              </div>
              <div class="lottery-result-text" style="margin-right: 10px">
                期
              </div>
              <div class="lottery-result-text">开奖号码</div>
              <div class="el-image">
                <img
                  src="/static/gameHall/lottery_result_left.png"
                  class="el-image__inner"
                /><!---->
              </div>
            </div>
            <div class="cp-audio-main ssc-result-audio">
              <img
                src="/static/gameHall/sound_open.png"
                class="cp-audio-image"
              />
            </div>
          </div>
          <div
            class="lottery-result-balls"
            v-if="preData.lastExpect.openNum"
            style="color: #000"
          >
            <div class="lottery-result-ball">
              <div
                class="number-ball-main"
                v-for="(item, idx) in preData.lastExpect.openNum.split(',')"
                :key="idx"
                :style="{
                  backgroundImage: `url(
                    /static/gameHall/color_ball_${idx}.png
                  )`,
                }"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="next-result-main game-hall-next">
          <div class="next-result-buttons">
            <!-- next-result-button-active -->
            <div
              class="next-result-button"
              v-for="(item, idx) in tabs"
              :key="idx"
              @click="changeTab(item.id)"
              :class="{
                'next-result-button-active': item.id === curTab,
                'm-r-16 m-l-16': idx == 1,
              }"
            >
              <div class="el-image next-result-trend" v-if="item.img">
                <img
                  src="/static/gameHall/trend_chart.png"
                  class="el-image__inner"
                />
              </div>
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div v-if="curTab == 0" class="next-result-current">
            <div class="next-result-current-item">
              <div class="next-result-left">
                <div class="next-result-left-text">
                  <div class="el-image next-result-image">
                    <img
                      src="/static/gameHall/left_time_clock.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <div>剩余投注时间</div>
                </div>
                <div
                  class="next-result-time"
                  v-if="detail.nextExpect.countdown"
                >
                  <van-count-down
                    @finish="openFish"
                    :time="detail.nextExpect.countdown * 1000"
                  />
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 27px;
              "
            >
              <!-- nextExpect nextTime -->
              <div class="next-result-date-container">
                <div class="next-result-date-text">第</div>
                <div class="next-result-date">
                  {{ detail.nextExpect.nextExpect }}
                </div>
                <div class="next-result-date-text">期</div>
              </div>
              <!-- <a
                href="https://www.okxdownloaddemo.com/hash.html"
                target="_blank"
                class="next-result-bottom-remark"
                >游戏介绍</a
              > -->
            </div>
            <div class="next-result-bottom-time">
              截止时间：{{ detail.nextExpect.nextTime }}
            </div>
          </div>
          <prePrize :id="id" v-if="curTab == 1" />
        </div>
      </div>
      <div>
        <div class="play-tab-main game-hall-tabs">
          <div class="play-tab-left"></div>
          <div class="play-tab-middle">
            <div
              class="play-tab-item"
              v-for="(item, idx) in choseNavs"
              :key="idx"
              :class="{ 'play-tab-item-active': item.id === curNav }"
              @click="changeNav(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="play-tab-right"></div>
        </div>
        <div class="ssc-panel-root">
          <div class="ssc-panel-tips">
            <div
              class="example"
              title="如：投注方案：3456；开奖号码：*3456，即为中奖。"
            >
              示例
            </div>
            <div
              class="ssc-panel-symbol"
              title="从千位、百位、十位、个位中，各选择1个号码组成一注，所选号码与开奖号码后4位相同，且顺序一致，即为中奖。"
            >
              ?
            </div>
            <div>{{ choseValue.desc }}</div>
          </div>
          <div
            class="ssc-panel-select"
            v-for="(item, idx) in typeList"
            :key="idx"
          >
            <div class="ssc-panel-label">{{ item.tip1 + item.tip2 }}：</div>
            <div class="ssc-panel-radios-div">
              <div
                class="cp-radio-main ssc-panel-radio"
                v-for="(doc, idx) in item.list"
                @click="changeValue(doc.txt)"
                :key="idx"
              >
                <div class="cp-radio-outer">
                  <div
                    class="cp-radio-inner"
                    :class="{ 'cp-radio-inner-active': doc.txt == value }"
                  ></div>
                </div>
                <div class="cp-radio-text" style="color: rgb(239, 204, 82)">
                  {{ doc.txt.replace(item.tip1, "") }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="play_bar_ball_main">
              <transition name="fade" mode="out-in">
                <component
                  :curPre="curPre"
                  ref="$cont"
                  @total="total = $event"
                  :is="currentComponent"
                  :key="value"
                ></component>
              </transition>
            </div>
          </div>
          <div>
            <div class="ssc-panel-radios">
              <div
                class="cp-radio-main"
                v-for="(item, idx) in preList"
                :key="idx"
                @click="changePre(item.id)"
              >
                <div class="cp-radio-outer">
                  <div
                    class="cp-radio-inner"
                    :class="{ 'cp-radio-inner-active': item.id == preId }"
                  ></div>
                </div>
                <div class="cp-radio-text" style="color: rgb(239, 204, 82)">
                  {{ item.name }}
                </div>
              </div>

              <div>
                <span class="ssc-panel-drop-label">水倍转换：</span>
                <span style="color: rgb(255, 255, 255)">{{
                  choseValue.value
                }}</span>
              </div>
              <div class="common_layout_center_h ssc-panel-mode-container">
                <div class="ssc-panel-mode">当前模式：</div>
                <div class="cp-radio-main">
                  <div class="cp-radio-outer">
                    <div class="cp-radio-inner cp-radio-inner-active"></div>
                  </div>
                  <div class="cp-radio-text" style="color: rgb(239, 204, 82)">
                    元
                  </div>
                </div>
              </div>
            </div>
            <div class="ssc-panel-add">
              <div class="common_layout_center_h">
                <div class="ssc-panel-font">您选择了</div>
                <div
                  class="ssc-panel-font-red"
                  style="margin-left: 5px; margin-right: 5px"
                >
                  {{ total }}
                </div>
                <div class="ssc-panel-font">注，共</div>
                <div
                  class="ssc-panel-font-red"
                  style="margin-left: 5px; margin-right: 5px"
                >
                  {{ totalMoney }}
                </div>
                <div class="ssc-panel-font">元，输入倍数：</div>
                <div
                  class="cp-step-main"
                  style="margin-left: 10px; margin-right: 10px"
                >
                  <div class="cp-step-minus" @click="multipleChange(-1)">
                    <div class="cp-step-h"></div>
                  </div>
                  <div style="text-align: center">
                    <input
                      type="number"
                      v-model.trim="multiple"
                      class="cp-step-input"
                    />
                  </div>
                  <div class="cp-step-plus" @click="multipleChange(1)">
                    <div class="cp-step-h"></div>
                    <div class="cp-step-v"></div>
                  </div>
                </div>
                <div class="ssc-panel-font">倍</div>
              </div>
              <div class="common_layout_center_h">
                <div
                  class="cp-button-main ssc-panel-button"
                  style="margin-right: 10px"
                  @click="randem"
                  v-if="!value.includes('单式')"
                >
                  <!---->
                  随机一注
                </div>
                <div
                  class="cp-button-main ssc-panel-button"
                  style="margin-right: 10px"
                  @click="clearTable"
                >
                  <!---->
                  清除投注
                </div>
                <div @click="add" class="cp-button-main ssc-panel-button">
                  <!---->
                  添加
                </div>
              </div>
            </div>
            <div
              style="
                overflow: hidden auto;
                max-height: 210px;
                width: 100%;
                margin-top: 17px;
              "
            >
              <table rules="all" class="ssc-panel-table">
                <tr v-for="(item, idx) in tableList" :key="idx">
                  <td
                    width="120px"
                    height="30"
                    style="text-align: left; padding-left: 10px"
                  >
                    {{ item.model }}
                  </td>
                  <td
                    width="290px"
                    height="30"
                    title="6|1|7|3"
                    style="
                      text-overflow: ellipsis;
                      position: relative;
                      overflow: hidden;
                      white-space: nowrap;
                      text-align: center;
                      cursor: pointer;
                    "
                  >
                    {{ item.text }}
                  </td>
                  <td width="20px" height="30" style="text-align: center">
                    元
                  </td>
                  <td width="70px" height="30" style="text-align: center">
                    {{ item.total }}注
                  </td>
                  <td width="50px" height="30" style="text-align: center">
                    {{ item.multiple }}倍
                  </td>
                  <td width="80px" height="30" style="text-align: center">
                    ¥{{ item.multiple * price * item.total }}
                  </td>
                  <td
                    width="30"
                    height="30"
                    style="text-align: center"
                    @click="del(idx)"
                  >
                    <div class="ssc-panel-delete">X</div>
                  </td>
                </tr>
              </table>
            </div>
            <div v-if="isChase">
              <ChaseReason
                v-model="isChase"
                :tableTotal="tableTotal"
                ref="$ChaseReason"
                :id="id"
              />
            </div>

            <div v-if="isGroup">
              <GroupBuy
                v-model="isGroup"
                :tableTotal="tableTotal"
                ref="$groupBuy"
              />
            </div>

            <div class="ssc-panel-add">
              <div>
                <div class="common_layout_center_h">
                  <div class="ssc-panel-font">已添加</div>
                  <div
                    class="ssc-panel-font-red"
                    style="margin-left: 5px; margin-right: 5px"
                  >
                    {{ tableTotal.orders }}
                  </div>
                  <div class="ssc-panel-font">单，总注数</div>
                  <div
                    class="ssc-panel-font-red"
                    style="margin-left: 5px; margin-right: 5px"
                  >
                    {{ tableTotal.total }}
                  </div>
                  <div class="ssc-panel-font">注</div>
                </div>
              </div>
              <div class="common_layout_center_h">
                <div class="ssc-panel-font">总金额</div>
                <div
                  class="ssc-panel-font-red"
                  style="margin-left: 5px; margin-right: 5px"
                >
                  {{ tableTotal.totalMoney }}
                </div>
                <div class="ssc-panel-font">元</div>
              </div>
              <div class="common_layout_center_h">
                <div
                  class="cp-button-main ssc-panel-button2"
                  style="margin-right: 10px"
                  @click="sendChase"
                >
                  {{ isChase ? "取消追号" : "发起追号" }}
                </div>
                <div
                  class="cp-button-main ssc-panel-button2"
                  style="margin-right: 10px"
                  @click="sendGourp"
                >
                  {{ isGroup ? "取消合买" : "发起合买" }}
                </div>
                <div
                  v-loadding="loading"
                  @click="payNow"
                  class="cp-button-main ssc-panel-button2"
                >
                  <!---->
                  立即投注
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tipsDialog @sure="sure" ref="$tipsDialog">
      <p>请确认您的投注信息</p>
      <p>游戏：{{ curGame.lotteryName }}</p>
      <p>期数：共1期</p>
      <p>注数：共{{ tableTotal.total }}注</p>
      <p>金额：共{{ tableTotal.totalMoney }}元</p>
    </tipsDialog>
    <tipsDialog @sure="clearData" ref="$finshDialog" />
  </div>
</template>

<script>
import InfoMain from "@/components/InfoMain";
import userApi from "@/api/user";
import GroupBuy from "@/views/game/components/GroupBuy.vue";
import ChaseReason from "@/views/game/components/ChaseReason.vue";
import typeConfigList from "@/plugins/typeConfigList";
const initData = () => {
  return {
    curTab: 0,
    preId: 0,
    preData: {
      hot: [],
      losses: [],
      lastExpect: {},
    },
    isChase: false,
    isGroup: false,
    isFinsh: false,
    loading: false,
    price: 2,
    multiple: 1,
    total: 0,
    value: "直选复式",
    detail: {
      mulConfig: [],
      nextExpect: {},
    },
    tableList: [],
  };
};
export default {
  name: "gameHall",
  data() {
    return {
      ...initData(),
      tabs: [
        {
          name: "当前奖期",
          id: 0,
        },
        {
          name: "前期开奖",
          id: 1,
        },
        {
          name: "走势图",
          id: 2,
          img: "/static/gameHall/trend_chart.png",
        },
      ],
      preList: [
        {
          id: 0,
          name: "遗漏",
        },
        {
          id: 1,
          name: "冷热",
        },
      ],
      id: null,
      typeConfigList,
      cat: [
        {
          src: "/static/product/ssc.png",
          name: "高频彩",
          list: [],
          lotteryType: 0,
          open: false,
        },
        {
          src: "/static/product/five.png",
          name: "低频彩",
          list: [],
          lotteryType: 1,
          open: false,
        },
      ],
      curNav: null,
    };
  },
  components: {
    ChaseReason,
    GroupBuy,
    InfoMain,
    prePrize: () => import("./components/prePirze"),
    ball1: () => import("./components/ball1"),
    ball2: () => import("./components/ball2"),
    ball3: () => import("./components/ball3"),
    ball4: () => import("./components/ball4"),
    ball5: () => import("./components/ball5"),
    ball6: () => import("./components/ball6"),
    ball7: () => import("./components/ball7"),
    ball8: () => import("./components/ball8"),
  },
  computed: {
    typeList() {
      return this.typeConfigList[this.curNav] || [];
    },
    lotteryType() {
      const doc =
        this.cat.find((v) => v.list.find((doc) => doc.id === this.id)) || {};
      return doc.lotteryType;
    },
    choseNavs() {
      if (this.lotteryType === 0) {
        return [
          {
            name: "四星",
            id: "lotteryType0",
          },
          {
            name: "前三",
            id: "lotteryType2",
          },
          {
            name: "中三",
            id: "lotteryType3",
          },
          {
            name: "后三",
            id: "lotteryType4",
          },
        ];
      } else {
        return [
          {
            name: "三星",
            id: "lotteryType0",
          },
        ];
      }
    },
    curPre() {
      if (this.value == "直选复式") {
        return this.preId === 0 ? this.preData.losses : this.preData.hot;
      } else if (["组三复式", "组三胆拖"].includes(this.value)) {
        return this.preId === 0 ? [this.preData.zu3] : [this.preData.zu3_hot];
      } else if (["组六复式", "组六胆拖"].includes(this.value)) {
        return this.preId === 0 ? [this.preData.zu6] : [this.preData.zu6_hot];
      }
      return [];
    },
    catList() {
      let list = [];
      this.cat.forEach((v) => {
        list = list.concat(v.list);
      });
      return list;
    },
    curGame() {
      return this.catList.find((v) => v.id === this.id) || {};
    },
    tableTotal() {
      return {
        orders: this.tableList.length,
        total: this.tableList.reduce((total, item) => total + item.total, 0),
        totalMoney: this.tableList.reduce(
          (total, item) => total + item.totalMoney,
          0
        ),
      };
    },
    totalMoney() {
      return this.total * this.multiple * this.price;
    },
    currentComponent() {
      switch (this.value) {
        case "三星直选复式":
          return "ball1";
        case "三星直选单式":
          return "ball2";
        case "三星直选和值":
          return "ball3";
        case "三星组三复式":
          return "ball4";
        case "三星组三胆拖":
          return "ball5";
        case "三星组三单式":
          return "ball2";
        case "三星组六复式":
          return "ball6";
        case "三星组六胆拖":
          return "ball7";
        case "三星组六单式":
          return "ball2";
        case "三星组选和值":
          return "ball8";
        default:
          return "ball1";
      }
    },
    fullTxt() {
      const list = [];
      this.typeList.forEach((v) => {
        v.list.forEach((doc) => {
          list.push({
            txt: `${v.tip1}${doc.txt}`,
            desc: doc.desc,
            key: doc.txt,
          });
        });
      });
      return list;
    },
    model() {
      const model = this.fullTxt.find((item) => item.key === this.value) || {};
      return model.txt;
    },
    choseValue() {
      return this.fullTxt.find((v) => v.key === this.value) || {};
    },
  },
  watch: {
    choseNavs(v) {
      console.log(v);
    },
    curNav() {
      this.value = this.typeList[0].list[0].txt;
    },
    lotteryType() {
      this.curNav = this.choseNavs[0].id;
    },
    multiple(v) {
      //范围1 -999
      if (v < 1) {
        this.multiple = 1;
      } else if (v > 999) {
        this.multiple = 999;
      }
    },
  },
  methods: {
    changeNav(v) {
      this.curNav = v;
    },
    changeTab(v) {
      this.curTab = v;
    },
    clearData() {
      this.tableList = [];
      this.isGroup = false;
      this.isChase = false;
    },
    clearTable() {
      if (!this.tableList.length) return;
      this.$refs.$clearDialog.open("确定清空已投注内容？");
    },
    sendGourp() {
      const num = +this.tableTotal.totalMoney || 0;
      if (num < 2) {
        this.$refs.$finshDialog.open("订单金额低于 2 元，不能发起合买");
        return;
      }
      if (!this.$refs.$groupBuy) {
        this.isGroup = true;
      }

      this.$nextTick(() => {
        this.$refs.$groupBuy.toggle();
      });
    },
    sendChase() {
      if (this.tableTotal.total < 1) {
        this.$refs.$finshDialog.open("订单注数低于 1 注，不能发起追号");
        return;
      }
      if (!this.$refs.$ChaseReason) {
        this.isChase = true;
      }
      this.$nextTick(() => {
        this.$refs.$ChaseReason.toggle();
      });
    },
    changePre(v) {
      this.preId = v;
    },
    openFish() {
      this.$refs.$finshDialog.open(
        `当前期数【${this.detail.nextExpect.nextExpect}】已停止下注，是否清空已投注内容？`
      );
    },
    finish() {
      if (this.detail.nextExpect.countdown === undefined) return;
      this.isFinsh = true;
      //this.openFish();
      this.changeId();
    },
    async changeId(v) {
      Object.assign(this.$data, initData());
      if (+v) {
        if (this.id === v) {
          return;
        }
        this.id = v;
      }
      await this.initDetail();
    },
    openDiag() {
      this.$refs.$tipsDialog.open();
    },
    async payNow() {
      if (this.tableList.length === 0) return;
      this.openDiag();
    },
    async sure() {
      if (this.loading) return;
      let dataStr = "";
      this.tableList.forEach((v) => {
        //dataStr += `${v.model} ${v.text} ${v.multiple}/`;
        if (!dataStr) {
          dataStr = `${v.model} ${v.text} ${v.multiple}`;
        } else {
          dataStr += `/${v.model} ${v.text} ${v.multiple}`;
        }
      });
      const chaseData = this.$refs.$ChaseReason.dataForm;
      if (chaseData.content && this.isChase) {
        this.lotteryBetsRes(dataStr);
        return;
      }
      if (this.isGroup) {
        await this.lotteryBets(dataStr);
      } else {
        await this.ajaxPay(dataStr);
      }
    },
    async ajaxPay(v) {
      const [err] = await userApi.lotteryBet({
        lotteryId: this.id,
        betCode: v,
      });
      if (err) return;
      this.$message.success("投注成功");
    },
    lotteryBetsRes(v) {
      const params = {
        lotteryId: this.id,
        betCode: v,
        ...this.$refs.$ChaseReason.dataForm,
        together: 0,
      };
      if (this.isGroup) {
        Object.assign(params, {
          ...this.$refs.$groupBuy.dataForm,
          together: 1,
        });
      }
      const [err] = userApi.lotteryBetsRe(params);
      if (err) return;
      this.$message.success("追号成功");
    },
    async lotteryBets(v) {
      const [err] = await userApi.lotteryBet({
        lotteryId: this.id,
        betCode: v,
        ...this.$refs.$groupBuy.dataForm,
      });
      if (err) return;
      this.$message.success("合买成功");
    },
    multipleInupt(v) {
      console.log(v);
    },
    multipleChange(v) {
      if (v < 1) {
        this.multiple--;
        this.multiple = Math.max(1, this.multiple);
      } else {
        this.multiple++;
        this.multiple = Math.min(999, this.multiple);
      }
    },
    async playerLotteryList() {
      const [err, res] = await userApi.playerLotteryList();
      if (err) return;
      res.data.forEach((v) => {
        this.cat.forEach((doc) => {
          if (+v.lotteryType === +doc.lotteryType) {
            doc.list.push(v);
          }
        });
      });

      this.cat.forEach((doc) => {
        if (doc.list.length && !this.id) {
          this.id = doc.list[0].id;
          doc.open = true;
        }
      });
    },
    changeValue(value) {
      this.value = value;
    },
    async getPreData(s) {
      if (s !== "stop") {
        const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
        if (err) return;
        const { lastExpect } = res.data;
        const cur = this.preData.lastExpect.cycleNum;
        if (cur && lastExpect.cycleNum !== cur) {
          this.preData = res.data;
          await this.getDetail();
        }
      }

      this.tirmr = setTimeout(this.getPreData, 3000);
    },
    async lotteryCurrExpect() {
      const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
      if (err) return;
      this.preData = res.data;
    },
    async getDetail() {
      const [err, res] = await userApi.betsDetail({ id: this.id });
      if (err) return;
      res.data.mulConfig = JSON.parse(res.data.mulConfig);
      if (!res.data.nextExpect) {
        res.data.nextExpect = {};
      }
      this.detail = res.data;
    },
    initDetail() {
      // this.getDetail();
      // this.lotteryCurrExpect();
      return Promise.all([this.getDetail(), this.lotteryCurrExpect()]);
    },
    randem() {
      this.$refs.$cont.randem();
      this.$nextTick(() => {
        this.add();
      });
    },
    add() {
      const status = this.$refs.$cont.add();
      if (!status) return;
      this.tableList.push({
        model: this.model,
        text: this.$refs.$cont.text,
        total: this.total,
        multiple: this.multiple,
        totalMoney: this.totalMoney,
      });
      this.$refs.$cont.clear();
    },
    del(index) {
      this.tableList.splice(index, 1);
    },
  },
  async created() {
    await this.playerLotteryList();
    await this.initDetail();
    this.getPreData("stop");
  },
  beforeDestroy() {
    this.tirmr && clearTimeout(this.tirmr);
  },
};
</script>
<style scoped lang="scss">
.game-hall-main {
  ::v-deep(.van-count-down) {
    color: #ffa800;
    font-size: 18px;
  }
  .cp-step-input {
    color: #333;
  }
  .lottery-result-ball {
    justify-content: space-around;
  }
  .number-ball-main {
    width: 72px;
    height: 72px;
    font-size: 28px;
    border-radius: 36px;
    background-size: 100% 100%;
    background-position: center;
  }
}
</style>
