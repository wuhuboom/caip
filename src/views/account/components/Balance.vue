<template>
  <div class="recharge-main">
    <div
      class="custom-record-tabs"
      style="margin-left: 15px; margin-bottom: 15px; margin-right: 15px"
    >
      <div
        class="custom-record-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="tab = item.id"
        :class="{ 'custom-record-tab-active': tab == item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <div v-if="tab == 0">
        <div class="board-list">
          <div class="board shadow2">
            <p>待转出总金额</p>
            <p>￥0</p>
          </div>
          <div class="board shadow3">
            <p>待领取总返利</p>
            <p>￥0</p>
          </div>
          <div class="board shadow1">
            <p>已领取总返利</p>
            <p>￥0</p>
          </div>
        </div>
        <div style="padding: 0px 10px">
          <ul class="info-save">
            <li>
              <p>利率</p>
              <p
                style="
                  color: rgb(255, 255, 255);
                  font-weight: 700;
                  font-size: 16px;
                "
              >
                10%
              </p>
            </li>
            <li>
              <p>最低转入金额</p>
              <p
                style="
                  font-weight: 700;
                  color: rgb(255, 255, 255);
                  font-size: 16px;
                "
              >
                ￥100
              </p>
            </li>
            <li>
              <p>当前最多转入金额</p>
              <p
                style="
                  font-weight: 700;
                  color: rgb(255, 255, 255);
                  font-size: 16px;
                "
              >
                ￥0.5143
              </p>
            </li>
            <li>
              <p>
                <input
                  placeholder="请输入转入金额"
                  type="text"
                  class="input-account"
                /><span style="padding-left: 6px">元</span>
              </p>
              <div
                class="recharge-btn"
                style="cursor: pointer; width: 80px; background-size: 100% 100%"
              >
                转入
              </div>
              <div
                class="recharge-btn btn-search"
                style="
                  cursor: pointer;
                  width: 80px;
                  background-image: linear-gradient(
                    to right,
                    rgb(255, 242, 0),
                    rgb(255, 127, 39)
                  );
                  margin-right: 10px;
                "
              >
                转出
              </div>
            </li>
          </ul>
        </div>
        <div style="padding: 0px 25px">
          <div style="display: flex; align-items: center">
            <p class="desc"></p>
            <span class="font-700">余额宝说明</span>
          </div>

          <div style="white-space: pre-wrap; color: rgb(255, 255, 255)">
            1.用户可将当前账户余额转入余额宝产生收益，收益为转入金额的10% <br />
            2.需完成百分百待消费才能转入余额宝 <br />
            3.转入余额宝金额次日才会有收益，转出金额不能直接提款需消费转出金额100%流水才能提款
          </div>
        </div>
        <!---->
      </div>
      <div v-if="tab == 1" class="content-bg page-color">
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
                      <div class="wh_item_date wh_isToday">17</div>
                    </div>
                    <div class="wh_content_item">
                      <div class="wh_item_date">18</div>
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
                    <li class="wh_content_li">2024年10月</li>
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
                      <div class="wh_item_date wh_other_dayhide">30</div>
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
                      <div class="wh_item_date">18</div>
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
                      <div class="wh_item_date wh_chose_day">29</div>
                    </div>
                    <div class="wh_content_item">
                      <div class="wh_item_date">30</div>
                    </div>
                    <div class="wh_content_item">
                      <div class="wh_item_date">31</div>
                    </div>
                    <div class="wh_content_item">
                      <div class="wh_item_date wh_other_dayhide">1</div>
                    </div>
                    <div class="wh_content_item">
                      <div class="wh_item_date wh_other_dayhide">2</div>
                    </div>
                    <div class="wh_content_item">
                      <div class="wh_item_date wh_other_dayhide">3</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div class="select-drop-main" style="margin-left: 18px">
            <span class="select-drop-span">状态</span>
            <div class="cp-cascader-main" style="width: 110px; height: 26px">
              <div class="cp-cascader-btn" style="color: rgb(51, 51, 51)">
                <span class="cp-cascader-span">已转出</span>
                <i class="el-icon-close" style="margin-right: 6px"></i>
              </div>
              <div class="cp-cascader-items">
                <div
                  class="cp-cascader-columns"
                  style="background: rgb(255, 241, 192)"
                >
                  <div class="cp-cascader-column" style="width: 110px">
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">全部</span>
                      <!---->
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">生息中</span>
                      <!---->
                    </div>
                    <div class="cp-cascader-item cp-cascader-item-active">
                      <span class="cp-cascader-item-span">已转出</span>
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cp-button-main recharge-btn">
            <!---->
            查询
          </div>
        </div>
        <div class="recharge-table-container">
          <table rules="all" align="center" class="recharge-table">
            <tr align="center" class="recharge-table-header">
              <th height="40">余额宝编号</th>
              <th height="40">返点模式</th>
              <th height="40">转入金额</th>
              <th height="40">利率</th>
              <th height="40">利息</th>
              <th height="40">状态</th>
              <th height="40">转入时间</th>
              <th height="40">转出时间</th>
              <th height="40">操作</th>
            </tr>
          </table>
          <div class="num-color empty">没有更多的数据了</div>
          <div class="cp-pagination-main">
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
        </div>
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountCenter",
  data() {
    return {
      navs: [
        {
          name: "余额宝",
          id: 0,
        },
        {
          name: "明细记录",
          id: 1,
        },
      ],
      tab: 0,
    };
  },
};
</script>
<style scoped lang="scss"></style>
