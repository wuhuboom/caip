<template>
  <div class="red-bag-main">
    <div class="red-bag-tabs">
      <div
        class="red-bag-tab"
        v-for="(item, idx) in navs"
        :key="idx"
        @click="id = item.id"
        :class="{ 'red-bag-tab-active': id === item.id }"
      >
        {{ item.name }}
      </div>
    </div>
    <div>
      <div v-if="id == 0" class="red-send-main">
        <div class="red-send-title">
          <div class="cp-date-picker-main red-send-picker">
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
          <div class="cp-date-picker-main red-send-picker">
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
          <div class="cp-button-main red-send-btn">
            <!---->
            查询
          </div>
        </div>
        <div class="red-send-table-container">
          <table rules="all" align="center" class="red-send-table">
            <tr align="center" class="red-send-table-header">
              <th height="40">红包主题</th>
              <th height="40">红包金额</th>
              <th height="40">红包数量</th>
              <th height="40">领取金额</th>
              <th height="40">剩余金额</th>
              <th height="40">领取数量</th>
              <th height="40">剩余数量</th>
              <th height="40">红包状态</th>
              <th height="40">是否已退款</th>
              <th height="40">派发时间</th>
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
      <div v-if="id == 1" class="red-collect-main">
        <div class="red-collect-title">
          <div class="cp-date-picker-main red-collect-picker">
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
          <div class="cp-date-picker-main red-collect-picker">
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
          <div class="cp-button-main red-collect-btn">
            <!---->
            查询
          </div>
        </div>
        <div class="custom-table-container">
          <table rules="all" class="custom-table">
            <tr>
              <th height="40">红包发起人</th>
              <th height="40">红包主题</th>
              <th height="40">领取金额</th>
              <th height="40">领取时间</th>
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
          name: "红包派发记录",
          id: 0,
        },
        {
          name: "红包领取记录",
          id: 1,
        },
      ],
      id: 6,
    };
  },
};
</script>
<style scoped lang="scss"></style>
