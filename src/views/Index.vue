<template>
  <div class="index-page c-page bg-grey">
    <div class="top-bg"></div>
    <van-swipe class="swipe-box" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(p, i) in slider" :key="i">
        <p
          @click="goDetail(p)"
          class="item"
          :style="{ backgroundImage: `url(${p.imageUrl})` }"
        ></p>
      </van-swipe-item>
    </van-swipe>

    <div class="nav-wrap">
      <NoticeBar
        class="notice-bar"
        background="#FFFBF5"
        color="#333333"
        :left-icon="labaImg"
        @click="$router.push('/notice')"
      >
        {{ noticeDoc.content }}
      </NoticeBar>
      <div class="nav-box">
        <div
          class="item"
          @click="$router.push(`/game/hall?id=${item.id}`)"
          v-for="(item, idx) in catList"
          :key="idx"
        >
          <div class="icon icon-1" :class="[`icon-${idx + 1}`]"></div>
          <div class="name">{{ item.lotteryNameH5 }}</div>
        </div>
        <div class="item">
          <div class="icon icon-8"></div>
          <div class="name">查看更多</div>
        </div>
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
            <div class="des text-ellipsis">购买福彩3D</div>
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
    <div class="version-box" v-if="0">
      <div class="bg"></div>
      <div class="version-wrap">
        <div class="top-icon"></div>
        <!-- 立即更新 -->
        <div class="wrap-box" v-if="0">
          <div class="text">发现新版本</div>
          <div class="btn center-center">立即更新</div>
        </div>
        <!-- 更新中 -->
        <div class="wrap-box">
          <div class="text">更新中 <span class="num">97%</span></div>
          <div class="dex center-center">正在更新中,请勿关闭当前页面…</div>
        </div>
      </div>
    </div>

    <AppBtmBar></AppBtmBar>
  </div>
</template>

<script>
import userApi from "@/api/user";
import { NoticeBar } from "vant";
import labaImg from "@/assets/img/Index/laba.png";
import { mapGetters } from "vuex";
export default {
  name: "AppHome",
  components: {
    NoticeBar,
  },
  computed: {
    slideCatList() {
      return this.catList.slice(0, 8);
    },
    ...mapGetters(["catList"]),
    noticeDoc() {
      return this.$store.getters.noticeDoc;
    },
  },
  data() {
    return {
      labaImg,
      wins: [],
      slider: [],
    };
  },
  methods: {
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
  },
  created() {
    this.$store.dispatch("playerLotteryList");
    this.homeWinning();
    this.sliderSlide();
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
  width: 702px;
  margin: 40px auto 0;
  border-radius: 20px;
  overflow: hidden;

  .item {
    display: block;
    width: 702px;
    height: 322px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 20px;
  }
}
.nav-wrap {
  border-radius: 12px 12px 12px 12px;
  background: #ffffff;
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
</style>
