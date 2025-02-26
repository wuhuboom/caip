<template>
  <div class="index-page c-page bg-grey">
    <AppTopBar ref="topBar" topBarTitle="永旺彩票" :showLeft="false">
      <template #right>
        <p class="center-center colorfff serve m-r-24" @click="serve">
          <img class="d-img" src="@/assets/img/card.png" alt="" />
          人工充值
        </p>
      </template>
    </AppTopBar>
    <div class="top-header">
      <van-swipe class="swipe-box" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(p, i) in slider" :key="i">
          <p
            @click="goDetail(p)"
            class="item"
            :style="{ backgroundImage: `url(${p.imageUrl})` }"
          ></p>
        </van-swipe-item>
      </van-swipe>
    </div>
    <NoticeBar
      class="notice-bar"
      background="#FFE5E5"
      color="#333333"
      :left-icon="labaImg"
      @click="$router.push('/notice')"
    >
      {{ noticeDoc.content }}
    </NoticeBar>
    <div class="nav-wrap">
      <div class="my-cats m-t-28" v-for="(p, i) in cat" :key="i">
        <p class="font16 align-center m-b-24">{{ p.lotteryName }}</p>
        <ul class="hall flex-wrap">
          <li
            class="m-b-24"
            v-for="(item, idx) in p.list"
            :key="idx"
            @click="
              $router.push({
                path: `/game/hall`,
                query: {
                  id: item.id,
                  type: item.lotteryType,
                },
              })
            "
          >
            <ul class="conts align-center">
              <li>
                <img
                  class="d-img icons"
                  :src="`${item.icoUrls || nav5Icon}`"
                  alt=""
                />
              </li>
              <li class="art font12">
                <p class="lotteryNameH5 font14">{{ item.lotteryNameH5 }}</p>
                <p>{{ `全天${item.totalExpect}期` }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="ranking-box">
      <div class="title text-ellipsis">最新排行</div>
      <div class="lists-box">
        <div class="lists" v-for="(v, i) in wins" :key="i">
          <div class="left text-ellipsis">
            <div class="name text-ellipsis">
              <div class="icon"></div>
              <div class="text-ellipsis">{{ v.playerName }}</div>
            </div>
            <!-- <div class="des text-ellipsis">购买福彩3D</div> -->
          </div>
          <div class="right text-ellipsis">
            喜中<span class="num">{{ divide(v.money) }}</span
            >元
          </div>
        </div>
      </div>
    </div>

    <!-- 活动弹窗 -->
    <div class="activity-pop" v-if="0">
      <div class="bg"></div>
      <div class="pop-wrap">
        <div class="title">新用户首充专享</div>
        <div class="item-box">
          <div class="item" v-for="i in 4" :key="i">
            <div class="left center-center">
              <div class="t1">￥</div>
              <div class="t2">2</div>
            </div>
            <div class="right text-ellipsis">
              <div class="t1 text-ellipsis">新人免费彩金</div>
              <div class="t2 text-ellipsis">有效期7天</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发现新版本 -->
    <div class="version-box" v-if="fromModal2">
      <div class="bg"></div>
      <div class="version-wrap">
        <div class="top-icon"></div>
        <!-- 立即更新 -->
        <div class="wrap-box" v-if="!progressBarState">
          <div class="text">发现新版本</div>
          <div class="btn center-center" @click="simulateProgressBar">
            立即更新
          </div>
        </div>
        <!-- 更新中 -->
        <div class="wrap-box" v-else>
          <div class="text">
            更新中 <span class="num">{{ this.progressBar }}%</span>
          </div>
          <div class="dex center-center">正在更新中,请勿关闭当前页面…</div>
        </div>
      </div>
    </div>
    <img
      class="d-img serve"
      src="@/assets/img/serve.png"
      alt=""
      @click="$store.dispatch('getServeData', 1)"
    />
    <AppBtmBar></AppBtmBar>
  </div>
</template>

<script>
import userApi from "@/api/user";
import { NoticeBar } from "vant";
import labaImg from "@/assets/img/Index/laba.png";
import nav5Icon from "@/assets/img/Index/nav5.png";
import auth from "@/plugins/auth";
export default {
  name: "AppHome",
  data() {
    return {
      nav5Icon,
      labaImg,
      wins: [],
      slider: [],
      version: "",
      progressBarState: false,
      fromModal2: false,
      progressBar: 0,
      key: "storageVersion",
      noticeDoc: {
        content: "",
      },
    };
  },
  components: {
    NoticeBar,
  },
  computed: {
    slideCatList() {
      return this.catList;
    },
    catList() {
      const arr = [];
      this.$store.state.cat.forEach((item) => {
        arr.push(...item.list);
      });
      return arr;
    },
    itemDoc() {
      return this.$store.getters.noticeDoc;
    },
    cat() {
      return this.$store.state.cat;
    },
  },
  methods: {
    async homeDialog() {
      const [err, res] = await userApi.homeDialog();
      if (err) return;
      if (!res.data?.length) return;
      this.noticeDoc = res.data[0];
    },
    simulateProgressBar() {
      this.progressBarState = true;
      var duration = Math.floor(Math.random() * 6) + 5; // 生成5到10之间的随机秒数
      var increment = 100 / (duration * 10); // 计算每100毫秒增加的进度

      var progress = 0;

      this.interval = setInterval(() => {
        progress += increment;
        this.progressBar = parseInt(progress);
        if (progress >= 100) {
          console.log("done");
          auth.setToken(this.version, this.key);
          location.reload();
          clearInterval(this.interval);
        }
      }, 100);
    },
    goDetail() {
      //p.policyType 1 余额宝 11 会员管理
      //this.$router.push(`/game/hall?id=${p.lotteryId}`);
    },
    async sliderSlide() {
      const [err, res] = await userApi.homeswiper();
      if (err) return;
      this.slider = res.data;
    },
    async homeWinning() {
      const [err, res] = await userApi.homeWinning();
      if (err) return;
      this.wins = res.data;
    },
    isNumber(val) {
      return typeof val === "number" && !isNaN(val);
    },
    async getVersion() {
      const [err] = await userApi.versionReq();
      if (!this.isNumber(+err)) {
        return;
      }
      const res = +err;
      let storageVersion = auth.getToken(this.key);
      if (storageVersion && storageVersion != res) {
        this.fromModal2 = true;
        this.version = res;
      } else {
        auth.setToken(res, this.key);
      }
    },
    dilogHome() {
      this.$dialog
        .alert({
          title: this.itemDoc.title,
          message: this.itemDoc.content,
          theme: "round-button",
        })
        .then(() => {
          // on close
        });
    },
    async showDliog() {
      await this.$store.dispatch("getNotice");
      const dialogs = auth.getToken("dialogs")
        ? JSON.parse(auth.getToken("dialogs"))
        : [];
      if (!dialogs.includes(this.itemDoc.id) && this.itemDoc.id) {
        this.dilogHome();
        dialogs.push(this.itemDoc.id);
        //dialogs 取最后10个
        if (dialogs.length > 10) {
          dialogs.shift();
        }
        console.log(dialogs, this.itemDoc.id);
        auth.setToken(JSON.stringify(dialogs), "dialogs");
      }
    },
  },
  created() {
    this.homeDialog();

    this.showDliog();
    this.$store.dispatch("playerLotteryList");
    this.homeWinning();
    this.sliderSlide();
    this.getVersion();
  },
};
</script>
<style scoped lang="less">
.index-page {
  width: 100%;
  overflow-x: hidden;
  position: relative;
}
.top-bg {
  position: absolute;
  left: -10%;
  top: 0;
  width: 120%;
  height: 310px;
  background: linear-gradient(126deg, #bf2935 0%, #bf2935 100%);
  border-radius: 0 0 20% 20%;
}
.swipe-box {
  width: 694px;
  margin: 0 auto 0;
  border-radius: 16px;
  overflow: hidden;

  .item {
    display: block;
    width: 694px;
    height: 272px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
}
.nav-wrap {
  border-radius: 12px 12px 12px 12px;
  margin: 24px 24px 0;
  overflow: hidden;
  .notice-bar {
    .num {
      color: #e63939;
    }
  }
  .nav-box {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 34px;
    .item {
      text-align: center;
      width: 25%;
      margin-top: 24px;
      .icon {
        width: 100px;
        height: 100px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        margin: 0 auto;
        &.icon-1 {
          background-image: url("@/assets/img/Index/nav1.png");
        }
        &.icon-2 {
          background-image: url("@/assets/img/Index/nav2.png");
        }
        &.icon-3 {
          background-image: url("@/assets/img/Index/nav3.png");
        }
        &.icon-4 {
          background-image: url("@/assets/img/Index/nav4.png");
        }
        &.icon-5 {
          background-image: url("@/assets/img/Index/nav5.png");
        }
        &.icon-6 {
          background-image: url("@/assets/img/Index/nav6.png");
        }
        &.icon-7 {
          background-image: url("@/assets/img/Index/nav7.png");
        }
        &.icon-8 {
          background-image: url("@/assets/img/Index/nav8.png");
        }
      }
      .name {
        font-size: 20px;
        margin-top: 10px;
      }
    }
  }
}
.ranking-box {
  box-shadow: 0px 4 8px 2px rgba(157, 157, 157, 0.4);
  background: #ffffff;
  border-radius: 12px 12px 12px 12px;
  margin: 38px 24px;
  background-image: url("@/assets/img/Index/jb.png");
  background-size: 456px 538px;
  background-repeat: no-repeat;
  background-position: top right;

  .title {
    height: 82px;
    line-height: 82px;
    padding: 0 28px;
    font-size: 32px;
    font-weight: 600;
  }
  .lists-box {
    .lists {
      padding: 16px 28px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      font-size: 24px;
      .left {
        flex: 1;
        margin-right: 30px;
        .name {
          display: flex;
          align-items: center;
          max-width: 400px;
        }
        .icon {
          width: 44px;
          height: 44px;
          background: url("@/assets/img/Index/jiang.png") no-repeat;
          background-size: 100% auto;
          margin-right: 4px;
        }
        .des {
          margin-top: 12px;
        }
      }
      .right {
        text-align: right;
        max-width: 300px;
        .num {
          color: #bf2935;
        }
      }
    }
  }
}
.activity-pop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .pop-wrap {
    position: relative;
    width: 526px;
    height: 800px;
    background: url("@/assets/img/Index/hongbao.png") no-repeat;
    background-size: 100% auto;
    padding-top: 240px;
    .title {
      color: #ffd01d;
      font-size: 28px;
      text-align: center;
    }
    .item-box {
      width: 454px;
      margin: 20px auto 0;
      max-height: 6.2rem;
      overflow-y: auto;
      .item {
        height: 98px;
        width: 454px;
        background: url("@/assets/img/Index/hbkuai.png") no-repeat;
        background-size: 100% auto;
        margin-bottom: 12px;
        display: flex;
        .left {
          width: 130px;
          color: #bf2935;
          font-size: 32px;
          .t2 {
            font-size: 48px;
            font-size: 600;
          }
        }
        .right {
          flex: 1;
          padding: 0 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .t1 {
            font-weight: 600;
          }
          .t2 {
            color: #999999;
            font-size: 24px;
          }
        }
      }
    }
  }
}
.version-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .version-wrap {
    position: relative;
    border-radius: 6px 6px 6px 6px;
    background: #ffffff;
    width: 560px;
    height: 376px;
    .top-icon {
      position: absolute;
      width: 240px;
      height: 240px;
      left: 154px;
      top: -90px;
      background: url("@/assets/img/Index/hb.png") no-repeat;
      background-size: 100% auto;
    }
    .wrap-box {
      padding-top: 170px;
      .text {
        font-size: 32px;
        font-weight: 600;
        text-align: center;
        height: 100px;
        .num {
          color: #bf2834;
        }
      }
      .btn {
        border-top: 1px solid #e5e5e5;
        height: 98px;
        color: #bf2935;
        font-weight: 600;
        font-size: 32px;
      }
      .dex {
        color: #999999;
        font-size: 24px;
        margin-top: 10px;
      }
    }
  }
}
.my-cats {
  & > p {
    position: relative;
    padding-left: 12px;
    height: 40px;
    line-height: 1;
    &::after {
      content: "";
      display: block;
      width: 8px;
      height: 40px;
      background: #bf2834;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .hall {
    .conts {
      padding: 16px 0 16px 26px;
      background: #ffffff;
      box-shadow: 0px 2px 8px 2px rgba(157, 157, 157, 0.4);
      border-radius: 12px 12px 12px 12px;
    }
    .art {
      margin-left: 34px;
      color: #919191;
      .lotteryNameH5 {
        color: #000;
      }
    }
    .icons {
      width: 96px;
      height: 96px;
      border-radius: 50%;
    }
    & > li {
      width: 50%;
    }
    & > li:nth-child(odd) {
      padding-right: 7px;
    }
    & > li:nth-child(even) {
      padding-left: 7px;
    }
  }
}
.serve {
  position: fixed;
  right: 0;
  bottom: 140px;
  z-index: 100;
  width: 100px;
  height: 100px;
  width: 160px;
  height: 160px;
}
.index-page {
  padding-bottom: 120px + 30px;
}
.top-header {
  .lo1 {
    margin: 28px 0;
    width: 252px;
    height: 74px;
  }
}
</style>
