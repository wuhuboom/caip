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
      <el-table class="g-el-table" border :data="tableData.results">
        <el-table-column prop="orderNo" label="客观名称"> </el-table-column>
        <el-table-column prop="orderNo" label="充值金额"> </el-table-column>
        <el-table-column prop="orderNo" label="用户"> </el-table-column>
        <el-table-column prop="orderNo" label="佣金"> </el-table-column>
        <el-table-column prop="orderNo" label="充值时间"> </el-table-column>
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
import i18n from "@/locale";
export default {
  name: "AccountCenter",
  data() {
    return {
      tabSimpleList: [
        {
          text: i18n.t("dropdown.billing.all.title.text"),
          id: "",
        },
        {
          text: i18n.t("match.records.today.text"),
          id: 1,
        },
        {
          text: i18n.t("match.records.yes.text"),
          id: 2,
        },
        {
          text: i18n.t("match.records.nearly7.text"),
          id: 3,
        },
        {
          text: i18n.t("match.records.nearly10.text"),
          id: 4,
        },
        {
          text: i18n.t("match.records.nearly30.text"),
          id: 5,
        },
      ],
      tableData: {
        totalCount: 0,
        results: [],
      },
      date: "",
      loading: false,
      params: {
        name: "",
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
        sendData.start = this.date[0];
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
      const [err, res] = await userApi.lotteryMyOrder(sendData);
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
