<template>
  <div>
    <div class="next-result-history-container scrollbar">
      <div class="next-result-history" v-for="(item, idx) in list" :key="idx">
        <div class="next-result-history-text">{{ item.cycleNum }}</div>
        <div class="common_layout_center_h">
          <div
            class="next-result-number"
            v-for="(doc, index) in item.openNum.split(',')"
            :key="index"
          >
            {{ doc }}
          </div>
        </div>
        <div class="next-result-history-text">
          <span class=""></span>
        </div>
      </div>
    </div>
    <div data-v-8c1f4d24="" class="next-result-more">
      查看更多<i data-v-8c1f4d24="" class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user";
export default {
  name: "BindCard",
  data() {
    return {
      params: {
        pageNo: 1,
        pageSize: 10,
      },
      list: [],
    };
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  methods: {
    async lotteryHisExpect() {
      const [err, res] = await userApi.lotteryHisExpect({
        ...this.params,
        id: this.id,
      });
      if (err) return;
      this.list = res.data.results;
      console.log(this.list);
    },
  },
  created() {
    if (this.list.length) return;
    this.lotteryHisExpect();
  },
};
</script>
