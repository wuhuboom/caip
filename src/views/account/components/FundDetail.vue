<template>
  <div class="account-detail-main">
    <div class="my-account-welcome" style="margin-left: 10px">
      您好，尊敬的用户：
      <span class="my-account-span">雨辰0905</span>，您当前的总余额如下：
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
          <span style="margin-left: 10px">可提现：0元</span>
        </div>
        <div class="account-detail-amount" style="background: rgb(0, 150, 255)">
          <img
            src="/static/accountCenter/money.png"
            class="account-detail-image"
          />
        </div>
        <div class="account-detail-bar" style="background: rgb(0, 150, 255)">
          <span style="margin-left: 10px">可使用：0.51元</span>
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
    <div class="recharge-title">
      <div class="cp-date-picker-main recharge-picker">
        <input placeholder="请选择日期" class="cp-date-picker-input" />
        <div class="cp-date-picker-content">
          <section class="wh_container">
            <div class="wh_content_all">
              <div class="wh_top_changge">
                <li>
                  <div class="wh_jiantou1"></div>
                </li>
                <li class="wh_content_li">2024年11月</li>
                <li>
                  <div class="wh_jiantou2"></div>
                </li>
              </div>
              <div class="wh_content-week">
                <div class="wh_content_item">
                  <div class="wh_top_tag">一</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">二</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">三</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">四</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">五</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">六</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">日</div>
                </div>
              </div>
              <div class="wh_content">
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">28</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">29</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">30</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">31</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">1</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">2</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">3</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">4</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">5</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">6</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">7</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">8</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">9</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">10</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">11</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">12</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">13</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">14</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">15</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">16</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">17</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_isToday">18</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">19</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">20</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">21</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">22</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">23</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">24</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">25</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">26</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">27</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">28</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">29</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">30</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">1</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <span style="margin-left: 5px; margin-right: 5px">至</span>
      <div class="cp-date-picker-main recharge-picker">
        <input placeholder="请选择日期" class="cp-date-picker-input" />
        <div class="cp-date-picker-content">
          <section class="wh_container">
            <div class="wh_content_all">
              <div class="wh_top_changge">
                <li>
                  <div class="wh_jiantou1"></div>
                </li>
                <li class="wh_content_li">2024年11月</li>
                <li>
                  <div class="wh_jiantou2"></div>
                </li>
              </div>
              <div class="wh_content-week">
                <div class="wh_content_item">
                  <div class="wh_top_tag">一</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">二</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">三</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">四</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">五</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">六</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_top_tag">日</div>
                </div>
              </div>
              <div class="wh_content">
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">28</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">29</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">30</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">31</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">1</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">2</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">3</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">4</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">5</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">6</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">7</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">8</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">9</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">10</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">11</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">12</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">13</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">14</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">15</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">16</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">17</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_isToday">18</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">19</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">20</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">21</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">22</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">23</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">24</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">25</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">26</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">27</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">28</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">29</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date">30</div>
                </div>
                <div class="wh_content_item">
                  <div class="wh_item_date wh_other_dayhide">1</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div
        class="cp-cascader-main"
        style="width: 80px; height: 26px; margin-left: 10px"
      >
        <div class="cp-cascader-btn">
          <span class="cp-cascader-span">全部</span>
          <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
        </div>
        <div class="cp-cascader-items" style="display: none">
          <div
            class="cp-cascader-columns"
            style="background: rgb(255, 241, 192)"
          >
            <div class="cp-cascader-item cp-cascader-item-active">
              <span class="cp-cascader-item-span">全部</span>
            </div>
            <div class="cp-cascader-item">
              <span class="cp-cascader-item-span">入账</span>
            </div>
            <div class="cp-cascader-item">
              <span class="cp-cascader-item-span">扣款</span>
            </div>
            <div class="cp-cascader-item">
              <span class="cp-cascader-item-span">冻结</span>
            </div>
            <div class="cp-cascader-item">
              <span class="cp-cascader-item-span">解冻</span>
            </div>
          </div>
        </div>
      </div>
      <span style="margin-left: 18px">方案编号：</span>
      <input class="fund-input" />
      <div class="cp-button-main recharge-btn">
        <!---->
        查询
      </div>
    </div>
    <div class="recharge-table-container">
      <table rules="all" align="center" class="recharge-table">
        <tr align="center" class="recharge-table-header">
          <th height="40" width="150">方案编号</th>
          <th height="40" width="90">交易金额</th>
          <th height="40" width="100">交易类型</th>
          <th height="40" width="100">可用余额</th>
          <th height="40" width="155">交易时间</th>
          <th height="40">交易备注</th>
        </tr>
      </table>
      <div class="cp-pagination-main" style="margin-top: 40px">
        <div class="cp-pagination-head">
          <div class="cp-pagination-first">首页</div>
          <div class="cp-pagination-page">上一页</div>
          <div class="cp-pagination-num cp-pagination-num-active">1</div>
        </div>
        <div class="cp-pagination-middle">
          <!---->
          <!---->
        </div>
        <div class="cp-pagination-head">
          <!---->
          <div class="cp-pagination-page">下一页</div>
          <div class="cp-pagination-tail">尾页</div>
        </div>
        <div class="cp-pagination-data">页次：1/0</div>
        <div class="cp-pagination-data">记录：0条</div>
      </div>
      <div class="with-draw-state p-l-8 p-r-8">
        温馨提示： <br />
        1.为提高查询速度，网站只提供最近一个月交易明细查询 <br />
        2.如您遇到其他任何问题，请您联系在线客服进行疑难解答 <br />
        3.如果您添加了预付款，银行账户钱扣了，账户还没有加上，请及时与我们联系，我们将第一时间为您处理
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountCenter",
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss"></style>
