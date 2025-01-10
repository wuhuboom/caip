<template>
  <div class="c-page bg-grey">
    <!-- 顶栏 -->
    <AppTopBar class="app-top-bar" :titleSolt="true">
      <template v-slot:title>
        <div @click="showSelect = !showSelect">
          直选
          <van-icon name="arrow-down" color="#fff" />
        </div>
        <div class="center-box" v-if="showSelect">
          <div class="bg" @click="showSelect = false"></div>
          <div class="center-box">
            <div class="select-box">
              <div
                class="select"
                v-for="(item, index) in firstNavs"
                :key="index"
                @click="curTab = item"
                :class="{ on: curTab === item }"
              >
                {{ item }}
              </div>
            </div>
            <div v-for="(item, index) in secondNavs" :key="index">
              <p class="desc">{{ `${item.tip1}${item.tip2}` }}</p>
              <div class="select-box">
                <div
                  class="select"
                  v-for="(v, i) in item.list"
                  :key="i"
                  @click="curTab = item"
                  :class="{ on: value === v.txt }"
                >
                  {{ v.txt }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:right>
        <div class="right-box center-center">
          <van-icon
            name="ellipsis"
            color="#fff"
            @click="showMore = !showMore"
          />
          <div class="more-pop" v-if="showMore">
            <van-icon name="play" color="#fff" class="top-icon" />
            <div class="js-icon"></div>
            <div class="text">玩法介绍</div>
          </div>
        </div>
      </template>
    </AppTopBar>

    <div class="before-lottery" v-if="showBeforeLottery">
      <div class="lists" v-for="i in 10" :key="i">
        <div class="left text-ellipsis">第2017093期</div>
        <div class="right text-ellipsis">
          <div class="num-box">
            <div class="num">1</div>
            <div class="num">7</div>
            <div class="num">3</div>
          </div>
          <div class="time">2024-11-12 21:15</div>
        </div>
      </div>
    </div>

    <div class="periods-box">
      <div class="left text-ellipsis">第2017093期</div>
      <div
        class="right text-ellipsis"
        @click="showBeforeLottery = !showBeforeLottery"
      >
        <div class="time text-ellipsis">08-23 08:25截止</div>
        <van-icon name="arrow-down" color="#999" class="icon" />
      </div>
    </div>

    <div class="main-wrap">
      <div class="des-box">
        <div class="left">每位至少选择1个号码</div>
        <div class="right" @click="$tool.goPage('/chat')">
          <div class="lt-icon"></div>
          进入聊天室
        </div>
      </div>
      <div class="xuan-box">
        <div class="xuan-list" v-for="o in 3" :key="o">
          <div class="left">
            <div class="item small">
              <div class="num-top on">百位</div>
              <div class="num-bottom">遗漏</div>
            </div>
          </div>
          <div class="right">
            <div class="item" v-for="i in 10" :key="i">
              <div
                class="num-top"
                :class="{
                  on: i === 1,
                }"
              >
                {{ i }}
              </div>
              <div class="num-bottom">4</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tips-box">
        <div class="t1">玩法提示：</div>
        <div class="t2">猜中开奖号码前3个数字(且顺序一致) , 即中奖1040元</div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="betting-box">
      <div class="height"></div>
      <div class="fixed">
        <div class="left">
          <div class="del-icon"></div>
          <div class="text">删除</div>
        </div>
        <div class="center">
          <div class="t1">1注</div>
          <div class="t2">共2元</div>
        </div>
        <div class="right">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import typeConfigList from "@/plugins/typeConfigList";
export default {
  name: "Welfare3D",
  data() {
    return {
      linkQuery: this.$route.query,
      showMore: false,
      showSelect: false,
      showBeforeLottery: false,
      curTab: +this.$route.query.type === 1 ? "三星" : "四星",
      value: +this.$route.query.type === 1 ? "三星直选复式" : "四星直选复式",
    };
  },
  computed: {
    tabs() {
      if (+this.linkQuery.type === 1) {
        return {
          lotteryType1: typeConfigList["lotteryType1"],
        };
      }
      return {
        lotteryType0: typeConfigList["lotteryType0"],
        lotteryType2: typeConfigList["lotteryType2"],
        lotteryType3: typeConfigList["lotteryType3"],
        lotteryType4: typeConfigList["lotteryType4"],
      };
    },
    firstNavs() {
      let arr = [];
      for (let key in this.tabs) {
        this.tabs[key].forEach((item) => {
          if (!arr.includes(item.tip1)) {
            arr.push(item.tip1);
          }
        });
      }
      return arr;
    },
    secondNavs() {
      let arr = [];
      for (let key in this.tabs) {
        this.tabs[key].forEach((item) => {
          if (item.tip1 == this.curTab) {
            arr = this.tabs[key];
          }
        });
      }
      return arr;
    },
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
      white-space: nowrap;
      align-items: center;
      padding: 24px 24px;
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
    width: 150px;
    text-align: center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: end;
    .num-box {
      margin-right: 80px;
      color: #bf2935;
      font-size: 36px;
      font-weight: 600;
      display: flex;
      .num {
        width: 50px;
        text-align: center;
      }
    }
    .time {
      width: 200px;
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
      margin-right: 36px;
      max-width: 300px;
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
      color: #999999;
    }
    .right {
      height: 60px;
      border-radius: 60px;
      border: 1px solid #fc302b;
      line-height: 60px;
      padding: 0 20px;
      color: #fc302b;
      font-size: 24px;
      display: flex;
      align-items: center;
      .lt-icon {
        width: 32px;
        height: 32px;
        background: url("@/assets/img/Welfare3D/lt.png") no-repeat;
        background-size: 100% auto;
        margin-right: 10px;
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
            width: 90px;
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
.center-box {
  background-color: #fff;
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
    display: flex;
    height: 98px;
    align-items: center;
    background: #fff;
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
</style>
