<template>
  <div class="app-content">
    <div class="order-detail-main">
      <div style="right: 20px; top: 20px; position: absolute; z-index: 3">
        <div class="cp-button-main order-btn-share">
          <!---->
          分享
        </div>
      </div>
      <div class="order-detail-title">
        <div class="order-detail-cp">
          <div class="el-image order-detail-logo">
            <img :src="curCat.src" class="el-image__inner" /><!---->
          </div>
          <span>{{ detail.lotteryName }}</span>
        </div>
        <div class="order-detail-title-text">方案详情</div>
      </div>
      <div class="order-detail-info">
        <span style="color: rgb(253, 217, 155)">发起时间：</span>
        <span style="color: rgb(255, 169, 45)">{{
          $dayjsTime(detail.createdAt)
        }}</span>
        <span style="margin-left: 50px; color: rgb(253, 217, 155)"
          >订单编号：</span
        >
        <span style="color: rgb(255, 169, 45)">{{ detail.orderId }}</span>
        <span style="margin-left: 50px; color: rgb(253, 217, 155)"
          >发起人：</span
        >
        <span style="color: rgb(255, 169, 45)">{{ detail.playerName }}</span>
        <span style="margin-left: 50px; color: rgb(253, 217, 155)"
          >截止下注：</span
        >
        <span style="color: rgb(255, 169, 45)">{{
          $dayjsTime(detail.finishTime)
        }}</span>
      </div>
      <div class="order-detail-table-container">
        <table rules="all" class="order-detail-table">
          <tr align="center" style="color: rgb(255, 241, 192)">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              基本信息
            </td>
            <td width="80%">
              <table rules="all" class="order-detail-table1">
                <tr style="background-color: rgb(85, 38, 19)">
                  <th height="30">订单金额</th>
                  <th height="30">订单期数</th>
                  <th height="30">完成期数</th>
                  <th height="30">追号</th>
                  <th height="30">保底</th>
                  <th height="30">购买方式</th>
                  <th height="30">剩余金额</th>
                  <th height="30">中奖金额</th>
                  <th height="30">订单状态</th>
                </tr>
                <tr
                  align="center"
                  style="
                    color: rgb(253, 217, 155);
                    background-color: rgb(98, 53, 37);
                  "
                >
                  <td height="30">
                    <span style="color: rgb(255, 155, 0)"
                      >¥{{ divide(detail.money) }}</span
                    >
                  </td>
                  <td height="30">
                    <span style="color: rgb(255, 155, 0)">1</span>
                  </td>
                  <td height="30">
                    <span style="color: rgb(255, 155, 0)">0</span>
                  </td>
                  <td height="30">
                    <span style="color: rgb(255, 155, 0)">3</span>
                  </td>
                  <td height="30">
                    <span
                      >{{
                        detail.betCountMin
                          ? `￥${detail.betCountMin}`
                          : "无保底"
                      }}
                      | {{ +detail.ftype ? "系统满单" : "系统未满单" }}</span
                    >
                  </td>
                  <td height="30">用户合买</td>
                  <td height="30">¥{{ detail.sellCount }}</td>
                  <td height="30">
                    <span style="color: rgb(239, 204, 82)"
                      >¥{{ divide(detail.moneyIncome) }}</span
                    >
                  </td>
                  <td height="30">
                    <span>{{ getStatus(detail.status) }}</span>
                  </td>
                </tr>
              </table>
              <div
                style="
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  width: 94%;
                  margin-bottom: 10px;
                "
                v-if="detail.sellCount && +detail.status === 0"
              >
                <div>可认购：</div>
                <div style="color: rgb(255, 216, 0)">
                  {{ detail.sellCount }}
                </div>
                <div>元</div>
                <div style="margin-left: 20px">我要认购：</div>
                <input
                  @input="validateInput(detail, $event)"
                  v-model.trim="detail.clientMoney"
                  class="order-info-buy-input"
                />
                <div>元</div>
                <div
                  @click="buyPlayer(detail.clientMoney)"
                  class="cp-button-main order-period-revert-btn"
                >
                  <!---->
                  购买
                </div>
                <div
                  @click="buyPlayer('all')"
                  class="cp-button-main order-period-revert-btn"
                >
                  <!---->
                  全包
                </div>
              </div>
            </td>
          </tr>
          <tr align="center">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              当前开奖号码
            </td>
            <td>
              <div class="order-detail-number1">
                <div
                  class="number-ball-main"
                  style="
                    width: 30px;
                    height: 30px;
                    font-size: 13px;
                    border-radius: 15px;
                    background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                      100% 100%;
                  "
                >
                  -
                </div>
                <div
                  class="number-ball-main order-detail-ball"
                  style="
                    width: 30px;
                    height: 30px;
                    font-size: 13px;
                    border-radius: 15px;
                    background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                      100% 100%;
                  "
                >
                  -
                </div>
                <div
                  class="number-ball-main order-detail-ball"
                  style="
                    width: 30px;
                    height: 30px;
                    font-size: 13px;
                    border-radius: 15px;
                    background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                      100% 100%;
                  "
                >
                  -
                </div>
                <div
                  class="number-ball-main order-detail-ball"
                  style="
                    width: 30px;
                    height: 30px;
                    font-size: 13px;
                    border-radius: 15px;
                    background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                      100% 100%;
                  "
                >
                  -
                </div>
                <div
                  class="number-ball-main order-detail-ball"
                  style="
                    width: 30px;
                    height: 30px;
                    font-size: 13px;
                    border-radius: 15px;
                    background: url('/static/gameHall/color_ball_0.png') 0% 0% /
                      100% 100%;
                  "
                >
                  -
                </div>
              </div>
            </td>
          </tr>
          <tr align="center">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              <div>投注内容</div>
              <div>(公开)</div>
            </td>
            <td>
              <div style="overflow: auto; max-height: 450px">
                <table
                  rules="all"
                  class="order-detail-table1"
                  style="table-layout: fixed"
                >
                  <tr
                    v-for="(item, index) in detail.betListArr"
                    :key="index"
                    style="
                      color: rgb(253, 217, 155);
                      background-color: rgb(98, 53, 37);
                    "
                  >
                    <td width="166px" height="30" style="text-align: center">
                      {{ item.name }}
                    </td>
                    <td
                      align="center"
                      style="
                        height: 30px;
                        overflow-wrap: break-word;
                        text-align: center;
                        color: rgb(51, 51, 51);
                        display: flex;
                        flex-flow: wrap;
                        align-items: center;
                        justify-content: center;
                        border: none;
                      "
                    >
                      <div
                        class="align-center"
                        v-for="(doc, idx) in item.positions"
                        :key="idx"
                      >
                        <div v-for="(v, i) in doc" :key="i">
                          <div class="o-select-ball o-ball-bg">{{ v }}</div>
                        </div>
                        <div v-if="idx < item.positions.length - 1">
                          <div
                            class="o-select-ball"
                            style="font-size: 18px; color: rgb(255, 216, 0)"
                          >
                            |
                          </div>
                        </div>
                      </div>
                    </td>
                    <td width="20px" height="30" style="text-align: center">
                      元
                    </td>
                    <td width="70px" height="30" style="text-align: center">
                      {{ item.quantity }}注
                    </td>
                    <td width="50px" height="30" style="text-align: center">
                      {{ item.multiplier }}倍
                    </td>
                    <td
                      width="80px"
                      height="30"
                      style="text-align: center; color: rgb(255, 155, 0)"
                    >
                      ¥{{ item.quantity * item.multiplier }}
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr align="center">
            <td
              width="20%"
              height="50"
              style="background-color: rgb(50, 22, 11)"
            >
              用户列表
            </td>
            <td>
              <div style="overflow: auto">
                <table rules="all" class="order-detail-table1">
                  <tr style="background-color: rgb(85, 38, 19)">
                    <th height="30" width="20%">用户</th>
                    <th height="30" width="20%">认购金额</th>
                    <th height="30" width="20%">购买时间</th>
                    <th height="30" width="20%">所占比例</th>
                    <th height="30" width="20%">奖金</th>
                  </tr>

                  <tr
                    align="center"
                    style="
                      color: rgb(253, 217, 155);
                      background-color: rgb(98, 53, 37);
                    "
                    v-for="(item, index) in detail.joins"
                    :key="index"
                  >
                    <td height="30" width="20%">{{ item.playerName }}</td>
                    <td height="30" width="20%">¥{{ divide(item.money) }}</td>
                    <td height="30" width="20%">
                      {{ $dayjsTime(item.createdAt) }}
                    </td>
                    <td height="30" width="20%">
                      {{ $util.toPercent(item.money, detail.money) }}
                    </td>
                    <td height="30" width="20%">
                      <span class="order-detail-span"
                        >¥{{ divide(item.moneyIncome) }}</span
                      >
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <tipsDialog ref="$tipsDialog" />
    <tipsDialog ref="$buyDialog" @sure="mySure">
      <ul>
        <li>请确认您的认购信息</li>
        <li>游戏名称：{{ detail.lotteryName }}</li>
        <li>认购金额：￥{{ detail.clientMoney }}</li>
      </ul>
    </tipsDialog>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "OrderDetail",
  data() {
    return {
      id: this.$route.params.id,
      detail: {},
    };
  },
  computed: {
    cat() {
      return [...this.$store.state.cat];
    },
    curCat() {
      let catData = {};
      this.cat.forEach((v) => {
        v.list.forEach((c) => {
          if (+c.id === +this.detail.lotteryId) {
            catData = v;
          }
        });
      });
      return catData;
    },
  },
  methods: {
    validateInput(item, v) {
      let value = v.target.value.replace(/\D/g, "");
      if (value) {
        const numericValue = parseInt(value, 10);
        value = Math.min(Math.max(numericValue, 1), item.sellCount);
      }
      item.clientMoney = value;
    },
    buyPlayer(price) {
      if (price === "all") {
        this.detail.clientMoney = this.detail.sellCount;
        this.$refs.$buyDialog.open();
        return;
      }
      if (!price) {
        this.$refs.$tipsDialog.open("请输入购买金额");
        return;
      }
      if (price > this.detail.sellCount) {
        this.$refs.$tipsDialog.open("购买金额不能大于剩余金额");
        return;
      }
      this.$refs.$buyDialog.open();
    },
    getStatus(v) {
      //0进行中 1待出票 2待开奖 3已撤消 4已结束
      const docs = [
        {
          name: "进行中",
          status: 0,
        },
        {
          name: "待出票",
          status: 1,
        },
        {
          name: "待开奖",
          status: 2,
        },
        {
          name: "已撤消",
          status: 3,
        },
        {
          name: "已结束",
          status: 4,
        },
      ];
      return (docs.find((doc) => doc.status === v) || {}).name;
    },
    parseFourStarInput(input) {
      // 按 '/' 分割多组记录
      const records = input.split("/");

      // 解析每组记录
      const parsedData = records.map((record) => {
        record = record.trim(); // 去掉首尾空格

        // 按空格分割为名称和数据部分
        const parts = record.split(" ");
        if (parts.length < 3) {
          throw new Error("输入格式错误，无法解析");
        }

        const name = parts[0]; // 名称部分
        const positionsString = parts[1]; // 位置信息部分
        const multiplier = parseInt(parts[2], 10); // 倍数
        const quantity = parts.length > 3 ? parseInt(parts[3], 10) : 0; // 数量，默认 0

        // 按 '|' 拆分每个位，并进一步按 ',' 拆分
        const positions = positionsString.split("|").map(
          (pos) => pos.split(",").map(Number) // 将每个位拆分为数字数组
        );

        return {
          name,
          positions,
          multiplier,
          quantity,
        };
      });

      return parsedData;
    },
    async mySure() {
      const [err] = await userApi.lotteryBetsJoin({
        betId: this.detail.id,
        betCount: this.detail.clientMoney,
      });
      if (err) return;
      this.$message.success("购买成功");
      this.getDetail();
    },
    async getDetail() {
      const [err, res] = await userApi.betsOrderDetail({
        id: this.id,
      });
      if (err) return;
      res.data.clientMoney = "";
      res.data.sellCount = res.data.betTotal - res.data.betCountCurr;
      res.data.betListArr = this.parseFourStarInput(res.data.betCode);
      console.log(res.data.betListArr);
      for (let key in res.data) {
        this.$set(this.detail, key, res.data[key]);
      }
    },
  },
  async created() {
    let docCat = this.$store.state.cat.find((v) => v.list.length);
    if (!docCat) {
      await this.$store.dispatch("playerLotteryList");
    }
    this.getDetail();
  },
};
</script>
<style scoped lang="scss"></style>
