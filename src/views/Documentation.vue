<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="跟单">
      <template v-slot:right>
        <div class="right-box" @click="$tool.goPage('/buy-together')">
          发起合买
        </div>
      </template>
    </AppTopBar>
    <div class="nav-box">
      <div class="nav center-center" @click="$tool.goPage('/honor-roll')">
        <div class="img img-1"></div>
        <div class="name">连红榜</div>
      </div>
      <div class="nav center-center" @click="$tool.goPage('/honor-roll')">
        <div class="img img-2"></div>
        <div class="name">大神榜</div>
      </div>
      <div class="nav center-center" @click="$tool.goPage('/my-follow')">
        <div class="img img-3"></div>
        <div class="name">我的关注</div>
      </div>
      <div class="nav center-center" @click="$tool.goPage('/my-buy')">
        <div class="img img-4"></div>
        <div class="name">我的合买</div>
      </div>
    </div>
    <div class="dashen-box">
      <div class="title-box">
        <div class="left">
          <div class="icon"></div>
          <div class="name">大神推荐</div>
        </div>
        <div class="right">
          <van-icon name="search" class="icon" />
        </div>
      </div>
      <div class="lists-box">
        <div class="lists center-center" v-for="i in 4" :key="i">
          <img src="" class="img" />
          <div class="name">霍俊志</div>
        </div>
      </div>
    </div>
    <div class="hot-box">
      <div class="hot-title"></div>
      <div class="tab-box">
        <div class="tab on center-center">
          <div class="name center-center">排列三</div>
        </div>
        <div class="tab center-center">
          <div class="name center-center">福彩3D</div>
        </div>
        <div class="tab center-center">
          <div class="name center-center">彩票名称</div>
        </div>
      </div>
      <div class="lists-box">
        <div class="lists" v-for="i in 10" :key="i">
          <div class="top">
            <div class="left">
              <div class="info">
                <img src="" class="img" />
                <div class="t-box">
                  <div class="name">张三</div>
                  <div class="tag-box">
                    <div class="tag">6连胜</div>
                  </div>
                </div>
              </div>
              <div class="x-1">选号: <span class="num">1,3,4,5,6,7</span></div>
              <div class="x-2">组三复式 30注 60元</div>
            </div>
            <div class="right center-center">
              <div class="jd-box">
                <MyCircle
                  v-model="currentRate"
                  :rate="30"
                  :speed="100"
                  :text="`70%`"
                  layer-color="#f9f9f9"
                  color="#FF8848"
                  :stroke-width="80"
                />
              </div>
              <div class="time-box">
                距截止:
                <van-count-down class="on" :time="9999999" format="HH时mm分" />
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="b-1">
              <div class="item center-center">
                <div class="num-box"><span class="num">80</span>元</div>
                <div class="text">总金额</div>
              </div>
              <div class="item center-center">
                <div class="num-box"><span class="num">1</span>元</div>
                <div class="text">每份</div>
              </div>
              <div class="item center-center">
                <div class="num-box"><span class="num">59</span>元</div>
                <div class="text">剩余份额</div>
              </div>
            </div>
            <div class="b-2" @click="$tool.goPage('/buy-together')">跟一单</div>
          </div>
        </div>
      </div>
    </div>
    <AppBtmBar></AppBtmBar>
  </div>
</template>

<script>
import { Circle as MyCircle } from "vant";
export default {
  name: "AppDocumentation",
  components: {
    MyCircle,
  },
  data() {
    return {
      currentRate: 0,
    };
  },
};
</script>
<style scoped lang="less">
.app-top-bar {
  .right-box {
    color: #fff;
    margin-right: 40px;
    font-size: 26px;
  }
}
.nav-box {
  display: flex;
  background: #fff;
  padding: 40px 0;
  .nav {
    flex: 1;
    flex-direction: column;
    .img {
      width: 98px;
      height: 98px;
      background-repeat: no-repeat;
      background-size: 100% auto;
      &.img-1 {
        background-image: url("@/assets/img/Documentation/i-1.png");
      }
      &.img-2 {
        background-image: url("@/assets/img/Documentation/i-4.png");
      }
      &.img-3 {
        background-image: url("@/assets/img/Documentation/i-2.png");
      }
      &.img-4 {
        background-image: url("@/assets/img/Documentation/i-3.png");
      }
    }
    .name {
      font-size: 24px;
      margin-top: 16px;
      text-align: center;
    }
  }
}
.dashen-box {
  margin-top: 16px;
  background: #fff;
  .title-box {
    height: 98px;
    display: flex;
    align-items: center;
    margin: 0 30px;
    border-bottom: 1px solid #ebebeb;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .icon {
        background-image: url("@/assets/img/Documentation/ld.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        width: 40px;
        height: 40px;
      }
      .name {
        margin-left: 4px;
        font-size: 32px;
      }
    }
    .right {
      .icon {
        color: #777777;
        font-size: 40px;
      }
    }
  }
  .lists-box {
    display: flex;
    padding-top: 38px;
    padding-bottom: 40px;
    .lists {
      flex: 1;
      flex-direction: column;
      .img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
      }
      .name {
        margin-top: 12px;
        font-size: 24px;
      }
    }
  }
}
.hot-box {
  background: #fff;
  margin-top: 16px;
  .hot-title {
    height: 84px;
    width: 100%;
    background-image: url("@/assets/img/Documentation/hot.png");
    background-repeat: no-repeat;
    background-size: 364px 44px;
    background-position: center center;
  }
  .tab-box {
    display: flex;
    background: #f9f9f9;
    .tab {
      flex: 1;
      height: 80px;
      font-size: 26px;
      color: #777777;
      .name {
        height: 80px;
      }
      &.on {
        .name {
          color: #bf2935;
          border-bottom: 4px solid #bf2935;
        }
      }
    }
  }
  .lists-box {
    background: #f5f5f5;
    .lists {
      background: #fff;
      padding: 0 30px;
      padding-bottom: 30px;
      padding-top: 40px;
      margin-bottom: 16px;
      .top {
        display: flex;
        .left {
          flex: 1;
          .info {
            display: flex;
            align-items: center;
            margin-bottom: 38px;
            .img {
              width: 90px;
              height: 90px;
              border-radius: 100%;
              margin-right: 32px;
            }
            .t-box {
              .tag-box {
                display: flex;
                flex-wrap: wrap;
              }
              .tag {
                margin-right: 4px;
                margin-top: 6px;
                border: 1px solid #bf2935;
                border-radius: 4px 4px 4px 4px;
                height: 32px;
                line-height: 30px;
                padding: 0 14px;
                font-size: 20px;
                color: #bf2935;
              }
            }
          }
          .x-1 {
            font-size: 24px;
            color: #000000;
            .num {
              color: #bf2834;
            }
          }
          .x-2 {
            margin-top: 16px;
            font-size: 24px;
            color: #000000;
          }
        }
        .right {
          flex-direction: column;
          .jd-box {
            /deep/ .van-circle {
              width: 150px;
              height: 150px;
            }
            /deep/ .van-circle__text {
              font-size: 28px;
              color: #333333;
            }
          }
          .time-box {
            color: #777777;
            font-size: 24px;
            margin-top: 10px;
            display: flex;
            .on {
              color: #bf2834;
            }
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        padding: 30px 28px;
        background: #f6fafb;
        margin-top: 30px;

        .b-1 {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .item {
            flex-direction: column;
            .text {
              color: #777777;
              font-size: 22px;
              margin-top: 10px;
            }
            .num-box {
              color: #777777;
              font-size: 22px;
              .num {
                color: #333333;
                font-size: 28px;
              }
            }
          }
        }
        .b-2 {
          height: 58px;
          border-radius: 4px 4px 4px 4px;
          background: #bf2935;
          line-height: 58px;
          padding: 0 32px;
          color: #fff;
          margin-left: 62px;
        }
      }
    }
  }
}
</style>
