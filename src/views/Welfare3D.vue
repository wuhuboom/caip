<template>
  <div class="c-page bg-grey">
    <div class="center-center m-t-48" v-if="!value">
      <van-loading color="#bf2935" />
    </div>
    <template v-else>
      <!-- 顶栏 -->
      <AppTopBar
        class="app-top-bar"
        :styleObj="{ backgroundColor: '#202521' }"
        :titleSolt="true"
      >
        <template v-slot:title>
          <div
            class="title-desc center-center"
            @click="showSelect = !showSelect"
          >
            <!-- {{ detail.lotteryNameH5 }} -->
            {{ value }}
            <img
              class="d-img downd m-l-8"
              src="@/assets/img/downd.png"
              alt=""
            />
          </div>
          <div class="center-box" v-if="showSelect">
            <div class="bg" @click="showSelect = false"></div>
            <div class="downs-box">
              <div class="select-box">
                <div
                  class="select"
                  v-for="(item, index) in firstNavs"
                  :key="index"
                  @click="changeNav(item)"
                  :class="{ on: curTab === item }"
                >
                  {{ item }}
                </div>
              </div>
              <div v-for="(item, index) in secondNavs" :key="index">
                <p class="desc">{{ `${item.name}` }}</p>
                <div class="select-box">
                  <div
                    class="select"
                    :data-name="v.txt"
                    v-for="(v, i) in item.list"
                    :key="i"
                    @click="(showSelect = false), (value = v.txt)"
                    :class="{ on: value === v.txt }"
                  >
                    {{ replaceCat(item.name, v.txt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:right>
          <div
            class="m-r-32 colorfff font14"
            @click="
              $router.push({
                path: '/winning-list',
                query: {
                  id: id,
                  lotteryName: detail.lotteryNameH5,
                },
              })
            "
          >
            往期开奖
          </div>
        </template>
      </AppTopBar>
      <div class="justify-between header-desc font12">
        <ul>
          <li>第{{ detail.nextExpect.nextExpect }}期</li>
          <li class="font10 m-t-8 m-b-16">投注截止时间</li>
          <li>
            <van-count-down
              @finish="openFish"
              @change="changeCount"
              :time="detail.nextExpect?.countdown * 1000"
            >
              <template #default="timeData">
                <div class="colorfff timeData align-center">
                  <span class="block center-center">{{
                    timeData.hours >= 10 ? timeData.hours : `0${timeData.hours}`
                  }}</span>
                  <span class="colon center-center">:</span>
                  <span class="block center-center">{{
                    timeData.minutes >= 10
                      ? timeData.minutes
                      : `0${timeData.minutes}`
                  }}</span>
                  <span class="colon center-center">:</span>
                  <span class="block center-center">{{
                    timeData.seconds >= 10
                      ? timeData.seconds
                      : `0${timeData.seconds}`
                  }}</span>
                </div>
              </template>
            </van-count-down>
          </li>
        </ul>
        <ul class="flex-column justify-between">
          <li>第{{ preData.lastExpect.cycleNum }}开奖号码</li>
          <li
            v-if="preData.lastExpect.openNum"
            class="align-center chose-ball-list"
          >
            <p
              class="chose-ball font16 center-center colorfff m-l-16"
              v-for="(item, idx) in preData.lastExpect.openNum.split(',')"
              :key="idx"
            >
              {{ item }}
            </p>
          </li>
        </ul>
      </div>
      <div class="main-wrap">
        <div class="des-box">
          <div class="left">{{ descTxt }}</div>
          <div class="right font10 center-center" @click="randem">
            <img class="d-img ramd m-r-12" src="@/assets/img/ramd.png" alt="" />
            随机一注
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <component
            :curPre="curPre"
            ref="$cont"
            @total="giveTotal"
            :is="currentComponent"
            :key="value"
            v-bind="getComponentProps"
          ></component>
        </transition>
        <div class="m-t-32">
          <ul class="bets-desc colorfff font14 justify-around align-center">
            <li class="clear-list list-btn center-center" @click="delALL">
              <van-icon name="delete-o" class="m-r-16" />
              清空列表
            </li>
            <li class="add-list list-btn center-center" @click="add">
              <van-icon name="plus" class="m-r-16" />
              添加至投注列表
            </li>
          </ul>
        </div>
        <ul class="orders-list m-b-32">
          <li class="font16 align-center justify-between">
            <ul class="align-center">
              <li>投注列表</li>
              <!-- <li class="font12 align-center">
                <div class="t1">{{ totalALL }}注</div>
                <div class="t2">共{{ btmMoney }}元</div>
              </li> -->
            </ul>
            <p class="font14" @click="$router.push('/MyBallRecord')">
              购票记录 <van-icon name="arrow" />
            </p>
          </li>
          <li class="orders-cont m-t-32 p-x-24">
            <p
              v-for="(v, i) in tableList"
              :key="i"
              class="orders-item align-center p-b-24"
            >
              <span class="no-shrink m-r-8">
                {{ v.model }} {{ v.total }}注 {{ v.totalMoney }}元
              </span>
              <span>
                {{ v.text }}
              </span>
            </p>
          </li>
        </ul>
      </div>
      <BetOn
        :id="id"
        @delALL="delALL"
        @delOne="delOne"
        @buySuccess="buySuccess"
        :tableList="tableList"
        :detail="detail"
        :milliseconds="milliseconds"
        @openChase="openChase"
        @openGroupBuy="openGroupBuy"
        ref="$BetOn"
      />
      <tipsDialog @sure="clearData" ref="$finshDialog" />
      <AppendChase
        :id="id"
        :tableList="tableList"
        :detail="detail"
        @buySuccess="buySuccess"
        :milliseconds="milliseconds"
        ref="$AppendChase"
      />
      <BuyTogether
        :id="id"
        @delALL="delALL"
        @delOne="delOne"
        @buySuccess="buySuccess"
        :tableList="tableList"
        :detail="detail"
        :milliseconds="milliseconds"
        ref="$BuyTogether"
      />
      <!-- 底部 BuyTogether -->
      <div class="betting-box">
        <div class="fixed">
          <ul class="fixed-up align-center justify-between colorfff">
            <li>倍数:</li>
            <li><van-stepper v-model="multiple" /></li>
          </ul>
          <div class="align-center flex-1 fixed-btm">
            <div class="center total-all">
              <div class="t1">{{ total }}注</div>
              <div class="t2">共{{ totalMoney }}元</div>
            </div>
            <div
              class="right"
              @click="openChase"
              style="background-color: #484848"
            >
              追号
            </div>
            <div class="right" @click="sure">投注</div>
          </div>
        </div>
      </div>
      <div class="together flex-column center-center">
        <ul class="room-enter flex-column center-center m-b-32" v-if="showRoom">
          <li @click="$router.push('/chat')" class="m-b-16">
            <img class="d-img" src="@/assets/img/rooml1.png" alt="" />
          </li>
          <li>
            <img
              @click="showRoom = !showRoom"
              class="d-img"
              src="@/assets/img/rooml2.png"
              alt=""
            />
          </li>
        </ul>
        <div class="group-btn">
          <img
            class="d-img"
            @click="openGroupBuy"
            src="@/assets/img/together.png"
            alt=""
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import userApi from "@/api/user";
import tipsDialog from "@/components/tipsDialog.vue";
import auth from "@/plugins/auth";
import typeConfigList from "@/plugins/typeConfigList";
import AppendChase from "./components/AppendChase";
import ball1 from "./components/ball1";
import ball10 from "./components/ball10";
import ball11 from "./components/ball11";
import ball12 from "./components/ball12";
import ball13 from "./components/ball13";
import ball14 from "./components/ball14";
import ball15 from "./components/ball15";
import ball16 from "./components/ball16";
import ball17 from "./components/ball17";
import ball18 from "./components/ball18";
import ball19 from "./components/ball19";
import ball2 from "./components/ball2";
import ball20 from "./components/ball20";
import ball21 from "./components/ball21";
import ball22 from "./components/ball22";
import ball23 from "./components/ball23";
import ball24 from "./components/ball24";
import ball25 from "./components/ball25";
import ball26 from "./components/ball26";
import ball27 from "./components/ball27";
import ball3 from "./components/ball3";
import ball4 from "./components/ball4";
import ball5 from "./components/ball5";
import ball6 from "./components/ball6";
import ball7 from "./components/ball7";
import ball8 from "./components/ball8";
import ball9 from "./components/ball9";
import BetOn from "./components/BetOn";
import BuyTogether from "./components/BuyTogether";
export default {
  name: "Welfare3D",
  data() {
    return {
      showRoom: true,
      milliseconds: 0,
      total: 0,
      preId: 0,
      linkQuery: this.$route.query,
      showMore: false,
      showSelect: false,
      showBeforeLottery: false,
      curTab: "",
      value: "",
      tableData: {},
      preData: {
        hot: [],
        losses: [],
        lastExpect: {},
      },
      catTree: [],
      detail: {
        mulConfig: [],
        nextExpect: {},
      },
      tableList: [],
      multiple: 1,
      nums: [],
    };
  },
  components: {
    BuyTogether,
    AppendChase,
    tipsDialog,
    BetOn,
    ball1,
    ball2,
    ball3,
    ball4,
    ball5,
    ball6,
    ball7,
    ball8,
    ball9,
    ball10,
    ball11,
    ball12,
    ball13,
    ball14,
    ball15,
    ball16,
    ball17,
    ball18,
    ball19,
    ball20,
    ball21,
    ball22,
    ball23,
    ball24,
    ball25,
    ball26,
    ball27,
  },
  watch: {
    // curTab() {
    //   this.setValue();
    // },
    value() {
      this.total = 0;
      this.viewHistory();
    },
  },
  computed: {
    theOne() {
      return this.$store.state.theOne;
    },
    currentComponent() {
      switch (this.value) {
        // 复式类型
        case "三星直选复式":
        case "后三直选复式":
        case "中三直选复式":
        case "前三直选复式":
          return "ball1";

        // 单式类型
        case "三星直选单式":
        case "后三直选单式":
        case "中三直选单式":
        case "前三直选单式":
          return "ball2";
        case "三星组选组选":
          return "ball27";
        // 和值类型
        case "三星直选和值":
        case "后三直选和值":
        case "中三直选和值":
        case "前三直选和值":
          return "ball3";

        // 组三复式类型
        case "三星组三复式":
        case "后三组三复式":
        case "中三组三复式":
        case "前三组三复式":
          return "ball4";
        case "三星组选组三":
          return "ball18";
        case "三星跨度":
          return "ball25";
        case "三星组选组三胆拖":
          return "ball19";
        // 组三胆拖类型
        case "三星组三胆拖":
        case "后三组三胆拖":
        case "中三组三胆拖":
        case "前三组三胆拖":
          return "ball5";

        // 组三单式类型
        case "三星组三单式":
        case "后三组三单式":
        case "中三组三单式":
        case "前三组三单式":
          return "ball12";
        case "三星组选组三自填":
          return "ball20";
        case "三星组选组六自填":
          return "ball23";
        // 组六复式类型
        case "三星组六复式":
        case "后三组六复式":
        case "中三组六复式":
        case "前三组六复式":
          return "ball6";
        case "三星组选组六":
          return "ball21";
        // 组六胆拖类型
        case "三星组六胆拖":
        case "后三组六胆拖":
        case "中三组六胆拖":
        case "前三组六胆拖":
          return "ball7";
        case "三星组选组六胆拖":
          return "ball22";
        // 组六单式类型
        case "三星组六单式":
        case "后三组六单式":
        case "中三组六单式":
        case "前三组六单式":
          return "ball13";

        // 组选和值类型
        case "中三组选和值":
        case "后三组选和值":
        case "三星组选和值":
          return "ball8";
        case "三星和值":
        case "三星特码":
          return "ball24";
        // 四星类型
        case "四星直选复式":
          return "ball9";
        case "四星直选单式":
          return "ball10";

        // 直选组合类型
        case "后三直选组合":
        case "中三直选组合":
        case "前三直选组合":
          return "ball11";
        case "三星独胆":
        case "三星对子":
          return "ball14";
        case "三星双飞":
          return "ball15";
        case "三星一码百位":
        case "三星一码十位":
        case "三星一码个位":
          return "ball16";
        case "三星二码百十位":
        case "三星二码百个位":
        case "三星二码十个位":
          return "ball17";
        case "三星大小单双":
        case "三星波色龙虎和":
        case "三星豹子顺子对子":
          return "ball26";
        // 默认情况
        default:
          return "ball1";
      }
    },
    getComponentProps() {
      if (this.value.includes("直选和值")) {
        return {
          className: "flex-start",
        };
      }
      if (this.value === "前三直选复式") {
        return {
          titleText: ["万位", "千位", "百位"],
        };
      }
      if (this.value === "中三直选复式") {
        return {
          titleText: ["千位", "百位", "十位"],
        };
      }
      if (this.value === "后三直选复式") {
        return {
          titleText: ["百位", "十位", "个位"],
        };
      }
      if (this.value === "三星一码百位") {
        return {
          titleText: ["百位"],
        };
      }
      if (this.value === "三星一码十位") {
        return {
          titleText: ["十位"],
        };
      }
      if (this.value === "三星一码个位") {
        return {
          titleText: ["个位"],
        };
      }
      if (this.value === "三星二码百十位") {
        return {
          titleText: ["百位", "十位"],
        };
      }
      if (this.value === "三星二码百个位") {
        return {
          titleText: ["百位", "个位"],
        };
      }
      if (this.value === "三星二码十个位") {
        return {
          titleText: ["十位", "个位"],
        };
      }
      if (this.value === "三星特码") {
        return {
          titleText: ["特码"],
        };
      }
      return {
        betListDocs: this.betListDocs,
      };
    },
    curPre() {
      const {
        losses,
        hot,
        // zu3,
        // zu3_hot,
        // zu6,
        // zu6_hot,
        zxzh1,
        zxzh1_hot,
        zxzh2,
        zxzh2_hot,
        zxzh3,
        zxzh3_hot,
      } = this.preData;

      switch (this.value) {
        case "三星直选复式":
          return this.preId === 0 ? losses : hot;
        case "三星一码百位":
          return this.preId === 0 ? losses[0] : hot[0];
        case "三星一码十位":
          return this.preId === 0 ? losses[1] : hot[1];
        case "三星一码个位":
          return this.preId === 0 ? losses[2] : hot[2];
        ////三星二码百十位  三星二码百个位 三星二码十个位
        case "三星二码百十位":
          return this.preId === 0 ? [losses[0], losses[1]] : [hot[0], hot[1]];
        case "三星二码百个位":
          return this.preId === 0 ? [losses[0], losses[2]] : [hot[0], hot[2]];
        case "三星二码十个位":
          return this.preId === 0 ? [losses[1], losses[2]] : [hot[1], hot[2]];
        case "三星组六复式":
        case "三星组选组六":
        case "三星组六胆拖":
        case "三星组选组六胆拖":
        case "三星组三复式":
        case "三星组三胆拖":
        case "前三组三复式":
        case "前三组三胆拖":
        case "前三组六复式":
        case "前三组六胆拖":
        case "前三直选组合":
        case "三星独胆":
        case "三星双飞":
        case "三星对子":
        case "三星组选组三":
        case "三星组选组三胆拖":
        case "三星跨度":
          return this.preId === 0 ? [zxzh1] : [zxzh1_hot];

        case "中三组三复式":
        case "中三组三胆拖":
        case "中三组六复式":
        case "中三组六胆拖":
        case "中三直选组合":
          return this.preId === 0 ? [zxzh2] : [zxzh2_hot];

        case "后三组三复式":
        case "后三组三胆拖":
        case "后三组六复式":
        case "后三组六胆拖":
        case "后三直选组合":
          return this.preId === 0 ? [zxzh3] : [zxzh3_hot];
        //-------------------
        // 四星直选复式
        case "四星直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k > 0)
            : hot.filter((_, k) => k > 0);

        // 前三直选复式
        case "前三直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k < 3)
            : hot.filter((_, k) => k < 3);

        // 中三直选复式
        case "中三直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k > 0 && k < 4)
            : hot.filter((_, k) => k > 0 && k < 4);

        // 后三直选复式
        case "后三直选复式":
          return this.preId === 0
            ? losses.filter((_, k) => k > 1 && k < 5)
            : hot.filter((_, k) => k > 1 && k < 5);

        // 默认情况
        default:
          return [];
      }
    },
    id() {
      return +this.linkQuery.id;
    },
    tabs() {
      if (+this.linkQuery.type === 1) {
        return {
          lotteryType1: typeConfigList["lotteryType1"],
        };
      }
      return {
        // lotteryType0: typeConfigList["lotteryType0"],
        lotteryType4: typeConfigList["lotteryType4"],
        lotteryType3: typeConfigList["lotteryType3"],
        lotteryType2: typeConfigList["lotteryType2"],
      };
    },
    firstNavs() {
      return this.catTree.map((item) => item.name);
    },
    secondNavs() {
      return this.catTree.find((item) => item.name === this.curTab)?.list || [];
    },
    hideMulConfig() {
      const arr = this.detail.mulConfig.filter((item) => +item.show === 0);
      return arr.map((item) => item.title);
    },
    descTxt() {
      const newAmount = this.curItemValue.value || "";
      const text = this.curItemValue.desc || "";
      if (!newAmount) return text;
      return text.replace(/\d+元/, newAmount + "元");
    },
    curItemValue() {
      let arr = {};
      this.secondNavs.forEach((item) => {
        item.list.forEach((v) => {
          if (v.txt === this.value) {
            arr = v;
          }
        });
      });
      return arr;
    },
    totalALL() {
      return this.tableList.reduce((pre, cur) => pre + cur.total, 0);
    },
    btmMoney() {
      return this.tableList.reduce((pre, cur) => pre + cur.totalMoney * 1, 0);
    },
    totalMoney() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.docsListValue = "";
      if (this.total == 0) return 0;
      const betList =
        this.lastTree.find((doc) => doc.txt === this.value)?.betList || [];

      if (this.theOne.includes(this.value)) {
        if (["三星组选组选"].includes(this.value)) {
          const group3 = []; // 组三（有两个相同数字）
          const group6 = []; // 组六（三个数字都不同）

          this.nums.forEach((num) => {
            const digits = num.split("").sort(); // 分割为数组并排序
            const uniqueDigits = new Set(digits); // 转 Set 统计不同数字

            if (uniqueDigits.size === 2) {
              group3.push(num); // 组三
            } else if (uniqueDigits.size === 3) {
              group6.push(num); // 组六
            }
          });

          console.log("组三:", group3, "组六:", group6);

          // 获取 price3 和 price6
          let price3Obj = betList.find((item) => item.txt === "组三");
          let price6Obj = betList.find((item) => item.txt === "组六");

          let price3 = price3Obj ? price3Obj.bet : 0;
          let price6 = price6Obj ? price6Obj.bet : 0;
          let value3 = price3Obj ? price3Obj.value : 0;
          let value6 = price6Obj ? price6Obj.value : 0;
          // 计算总金额
          let totalAmount =
            (group3.length * price3 + group6.length * price6) * this.multiple;

          // 计算 docsListValue
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.docsListValue = this.divide(
            group3.length * value3 + group6.length * value6,
            false
          );

          return totalAmount;
        }

        // 组三金额=list[号码个数-2].bet
        // 组六金额=list[号码个至少输入2个号码,每个以英文逗号","分隔，例如：1,2,3数-3].bet
        // 和值金额=list[号码].bet
        if (
          ["三星和值", "三星跨度", "三星特码", "三星组选组选"].includes(
            this.value
          )
        ) {
          const reduceNum = this.nums.reduce((total, num) => {
            return total + betList[num].value * 1;
          }, 0);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.docsListValue = this.divide(reduceNum, false);
          //list[号码].bet 相加
          return this.nums.reduce((total, num) => {
            return total + betList[num].bet * this.multiple;
          }, 0);
        }
        if (
          ["三星大小单双", "三星波色龙虎和", "三星豹子顺子对子"].includes(
            this.value
          )
        ) {
          const reduceNum = this.nums.reduce((total, num) => {
            const betItem = betList.find((item) => item.txt === num);
            return total + betItem?.value * 1;
          }, 0);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.docsListValue = this.divide(reduceNum, false);
          return this.nums.reduce((total, num) => {
            const betItem = betList.find((item) => item.txt === num);
            return total + (betItem?.bet || 0) * this.multiple;
          }, 0);
        }
        let cutNum = 0;
        if (["组三", "胆拖"].find((v) => this.value.includes(v))) {
          cutNum = 2;
        } else if (this.value.includes("组六")) {
          cutNum = 4;
        } else if (this.value.includes("和值")) {
          cutNum = this.nums.length;
        }
        cutNum = this.nums.length - cutNum;
        let docs = betList[cutNum] || {};
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.docsListValue = docs.value;
        console.log("三星特码");
        return docs.bet * this.multiple || 0;
      }
      return this.divide(
        this.total * this.multiple * this.getPrice(this.value),
        false
      );
    },
    curNav() {
      return this.curTab;
    },
    lastTree() {
      return this.extractDeepList(this.catTree);
    },
    betListDocs() {
      return this.lastTree.find((doc) => doc.txt === this.value)?.betList || [];
    },
  },
  methods: {
    changeNav(v) {
      this.curTab = v;
      this.setValue();
    },
    giveTotal(v, n) {
      this.total = v;
      this.nums = n || [];
    },
    replaceCat(name, txt) {
      if (!txt) return "";
      if (name === "三星组选") {
        return txt.replace(name, "").replace(this.curNav, "");
      }
      return txt.replace(this.curNav, "");
    },
    extractDeepList(data) {
      const result = [];

      const traverse = (arr) => {
        arr.forEach((item) => {
          if (item.list) {
            traverse(item.list);
          } else {
            result.push(item);
          }
        });
      };

      traverse(data);
      return result;
    },
    setValue() {
      this.secondNavs.forEach((item, index) => {
        item.list.forEach((v, idx) => {
          if (index === 0 && idx === 0) {
            this.value = v.txt;
          }
        });
      });
    },
    changeCount(v) {
      const { days, hours, minutes, seconds, milliseconds } = v;
      // 转换为总毫秒数
      this.milliseconds =
        days * 24 * 60 * 60 * 1000 +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000 +
        milliseconds;
    },
    openChase() {
      this.$refs.$AppendChase.open({
        multiple: this.multiple, //倍数
        totalALL: this.totalALL, //多数注数
        totalMoney: this.btmMoney, //总金额
      });
    },
    openGroupBuy() {
      this.$refs.$BuyTogether.open({
        multiple: this.multiple, //倍数
        totalALL: this.totalALL, //多数注数
        totalMoney: this.btmMoney, //总金额
      });
    },
    pageDell() {
      this.$refs.$cont.clear();
    },
    delALL() {
      this.tableList = [];
    },
    delOne(index) {
      this.tableList.splice(index, 1);
    },
    showTop() {
      this.showBeforeLottery = !this.showBeforeLottery;
      if (this.showBeforeLottery) {
        this.lotteryHisExpect();
      }
    },
    async getPreData(s) {
      if (s !== "stop") {
        const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
        if (!err) {
          const { lastExpect } = res.data;
          const cur = this.preData.lastExpect.cycleNum;
          if (cur && lastExpect.cycleNum !== cur) {
            this.preData = res.data;
            await this.getDetail();
          }
        }
      }

      this.tirmr = setTimeout(this.getPreData, 3000);
    },
    async lotteryCurrExpect() {
      const [err, res] = await userApi.lotteryCurrExpect({ id: this.id });
      if (err) return;
      this.preData = res.data;
    },
    setHistory() {
      const storedData = auth.getToken("curDoc");
      if (!storedData) return null;

      const arr = JSON.parse(storedData) || [];
      const curDoc = arr.find((v) => v.id === this.id);
      if (!curDoc) return null;

      const { curNav, value } = curDoc;

      const isHava = this.catTree.some(
        (v) =>
          v.name === curNav &&
          v.list?.some((doc) => doc.list?.some((item) => item.txt === value))
      );

      if (isHava) {
        this.curTab = curNav;
        this.value = value;
        return curDoc;
      }

      return null;
    },

    viewHistory() {
      if (!this.value) return;
      const arr = auth.getToken("curDoc")
        ? JSON.parse(auth.getToken("curDoc"))
        : [];
      const curDoc = {
        id: this.id,
        curNav: this.curTab,
        value: this.value,
      };
      // arr 根据id 查找，没有就插入以后就修改
      const index = arr.findIndex((v) => v.id === this.id);
      if (index === -1) {
        arr.push(curDoc);
      } else {
        arr[index] = curDoc;
      }
      //arr 保留最新20条
      if (arr.length > 20) {
        arr.shift();
      }
      auth.setToken(JSON.stringify(arr), "curDoc");
    },
    async getDetail() {
      const [err, res] = await userApi.betsDetail({ id: this.id });
      if (err) return;
      this.catTree = JSON.parse(res.data.mulConfig);
      res.data.mulConfig = JSON.parse(res.data.mulConfig);
      console.log(this.catTree);
      //value
      if (!res.data.nextExpect) {
        res.data.nextExpect = {};
      }
      this.detail = res.data;
      const curDoc = this.setHistory();
      if (!curDoc) {
        this.curTab = this.catTree[0]?.name;
        this.setValue();
      }
    },
    initDetail() {
      // this.getDetail();
      // this.lotteryCurrExpect();
      return Promise.all([this.getDetail(), this.lotteryCurrExpect()]);
    },
    async lotteryHisExpect() {
      const [err, res] = await userApi.lotteryHisExpect({
        pageNo: 1,
        pageSize: 10,
        id: +this.id,
      });
      if (err) return;
      this.tableData = res.data;
    },
    closeContDialog() {
      this.$refs.$BetOn?.close();
      this.$refs.$AppendChase?.close();
      this.$refs.$BuyTogether?.close();
    },
    buySuccess() {
      this.delALL();
      this.closeContDialog();
      this.multiple = 1;
    },
    openFish() {
      this.closeContDialog();
      this.$refs.$finshDialog.open(
        `当前期数【${this.detail.nextExpect.nextExpect}】已停止下注，是否清空已投注内容？`
      );
      this.showSelect = false;
      this.showBeforeLottery = false;
    },
    clearData() {
      if (this.$refs.$BetOn?.tableList?.length) {
        this.$refs.$BetOn.close();
        this.tableList = [];
      }
    },
    badge() {
      if (!this.tableList.length) {
        this.$toast("请先选择投注");
        return;
      }
      this.$refs.$BetOn.open();
    },
    randem() {
      this.$refs.$cont?.randem();
      this.$nextTick(() => {
        this.add();
      });
    },
    async sure() {
      if (!this.tableList.length) {
        this.$toast("请先选择投注");
        return;
      }
      await this.ajaxPay(this.$util.getStrs(this.tableList));
    },
    async ajaxPay(v) {
      this.$toast.loading({ duration: 0, message: "投注中..." });
      const [err] = await userApi.lotteryBet({
        lotteryId: this.id,
        betCode: v,
      });
      if (err) return;
      this.multiple = 1;
      this.buySuccess();
      this.$toast("投注成功");
    },
    getPrice(v) {
      return this.lastTree.find((doc) => doc.txt === v)?.bet || 2;
    },
    add() {
      const status = this.$refs.$cont.add();
      if (!status) {
        return;
      }
      const price = this.getPrice(this.value);
      this.tableList.push({
        model: this.value,
        text: this.$refs.$cont.text,
        total: this.total,
        multiple: this.multiple,
        price: this.theOne.includes(this.value) ? this.totalMoney : price,
        totalMoney: this.totalMoney,
      });
      this.$toast("添加成功");
      //body滑动底部
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      this.$refs.$cont.clear();
    },
  },
  async created() {
    await this.initDetail();
    this.getPreData("stop");
  },
  beforeDestroy() {
    this.tirmr && clearTimeout(this.tirmr);
  },
};
</script>
<style scoped lang="less">
.app-top-bar {
  .center-box {
    position: fixed;
    top: 90px;
    left: 0;
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    align-items: flex-end;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
    }
    .select-box {
      position: relative;
      background: #fff;
      padding: 40px 34px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 40px;
      width: 100%;
      .select {
        width: 200px;
        height: 68px;
        text-align: center;
        line-height: 68px;
        border: 1px solid #999999;
        border-radius: 14px;
        color: #666666;
        font-size: 28px;
        overflow: hidden;
        &.on {
          color: #bf2935;
          border: 1px solid #bf2935;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            background: url("@/assets/img/Welfare3D/dui.png") no-repeat;
            background-size: 100% auto;
            width: 36px;
            height: 36px;
            right: -1px;
            bottom: -1px;
          }
        }
      }
    }
  }
  .right-box {
    width: 100px;
    font-size: 48px;
    position: relative;
    .more-pop {
      position: absolute;
      right: 20px;
      top: 0.9rem;
      z-index: 99;
      background: #fff;
      border-radius: 6px 6px 6px 6px;
      box-shadow: 0px 6px 12px 2px rgba(0, 0, 0, 0.16);
      color: #666666;
      display: flex;
      font-size: 28px;
      align-items: center;
      padding: 24px 24px;

      .text {
        width: 400px;
      }
      .js-icon {
        background: url("@/assets/img/Welfare3D/js-icon.png") no-repeat;
        background-size: 100% auto;
        width: 48px;
        height: 48px;
        margin-right: 14px;
      }
      .top-icon {
        position: absolute;
        top: -25px;
        right: 8px;
        transform: rotate(-90deg);
        font-size: 40px;
      }
    }
  }
}
.before-lottery {
  .lists {
    display: flex;
    height: 64px;
    background: #fff;
    padding: 0 28px;
    line-height: 64px;
    font-size: 24px;
    &:nth-child(2n) {
      background: #f9f9f9;
    }
  }
  .left {
    text-align: center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: end;
    .num-box {
      flex: 1;
      text-align: center;
      color: #bf2935;
      font-size: 36px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      .num {
        width: 50px;
        text-align: center;
      }
    }
    .time {
      text-align: center;
    }
  }
}
.periods-box {
  display: flex;
  height: 100px;
  align-items: center;
  padding: 0 28px;
  background: #fff;
  .left {
    flex: 1;
  }
  .right {
    display: flex;
    align-items: center;
    .time {
      color: #bf2935;
      // margin-right: 36px;
    }
    .icon {
      font-size: 40px;
    }
  }
}
.main-wrap {
  padding: 28px 0;
  .des-box {
    display: flex;
    align-items: center;
    padding: 0 28px;
    .left {
      flex: 1;
      font-size: 24px;
      color: #6e634f;
    }
    .right {
      color: #b18600;
      .ramd {
        width: 32px;
        height: 32px;
      }
    }
  }
  .xuan-box {
    .xuan-list {
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      padding: 40px 28px;
      .left {
      }
      .right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        margin-right: 30px;
        margin-bottom: 20px;
        &.small {
          margin-right: 30px;
          .num-top {
            color: #fff;
            font-weight: 400;
            font-size: 28px;
            min-width: 90px;
            padding: 0 8px;
            border-radius: 60px;
          }
        }
        .num-top {
          border: 2px solid #bf2935;
          height: 60px;
          line-height: 60px;
          font-weight: bold;
          font-size: 32px;
          color: #bf2935;
          min-width: 60px;
          text-align: center;
          border-radius: 100%;
          &.on {
            background: #bf2935;
            color: #fff;
          }
        }
        .num-bottom {
          font-size: 24px;
          color: #999999;
          text-align: center;
          margin-top: 24px;
        }
      }
    }
  }
  .tips-box {
    padding: 36px 28px;
    .t2 {
      color: #999999;
      margin-top: 8px;
    }
  }
}
.downs-box {
  background-color: #fff;
  position: relative;
  z-index: 2;
  max-height: 90%;
  overflow-y: auto;
  .desc {
    font-size: 36px;
    color: #0b0909;
    text-align: left;
    padding-left: 34px;
  }
}
.betting-box {
  .height {
    height: 98px;
  }
  .fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
  .fixed-btm {
    height: 98px;
  }
  .fixed-up {
    background-color: #000;
    height: 90px;
    padding: 0 38px;
  }
  .total-all {
    text-align: left;
    padding-left: 38px;
    justify-content: flex-start !important;
  }
  .left {
    text-align: center;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .del-icon {
      background: url("@/assets/img/Welfare3D/del.png") no-repeat;
      background-size: 100% auto;
      width: 44px;
      height: 44px;
    }
    .text {
      font-size: 22px;
      color: #cccccc;
      margin-top: 2px;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 10px;
      width: 1px;
      height: 60px;
      background: #e5e5e5;
    }
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    .t2 {
      color: #bf2935;
      margin-left: 16px;
    }
  }
  .right {
    width: 180px;
    line-height: 98px;
    background: #bf2935;
    color: #fff;
    font-size: 32px;
    text-align: center;
  }
}
.header-desc {
  background-color: #202521;
}
.header-desc {
  color: #ccc;
  padding: 0 28px 28px;
}
.chose-ball {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(#bf2935 0%, #f72f3f 100%);
}
.chose-ball-list {
  justify-content: flex-end;
}
.timeData {
  line-height: 1;
  & > span {
    margin-right: 16px;
  }
  .colon {
    padding-bottom: 12px;
  }
  .block {
    min-width: 42px;
    height: 42px;
    background: #000000;
    border-radius: 6px 6px 6px 6px;
  }
}
.bets-desc {
  .clear-list {
    width: 296px;
    height: 78px;
    background: linear-gradient(180deg, #999999 0%, #4d4d4d 100%);
    border-radius: 16px 16px 16px 16px;
  }
  .add-list {
    width: 374px;
    height: 78px;
    background: linear-gradient(180deg, #00b6c3 0%, #006d76 100%);
    border-radius: 16px 16px 16px 16px;
  }
}
.orders-list {
  padding: 0 28px;
  margin-top: 44px;
  .orders-cont {
    min-height: 208px;
    background: #ececec;
  }
  & > li:first-child {
    color: #0d0d0d;
    position: relative;
    height: 20px;
    padding-left: 20px;
    height: 44px;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10px;
      height: 44px;
      background: #e50012;
      border-radius: 0px 0px 0px 0px;
    }
  }
  .orders-item {
    overflow-x: auto;
    & > span:first-child {
      //width: 200px;
    }
  }
}
.bets-way {
  padding: 0 28px;
  & > li {
    height: 96px;
    border-bottom: 1px solid #ececec;
  }
}
.together {
  position: fixed;
  right: 32px;
  bottom: 220px;
  .group-btn {
    width: 100px;
    height: 100px;
  }
  .room-enter {
    li:first-child {
      width: 100px;
      height: 100px;
    }
    li:last-child {
      width: 40px;
      height: 40px;
    }
  }
}
.c-page {
  padding-bottom: 460px;
}
.title-desc {
  padding-left: 16px;
  padding-right: 8px;
  min-width: 214px;
  height: 52px;
  line-height: 1;
  border-radius: 12px 12px 12px 12px;
  border: 2px solid #ffffff;
  .downd {
    width: 32px;
    height: 32px;
  }
}
</style>
