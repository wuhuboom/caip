<template>
  <div class="award-index-main">
    <div class="award-index-tabs">
      <div
        class="award-index-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="id = item.id"
        :class="{ 'award-index-tab-active': id === item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <div v-if="id === 0" class="container">
        <div class="header">
          <div class="header-title">
            <div>
              <span style="color: rgb(216, 151, 32)">剩余次数：</span>
              <span style="color: rgb(255, 216, 0)">0</span>
            </div>
          </div>
          <div class="typecheckbox">
            <div class="award-item-active">消费达到5000</div>
            <div class="award-item">单笔充值1000</div>
          </div>
        </div>
        <div class="guize">
          <div class="title">规则说明</div>
          <div class="g_item">
            尊敬的用户，欢迎您来到幸运转盘，祝您好运连连。抽奖规则如下： <br />
            1：如果当日您的累计消费达到5000元，您将拥有一次抽奖机会。
            2.抽奖机会是可以叠加的，（如您消费达到10000元，您会获得2次抽奖机会)
            3.当您满足抽奖条件后，当日不会生效，需要次日您才能进行抽奖。
          </div>
        </div>
      </div>
      <div v-if="id === 1" class="award-record-main">
        <div class="award-record-title">
          <div class="cp-date-picker-main award-record-picker">
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
          <div class="cp-date-picker-main award-record-picker">
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
          <div class="cp-button-main award-record-btn">
            <!---->
            查询
          </div>
        </div>
        <div class="award-record-table-container">
          <table rules="all" align="center" class="award-record-table">
            <tr align="center" class="award-record-table-header">
              <th height="40">活动主题</th>
              <th height="40">中奖奖项</th>
              <th height="40">中奖金额</th>
              <th height="40">奖品状态</th>
              <th height="40">中奖时间</th>
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
        </div>
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
          name: "幸运转盘",
          id: 0,
        },
        {
          name: "中奖记录",
          id: 1,
        },
      ],
      id: 0,
    };
  },
};
</script>
<style scoped lang="scss"></style>
