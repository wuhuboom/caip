<template>
  <div class="app-content">
    <div class="activity-main">
      <div class="activity-search">
        <div class="activity-search-conditions">
          <div class="el-image activity-search-icon">
            <img
              src="/static/activity/icon_search.png"
              class="el-image__inner"
            /><!---->
          </div>
          <span>查询</span>
          <div class="select-category-main" style="margin-left: 18px">
            <span class="select-category-span">游戏名称:</span>
            <div class="cp-cascader-main" style="width: 117px; height: 26px">
              <div class="cp-cascader-btn" style="color: rgb(51, 51, 51)">
                <span class="cp-cascader-span">全部</span>
                <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
              </div>
              <div class="cp-cascader-items">
                <div
                  class="cp-cascader-columns"
                  style="background: rgb(255, 241, 192)"
                >
                  <div class="cp-cascader-column" style="width: 117px">
                    <div class="cp-cascader-item cp-cascader-item-active">
                      <span class="cp-cascader-item-span">全部</span>
                      <i class="el-icon-arrow-right cp-cascader-item-i"></i>
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">时时彩</span>
                      <i class="el-icon-arrow-right cp-cascader-item-i"></i>
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">11选5</span>
                      <i class="el-icon-arrow-right cp-cascader-item-i"></i>
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">低频彩</span>
                      <i class="el-icon-arrow-right cp-cascader-item-i"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="select-drop-main" style="margin-left: 18px">
            <span class="select-drop-span">保底:</span>
            <div class="cp-cascader-main" style="width: 90px; height: 26px">
              <div class="cp-cascader-btn" style="color: rgb(51, 51, 51)">
                <span class="cp-cascader-span">全部</span>
                <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
              </div>
              <div class="cp-cascader-items">
                <div
                  class="cp-cascader-columns"
                  style="background: rgb(255, 241, 192)"
                >
                  <div class="cp-cascader-column" style="width: 90px">
                    <div class="cp-cascader-item cp-cascader-item-active">
                      <span class="cp-cascader-item-span">全部</span>
                      <!---->
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">全额保底</span>
                      <!---->
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">部分保底</span>
                      <!---->
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">未保底</span>
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="select-drop-main" style="margin-left: 18px">
            <span class="select-drop-span">系统满单:</span>
            <div class="cp-cascader-main" style="width: 90px; height: 26px">
              <div class="cp-cascader-btn" style="color: rgb(51, 51, 51)">
                <span class="cp-cascader-span">全部</span>
                <i class="el-icon-caret-bottom" style="margin-right: 6px"></i>
              </div>
              <div class="cp-cascader-items">
                <div
                  class="cp-cascader-columns"
                  style="background: rgb(255, 241, 192)"
                >
                  <div class="cp-cascader-column" style="width: 90px">
                    <div class="cp-cascader-item cp-cascader-item-active">
                      <span class="cp-cascader-item-span">全部</span>
                      <!---->
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">是</span>
                      <!---->
                    </div>
                    <div class="cp-cascader-item">
                      <span class="cp-cascader-item-span">否</span>
                      <!---->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span style="margin-left: 18px">发起人：</span>
          <input class="activity-member-input" />
          <div class="cp-button-main activity-search-btn">
            <!---->
            查询
          </div>
        </div>
        <div
          title="青铜：中奖金额【1000 - 10000】，黄金：中奖金额【10000 - 100000】，钻石：中奖金额【100000 - 1000000】，星耀：中奖金额【1000000 - 10000000】，王者：中奖金额达 10000000及以上。"
          class="activity-state"
        >
          <div class="el-image activity-state-image">
            <img src="/static/activity/1.png" class="el-image__inner" /><!---->
          </div>
          <div>段位说明</div>
        </div>
      </div>
      <div class="activity-table-container">
        <table rules="cols" class="activity-table">
          <tr align="center" style="background: rgb(50, 22, 11)">
            <th height="50">游戏</th>
            <th height="50">方案金额</th>
            <th height="50">保底</th>
            <th height="50">系统满单</th>
            <th height="50">剩余</th>
            <th height="50">中奖金额</th>
            <th height="50">进度</th>
            <th height="50">参与人数</th>
            <th height="50">发起人</th>
            <th height="50">战绩段位</th>
            <th height="50">截止时间</th>
            <th height="50">操作</th>
          </tr>
          <tr align="center" class="activity-tr-o" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164b7dc8a7b4a41be288ef63abccc6/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >福彩3D
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥56.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥23.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">100%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 100 1 0%"></div>
                  <div class="cp-left" style="flex: 0 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">3</td>
            <td height="50">科哩激哇</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/3.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      5
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:40:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-j" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164b7c8d37e438bb02d748956d63af/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >福彩3D
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥200.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥153.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">0%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 0 1 0%"></div>
                  <div class="cp-left" style="flex: 100 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">3</td>
            <td height="50">科哩激哇</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/3.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      5
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:40:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-o" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164b5b58535d8339c83312b9858359/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >福彩3D
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥250.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥225.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">10%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 10 1 0%"></div>
                  <div class="cp-left" style="flex: 90 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">1</td>
            <td height="50">元始天尊</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/2.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      1
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:40:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-j" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164b20cf1add10986377f9c46f98a3/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >福彩3D
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥116.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥96.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">17%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 17 1 0%"></div>
                  <div class="cp-left" style="flex: 83 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">1</td>
            <td height="50">素心</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/4.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:40:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-o" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164b09c1cc1f521f53cc250a80c6b6/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >排三
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥292.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥242.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">17%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 17 1 0%"></div>
                  <div class="cp-left" style="flex: 83 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">1</td>
            <td height="50">素心</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/4.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:55:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-j" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164aff51cbb773ba87f2b06d2278c0/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >排三
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥140.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥123.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">12%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 12 1 0%"></div>
                  <div class="cp-left" style="flex: 88 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">3</td>
            <td height="50">素心</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/4.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:55:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-o" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164afca08279969e360ab60b032752/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >排三
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥28.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥14.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">50%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 50 1 0%"></div>
                  <div class="cp-left" style="flex: 50 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">3</td>
            <td height="50">素心</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/4.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:55:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-j" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164af0a9c9b05e3d3f968a67099570/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >排三
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥484.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥430.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">11%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 11 1 0%"></div>
                  <div class="cp-left" style="flex: 89 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">3</td>
            <td height="50">素心</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/4.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      9
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:55:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-o" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164ab7288972b2462b4dd2a739248b/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >排三
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥80.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥72.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">10%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 10 1 0%"></div>
                  <div class="cp-left" style="flex: 90 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">1</td>
            <td height="50">不太会玩</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/3.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      1
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:55:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr align="center" class="activity-tr-j" style="font-size: 13px">
            <td height="50">
              <a
                href="#/order/detail/3a164ab6eb44e224d0eff322a97e3c54/co"
                class="common_table_link"
                title="查看订单"
                target="_blank"
                >福彩3D
              </a>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥80.00</td>
            <td height="50">
              <div>
                <div style="color: rgb(255, 216, 0); margin-top: 3px">¥0</div>
              </div>
            </td>
            <td height="50">是<span style="color: rgb(255, 216, 0)"></span></td>
            <td height="50">
              ¥70.00<span style="color: rgb(255, 216, 0)"></span>
            </td>
            <td height="50" style="color: rgb(255, 156, 0)">¥0</td>
            <td height="50">
              <div style="margin-bottom: 3px">12%</div>
              <div class="cp-progress-main">
                <div class="cp-progress-bar" style="width: 80px; height: 10px">
                  <div class="cp-progress" style="flex: 12 1 0%"></div>
                  <div class="cp-left" style="flex: 88 1 0%"></div>
                </div>
              </div>
            </td>
            <td height="50">2</td>
            <td height="50">不太会玩</td>
            <td height="50">
              <div class="score-record-main">
                <div class="score-record-item">
                  <div class="el-image score-record-image">
                    <img
                      src="/static/activity/3.png"
                      class="el-image__inner"
                    /><!---->
                  </div>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    class="score-record-num"
                  >
                    <text
                      text-anchor="middle"
                      dominant-baseline="middle"
                      x="50%"
                      y="50%"
                      fill="#e4e4e4"
                      class="cp-text"
                      style="font-size: 12px"
                    >
                      1
                    </text>
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                    <!---->
                  </svg>
                </div>
              </div>
            </td>
            <td height="50">2024-11-17 19:40:00</td>
            <td height="50">
              <div style="padding: 3px 0px">
                <div>
                  <input class="activity-cell-buy-input" /> <span>元</span>
                </div>
                <div class="activity-cell-buy">
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    购买
                  </div>
                  <div class="cp-button-main activity-cell-buy-btn">
                    <!---->
                    全包
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div>
          <div class="cp-pagination-main" style="margin-top: 30px">
            <div class="cp-pagination-head">
              <div class="cp-pagination-first">首页</div>
              <div class="cp-pagination-page">上一页</div>
              <div class="cp-pagination-num">1</div>
            </div>
            <div class="cp-pagination-middle">
              <!---->
              <div class="cp-pagination-num cp-pagination-num-active">2</div>
              <div class="cp-pagination-num">3</div>
              <div class="cp-pagination-num">4</div>
              <div class="cp-pagination-num">5</div>
              <div class="cp-pagination-num">6</div>
              <span class="cp-pagination-span">•••</span>
            </div>
            <div class="cp-pagination-head">
              <div class="cp-pagination-num1">169</div>
              <div class="cp-pagination-page">下一页</div>
              <div class="cp-pagination-tail">尾页</div>
            </div>
            <div class="cp-pagination-data">页次：2/169</div>
            <div class="cp-pagination-data">记录：1688条</div>
          </div>
        </div>
      </div>
    </div>
    <!---->
  </div>
</template>

<script>
export default {
  name: "AppTopBar",
  data() {
    return {
      navs: [
        {
          name: "首页",
          desc: "Home",
          path: "/",
        },
        {
          name: "游戏大厅",
          desc: "Game Hall",
          path: "/game/hall",
        },
        {
          name: "合买中心",
          desc: "Cooperation",
          path: "/cooperation/activity",
        },
        {
          name: "定制跟单",
          desc: "Customizations",
          path: "/custom/follow",
        },
        {
          name: "用户中心",
          desc: "Account",
          path: "/account/center",
        },
        {
          name: "App下载",
          desc: "DownLoad",
          app: "/download/app",
        },
        {
          name: "线路检测",
          desc: "Line Detection",
          path: "/line/index",
        },
        {
          name: "聊天室",
          desc: "Chat Room",
          path: "/chat/room",
        },
        {
          name: "U充教程",
          desc: "Usdt Course",
          path: "/usdtInfo/index",
        },
      ],
    };
  },
};
</script>
