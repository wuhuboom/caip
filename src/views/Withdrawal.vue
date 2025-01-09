<template>
  <div class="c-page bg-grey">
    <AppTopBar class="app-top-bar" topBarTitle="提现">
      <template v-slot:right>
        <div class="right-box">提现记录</div>
      </template>
    </AppTopBar>

    <!-- 提现 未绑定 -->
    <template v-if="0">
      <div class="ye-box">
        可提现余额
        <div class="on">1000.00元</div>
      </div>
      <div class="bd-box">
        <div class="lists">
          <div class="left">
            <van-icon name="plus" class="plus-icon" />
            <div class="name">绑定银行卡</div>
          </div>
          <div class="right">
            <van-icon name="arrow" class="arrow-icon" />
          </div>
        </div>
        <div class="lists">
          <div class="left">
            <van-icon name="plus" class="plus-icon" />
            <div class="name">绑定微信</div>
          </div>
          <div class="right">
            <van-icon name="arrow" class="arrow-icon" />
          </div>
        </div>
        <div class="lists">
          <div class="left">
            <van-icon name="plus" class="plus-icon" />
            <div class="name">绑定支付宝</div>
          </div>
          <div class="right">
            <van-icon name="arrow" class="arrow-icon" />
          </div>
        </div>
      </div>
    </template>

    <!-- 提现 已绑定 -->
    <template>
      <div class="yh-box">
        <div class="khm-box">开户名：宋**</div>
        <div class="gh-box">
          <div class="left">
            <div class="yuan"></div>
            <div class="info">
              <div class="i-1">工商银行</div>
              <div class="i-2">**** **** **** 3316</div>
            </div>
          </div>
          <div class="right">
            <van-icon name="arrow" class="arrow-icon" />
          </div>
        </div>
      </div>
      <div class="tx-box">
        <div class="item">
          可提现余额
          <div class="on">1000.00元</div>
        </div>
        <div class="item">
          提现金额
          <input
            type="text"
            class="input"
            placeholder="请输入提款金额，最少10元"
          />
        </div>
      </div>
      <div class="btn-box center-center">确定</div>
      <div class="ts-box">
        <div class="content-box">
          <div class="tips">
            <van-icon name="info" class="tips-icon" />
            温馨提示
          </div>
          <div class="li">
            1.确保填写的收款账户信息（如银行账户、支付平台账号）准确无误，以免影响资金到账
          </div>
          <div class="li">
            2.提款一般会在30分钟之内到账,若有延迟请联系在线客服查询.
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "AppWithdrawal",
  data() {
    return {};
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
.ye-box {
  padding: 30px 28px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  .on {
    margin-left: 20px;
    color: #bf2935;
  }
}
.bd-box {
  margin-top: 20px;
  background: #fff;
  .lists {
    border-bottom: 1px solid #f9f9f9;
    padding: 28px 22px;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      color: #666666;
      .plus-icon {
        margin-right: 8px;
        font-size: 40px;
        color: #666666;
      }
    }
    .right {
      .arrow-icon {
        font-size: 40px;
        color: #ccc;
      }
    }
  }
}
.yh-box {
  background: #fff;
  .khm-box {
    padding: 28px 28px;
    border-bottom: 1px solid #e5e5e5;
  }
  .gh-box {
    padding: 24px 28px;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .yuan {
        width: 48px;
        height: 48px;
        background: #e50012;
        border-radius: 100%;
      }
      .info {
        margin-left: 16px;
        .i-2 {
          font-size: 24px;
          color: #999999;
        }
      }
    }
    .right {
      .arrow-icon {
        font-size: 36px;
        color: #ccc;
      }
    }
  }
}
.tx-box {
  margin-top: 20px;
  background: #fff;
  .item {
    padding: 30px 28px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
    .on {
      color: #bf2935;
      margin-left: 20px;
    }
    .input {
      margin-left: 20px;
      border: none;
      outline: none;
    }
  }
}
.btn-box {
  width: 694px;
  height: 88px;
  background: #bf2935;
  border-radius: 126px 126px 126px 126px;
  color: #fff;
  font-size: 32px;
  margin: 0 auto;
  margin-top: 56px;
}
.ts-box {
  padding: 32px 28px;
  margin-top: 40px;
  .content-box {
    background: #f3f3f3;
    border-radius: 10px 10px 10px 10px;
    padding: 16px 28px;
    font-size: 22px;
    color: #999999;
    .tips {
      display: flex;
      color: #c82834;
      align-items: center;
      margin-bottom: 12px;
      .tips-icon {
        margin-right: 12px;
        color: #c82834;
        font-size: 36px;
      }
    }
    .li {
      margin-top: 2px;
    }
  }
}
</style>
