<template>
  <div>
    <div class="play_ball_bar_remark">每注以英文逗号","分隔，例如：123,456</div>
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
      this.$emit("total", matches.length);
      this.changemultiple();
      return matches.map((str) => str.split("").join(",")).join("|");
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
