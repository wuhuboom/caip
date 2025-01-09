<template>
  <el-dialog
    :title="row.playerName || '详情'"
    :visible.sync="show"
    width="933px"
  >
  </el-dialog>
</template>

<script>
export default {
  name: "AccountCenter",
  data() {
    return {
      show: false,
      row: {},
    };
  },
  methods: {
    open(row) {
      this.show = true;
      this.row = row;
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep {
  [role="dialog"] {
    background-color: #623525;

    .el-dialog__body,
    .el-dialog__title {
      color: rgb(253, 217, 155);
    }
  }
}
</style>
