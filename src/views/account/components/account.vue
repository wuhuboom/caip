<template>
  <div class="account-center-right">
    <div class="my-account-main">
      <div class="my-account-welcome-container">
        <div class="my-account-welcome" style="margin-left: 10px">
          您好，尊敬的用户：
          <span class="my-account-span">雨辰0905</span>，您当前的总余额如下：
        </div>
        <div class="my-account-buttons">
          <div class="my-account-button">充值申请</div>
          <div
            class="my-account-button"
            style="margin-left: 10px; margin-right: 10px"
          >
            提现申请
          </div>
          <div class="my-account-button" style="margin-right: 15px">
            修改密码
          </div>
        </div>
      </div>
      <div class="account-detail-amount-container">
        <div class="account-detail-amount-red">
          <div class="account-detail-amount">
            <img
              src="/static/accountCenter/money.png"
              class="account-detail-image"
            />
          </div>
          <div class="account-detail-bar">
            <span style="margin-left: 10px">可以提现：0元</span>
          </div>
          <div
            class="account-detail-amount"
            style="background: rgb(0, 150, 255)"
          >
            <img
              src="/static/accountCenter/money.png"
              class="account-detail-image"
            />
          </div>
          <div class="account-detail-bar" style="background: rgb(0, 150, 255)">
            <span style="margin-left: 10px">可以使用：0.51元</span>
          </div>
          <div
            class="account-detail-amount"
            style="background: rgb(133, 156, 156)"
          >
            <img
              src="/static/accountCenter/money.png"
              class="account-detail-image"
            />
          </div>
          <div
            class="account-detail-bar"
            style="background: rgb(133, 156, 156); border-radius: 10px"
          >
            <span style="margin-left: 10px">待消费：0元</span>
          </div>
          <div class="account-detail-amount-bg"></div>
          <div
            class="account-detail-amount-bg"
            style="background: rgb(0, 150, 255); left: 280px"
          ></div>
          <div
            class="account-detail-amount-bg"
            style="background: rgb(133, 156, 156); left: 540px; width: 20px"
          ></div>
        </div>
      </div>
      <div class="my-account-person-main">
        <div class="my-account-person">个人资料</div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="50">头像</th>
              <th height="50">用户名</th>
              <th height="50">昵称</th>
              <th height="50">手机号</th>
              <th height="50">QQ</th>
              <th height="50">邮箱</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="50">
                <div class="photo-picker-main">
                  <span class="el-avatar el-avatar--circle"
                    ><img
                      src="https://res.cursf07img.top/DefaultAvatar.jpg"
                      style="object-fit: cover"
                  /></span>
                  <input
                    type="file"
                    accept="image/*"
                    hidden="hidden"
                    class="photo-picker-input"
                  />
                </div>
              </td>
              <td height="50">cy20240905</td>
              <td height="50">雨辰0905</td>
              <td height="50">17205110461</td>
              <td height="50">3075562187</td>
              <td height="50"></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="my-account-person-main" style="margin-top: 20px">
        <div class="my-account-person">消费统计</div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="50">今日消费金额</th>
              <th height="50">今日中奖金额</th>
              <th height="50">今日平台赠送</th>
              <th height="50">本周中奖金额</th>
              <th height="50">本周平台赠送</th>
              <th height="50">本月中奖金额</th>
              <th height="50">本月平台赠送</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="50">0元</td>
              <td height="50">0元</td>
              <td height="50">0元</td>
              <td height="50">0元</td>
              <td height="50">0元</td>
              <td height="50">0元</td>
              <td height="50">0元</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="my-account-person-main" style="margin-top: 20px">
        <div class="my-account-bank">
          <div>我的银行卡</div>
          <!---->
        </div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="50">卡号</th>
              <th height="50">开户行</th>
              <th height="50">持卡人</th>
              <th height="50">身份证</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="50" width="20%">6222600210015262069</td>
              <td height="50" width="20%">交通银行</td>
              <td height="50" width="20%">李岩</td>
              <td height="50" width="20%">3*****************</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="my-account-person-main" style="margin-top: 20px">
        <div class="my-account-bank">
          <div>我的U钱包</div>
          <div style="display: flex">
            <div
              class="cp-button-main my-account-button"
              style="font-size: 14px; width: auto"
            >
              <!---->
              USDT提现教程
            </div>
            <div
              class="cp-button-main my-account-button"
              style="font-size: 14px; width: auto; margin-left: 10px"
            >
              <!---->
              绑定USDT钱包地址
            </div>
          </div>
        </div>
        <div>
          <table rules="all" class="my-account-person-table">
            <tr class="my-account-table-header">
              <th height="40">钱包地址</th>
            </tr>
            <tr align="center" class="my-account-table-body">
              <td height="40" width="20%">请先绑定钱包地址</td>
            </tr>
          </table>
        </div>
      </div>
      <div style="z-index: 999; display: none">
        <div class="cp-popup-mask"></div>
        <div class="cp-popup-main">
          <div class="cp-popup-title">
            <div class="cp-popup-title-content">
              <div style="color: rgb(255, 236, 124)">充值</div>
              <i class="el-icon-close" style="cursor: pointer"></i>
            </div>
          </div>
          <div class="cp-popup-body">
            <div class="cp-popup-body-content">
              <div class="charts-tabs">
                <div class="charts-tab-item charts-tab-item-active">
                  在线充值
                </div>
              </div>
              <div>
                <div>
                  <div class="empty-info">正在维护中，请稍后尝试！</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountCenter",
};
</script>
<style scoped lang="scss"></style>
