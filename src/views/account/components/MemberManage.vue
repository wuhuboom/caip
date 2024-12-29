<template>
  <div class="recharge-main">
    <div style="margin: 0px 15px">
      <div>
        <span>官网地址：</span
        ><span style="margin-left: 5px">
          {{ headData.website }}
        </span>
      </div>
      <div>
        <div>
          <span>推广链接：</span
          ><span style="margin-left: 5px">
            {{ headData.website2 }}
          </span>
        </div>
        <div>
          <span>邀请码：</span
          ><span style="margin-left: 5px">{{ user.invitationCode }}</span>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="recharge-title" style="margin: 5px 15px">
      <span>代理说明：</span
      ><span style="margin-left: 5px"
        >会员注册默认为客户代理，客户代理将获得名下注册会员
        {{ headData.point }}
        %的中奖金额返点。</span
      >
    </div>
    <div class="recharge-title align-center">
      <input
        v-model.trim="query.nickname"
        class="activity-member-input center-center p-x-4 m-r-12"
        style="height: 30px"
        placeholder="会员昵称"
      />
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
      <div
        class="cp-button-main activity-search-btn"
        @click="handleCurrentChange(1)"
      >
        查询
      </div>
    </div>
    <div class="my-sum">
      <div class="my-sum-item">
        本月返点：
        {{ divide(headData.month) }}
        元
      </div>
      <div class="my-sum-item">
        上月返点：{{ divide(headData.lastMonth) }} 元
      </div>
    </div>
    <div class="recharge-table-container" style="background-color: transparent">
      <table rules="all" align="center" class="recharge-table">
        <tr align="center" class="recharge-table-header">
          <th height="40" width="120">会员昵称</th>
          <th height="40" width="100">今日中奖</th>
          <th height="40" width="100">本月消费</th>
          <th height="40" width="100">本月中奖</th>
          <th height="40" width="155">最后投注</th>
          <th height="40" width="155">最后登录</th>
          <th height="40" width="155">注册时间</th>
        </tr>
        <tr
          align="center"
          class="recharge-table-header"
          v-for="(item, index) in tableData.results"
          :key="index"
        >
          <td height="40">{{ item.nickname }}</td>
          <td height="40">{{ divide(item.todayWin) }}</td>

          <td height="40">{{ divide(item.monthConsume) }}</td>
          <td height="40">{{ divide(item.monthWin) }}</td>
          <td height="40">{{ $dayjsTime(item.lastBet) }}</td>
          <td height="40">{{ $dayjsTime(item.theNewLoginTime) }}</td>
          <td height="40">{{ $dayjsTime(item.createdAt) }}</td>
        </tr>
      </table>
    </div>
    <div class="p-b-32 center-center">
      <el-pagination
        class="g-el-pagination"
        @current-change="handleCurrentChange"
        :current-page="query.pageNo"
        :page-size="query.pageSize"
        layout="total, prev, pager, next"
        :total="tableData.totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "AccountCenter",
  data() {
    return {
      query: {
        pageNo: 1,
        pageSize: 10,
        // begin: "",
        // end: "",
        nickname: "",
      },
      date: "",
      tableData: {
        totalCount: 0,
        results: [],
      },
      headData: {
        //website:官方 website2:推广链接 point:返点 month:本月返点 lastMonth:上月返点
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.query.pageNo = val;
      this.mysub();
    },
    async mysub2() {
      const [err, res] = await userApi.mysub2();
      if (err) return;
      this.headData = res.data;
    },
    async mysub() {
      const params = {
        ...this.query,
      };
      if (Array.isArray(this.date)) {
        params.begin = this.date[0];
        params.end = this.date[1];
      }
      const [err, res] = await userApi.mysub(params);
      if (err) return;

      this.tableData = res.data;
    },
  },
  created() {
    this.mysub();
    this.mysub2();
  },
};
</script>
<style scoped lang="scss"></style>
