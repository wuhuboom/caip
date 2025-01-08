<template>
  <div class="recharge-main m-t-0 p-t-0">
    <div class="recharge-title align-center">
      <span class="no-shrink">用户名：</span>
      <input v-model.trim="params.name" class="fund-input m-r-16" />
      <span class="no-shrink">充值/提现时间：</span>
      <el-date-picker
        style="width: 310px"
        v-model="date"
        class="g-el-input__inner m-r-16"
        type="daterange"
        size="small"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        popper-class="g-table-popper-class"
      >
      </el-date-picker>
      <span class="no-shrink">状态：</span>
      <el-select
        style="width: 110px"
        class="g-el-cascader"
        size="small"
        v-model="params.time"
        clearable
        placeholder="请选择"
        popper-class="g-el-cascader-popper"
      >
        <el-option
          v-for="item in tabSimpleList"
          :key="item.id"
          :label="item.text"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div
        class="cp-button-main activity-search-btn"
        v-loading="loading"
        @click="handleCurrentChange(1)"
      >
        查询
      </div>
    </div>
    <div class="recharge-table-container p-t-0">
      <!-- "createdAt": 注册时间,
      "nickname": "用户",
      "balance": 余额,
      "status": 状态 0禁用 1正常,
      "theNewLoginTime": 登录时间,
      "qq": "qq",
      "accumulativeBet": 累计投注, -->
      <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="nickname" label="用户"> </el-table-column>
        <el-table-column prop="balance" label="余额">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ +scope.row.status ? "正常" : "禁" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="qq"> </el-table-column>
        <el-table-column prop="orderNo" label="累计投注">
          <template slot-scope="scope">
            <span>{{ divide(scope.row.accumulativeBet) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="theNewLoginTime" label="登录时间">
          <template slot-scope="scope">
            <span>{{ $dayjsTime(scope.row.theNewLoginTime) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="cp-pagination-main" style="margin-top: 40px">
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
</template>

<script>
import userApi from "@/api/user";
export default {
  name: "AccountCenter",
  data() {
    return {
      //"status": 状态 0禁用 1正常,
      tabSimpleList: [
        { id: 0, text: "禁用" },
        { id: 1, text: "正常" },
      ],
      tableData: {
        totalCount: 0,
        results: [],
      },
      date: "",
      loading: false,
      params: {
        playerName: "",
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.lotteryBetsOrder();
    },
    getNname: () => {},
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
      const [err, res] = await userApi.groupMember(sendData);
      this.loading = false;
      if (err) return;
      this.tableData = res.data;
    },
  },
  created() {
    this.lotteryBetsOrder();
  },
};
</script>
<style scoped lang="scss"></style>
