<template>
  <div>
    <!-- <div class="play_ball_bar_remark">每注以英文逗号","分隔，例如：123,456</div> -->
    <textarea
      v-model.trim="nums"
      @blur="validateInput"
      class="play_ball_bar_input p-x-8"
    ></textarea>
    <tipsDialog ref="$tipsDialog" />
  </div>
</template>

<script>
import tipsDialog from "@/components/tipsDialog";
export default {
  name: "InfoMain",
  data() {
    return {
      nums: "",
    };
  },

  computed: {
    text() {
      return this.validateInput();
    },
  },
  components: {
    tipsDialog,
  },
  methods: {
    changemultiple() {
      const match = this.nums.match(/各(\d+)元/);
      const multiple = match ? match[1] : null;
      if (multiple) {
        this.$emit("changemultiple", multiple);
      }
    },
    validateInput() {
      const text = this.nums;
      const matches = text.match(/\b\d{3}\b/g);
      if (!matches) {
        this.$refs.$tipsDialog.open("选择号码错误，请重新确认号码");
        this.$emit("total", 0);
        return false;
      }
      // 分类筛选
      const group3 = []; // 组三（有两个相同数字）
      const group6 = []; // 组六（三个数字都不同）

      matches.forEach((num) => {
        const digits = num.split("").sort(); // 分割为数组并排序
        const uniqueDigits = new Set(digits); // 转 Set 统计不同数字

        if (uniqueDigits.size === 2) {
          group3.push(num); // 组三
        } else if (uniqueDigits.size === 3) {
          group6.push(num); // 组六
        }
      });
      const allArr = [...group3, ...group6];
      if (!allArr.length) {
        this.$refs.$tipsDialog.open("选择号码错误，请重新确认号码");
        this.$emit("total", 0);
        return false;
      }
      this.$emit("total", allArr.length, allArr);
      this.changemultiple();
      return `${allArr.map((str) => str.split("").join(",")).join("|")}`;
    },
    clear() {
      this.nums = "";
      this.$emit("total", 0);
    },
    add() {
      return this.validateInput();
    },
  },
};
</script>
