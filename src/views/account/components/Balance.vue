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
        @click="changeTab(item.id)"
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
            <p>￥{{ data.canOut }}</p>
          </div>
          <div class="board shadow3">
            <p>待领取总返利</p>
            <p>￥{{ data.interestCurr }}</p>
          </div>
          <div class="board shadow1">
            <p>已领取总返利</p>
            <p>￥{{ data.interestOut }}</p>
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
                {{ config.rate }}%
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
                ￥{{ config.min }}
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
                ￥{{ data.canTrans }}
              </p>
            </li>
            <li>
              <p class="enter-input">
                <input
                  v-model.trim="money"
                  placeholder="请输入转入金额"
                  type="text"
                  class="input-account"
                  @blur="vaidNum"
                /><span style="padding-left: 6px">元</span>
              </p>
              <tipsDialog @sure="sureRecharge" ref="$recharge" />
              <div
                class="recharge-btn"
                @click="recharge"
                style="cursor: pointer; width: 80px; background-size: 100% 100%"
              >
                转入
              </div>
              <div
                class="recharge-btn btn-search"
                @click="withdraw"
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
            1.用户可将当前账户余额转入余额宝产生收益，收益为转入金额的{{
              config.rate
            }}% <br />
            2.需完成百分百待消费才能转入余额宝 <br />
            3.转入余额宝金额次日才会有收益，转出金额不能直接提款需消费转出金额100%流水才能提款
          </div>
        </div>
        <!---->
      </div>
      <div v-if="tab == 1" class="content-bg page-color">
        <div class="recharge-title align-center">
          <el-date-picker
            v-model="date"
            class="g-el-input__inner"
            type="daterange"
            size="small"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            popper-class="g-table-popper-class"
          >
          </el-date-picker>
          <div class="align-center" style="margin-left: 18px">
            <span class="select-drop-span">状态:</span>
            <div style="width: 117px">
              <el-cascader
                class="g-el-cascader"
                popper-class="g-el-cascader-popper"
                size="small"
                :options="statusList.filter((item) => item.id !== 2)"
                v-model="params.status"
                :props="{
                  value: 'id',
                  label: 'name',
                }"
                :show-all-levels="false"
              ></el-cascader>
            </div>
          </div>
          <div
            class="cp-button-main activity-search-btn"
            v-loading="loading"
            @click="lotteryBetsOrder"
          >
            <!---->
            查询
          </div>
        </div>
        <div class="recharge-table-container">
          <table rules="all" align="center" class="recharge-table">
            <tr align="center" class="recharge-table-header">
              <th height="40" width="260">余额宝编号</th>
              <th height="40">返点模式</th>
              <th height="40">转入金额</th>
              <th height="40">利率</th>
              <th height="40">利息</th>
              <th height="40">状态</th>
              <th height="40" width="136">转入时间</th>
              <th height="40" width="136">转出时间</th>
              <th height="40">操作</th>
            </tr>
            <tr v-for="(item, idx) in tableData.results" :key="idx">
              <td>
                {{ item.orderId }}
              </td>
              <td>默认</td>
              <td>{{ divide(item.money) }}</td>
              <td>{{ item.rate }}%</td>
              <td>{{ divide(item.currIncome) }}</td>
              <td>
                {{
                  item.status == 0
                    ? "生息中"
                    : item.status == 1
                    ? "已转出"
                    : "待转出"
                }}
              </td>
              <td>{{ $dayjsTime(item.createTime) }}</td>
              <td>{{ item.finishTime ? $dayjsTime(item.finishTime) : "" }}</td>
              <td>--</td>
            </tr>
          </table>
          <div class="num-color empty" v-if="!tableData.results.length">
            没有更多的数据了
          </div>
        </div>
        <div class="p-t-32 center-center">
          <el-pagination
            class="g-el-pagination"
            @current-change="handleCurrentChange"
            :current-page="params.pageNo"
            :page-size="params.pageSize"
            layout="total, prev, pager, next"
            :total="tableData.totalCount"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "AccountCenter",
  data() {
    return {
      statusList: [
        {
          id: -1,
          name: "全部",
        },
        {
          id: 0,
          name: "生息中",
        },
        {
          id: 1,
          name: "已转出",
        },
        {
          id: 2,
          name: "待转出",
        },
      ],
      tableData: {
        totalCount: 0,
        results: [],
      },
      date: "",
      loading: false,
      params: {
        lotteryId: -1,
        status: -1,
        pageNo: 1,
        pageSize: 10,
      },
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
      config: {
        rate: 0,
        min: 0,
      },
      data: {},
      money: "",
    };
  },
  methods: {
    changeTab(id) {
      this.tab = id;
      if (id === 1) {
        this.lotteryBetsOrder();
      }
    },
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryBetsOrder();
    },
    async lotteryBetsOrder() {
      if (this.loading) return;
      this.loading = true;
      const sendData = {
        ...this.params,
      };
      if (Array.isArray(this.date) && this.date.length) {
        sendData.begin = this.date[0];
        sendData.end = this.date[1];
      }
      if (Array.isArray(sendData.lotteryId)) {
        sendData.lotteryId = +sendData.lotteryId[sendData.lotteryId.length - 1];
      }
      if (Array.isArray(sendData.status)) {
        sendData.status = +sendData.status[sendData.status.length - 1];
      }
      //删除-1
      for (let key in sendData) {
        if (sendData[key] === -1) {
          delete sendData[key];
        }
      }
      console.log(sendData, userApi.safeList);
      const [err, res] = await userApi.safeList(sendData);
      this.loading = false;
      if (err) return;
      this.tableData = res.data;
    },
    recharge() {
      if (!this.money) {
        this.$message.error("请输入转入金额");
        return;
      }
      if (this.money < this.config.min) {
        this.$message.error("最低转入金额为" + this.config.min + "元");
        return;
      }
      if (this.money > this.data.canTrans) {
        this.$message.error("当前最多转入金额为" + this.data.canTrans + "元");
        return;
      }
      this.$refs.$recharge.open(`确定要转入${this.money}元到余额宝吗？`);
    },
    async withdraw() {
      if (!this.money) {
        this.$message.error("请输入转入金额");
        return;
      }
      if (this.money > this.data.canOut) {
        this.$message.error(`待转出总金额为${this.data.canOut}元`);
        return;
      }
      const [err, res] = await userApi.safeToBalance({
        money: this.money,
      });
      if (err) return;
      this.money = "";
      console.log(res);
      this.$message.success("转出成功");
      this.initPage();
    },
    async sureRecharge() {
      const [err, res] = await userApi.safeTransfer({
        money: this.money,
      });
      if (err) return;
      console.log(res);
      this.money = "";
      this.$message.success("转入成功");
      this.initPage();
    },
    vaidNum() {
      if (this.money === "") return;
      let num = this.money.replace(/[^\d.]/g, "");
      num = parseInt(num);
      this.money = num;
    },
    async getConfig() {
      const [err, res] = await userApi.fbConf();
      if (err) return;
      this.config = res.data;
    },
    async safeData() {
      const [err, res] = await userApi.safeData();
      if (err) return;
      this.data = res.data;
    },
    initPage() {
      this.getConfig();
      this.safeData();
    },
  },

  created() {
    this.initPage();
  },
};
</script>
<style scoped lang="scss">
.recharge-table {
  text-align: center;
}
.enter-input {
  font-size: 12px;
  .input-account {
    width: 88px;
    color: #333;
    &::placeholder {
      color: #333;
    }
  }
}
</style>
