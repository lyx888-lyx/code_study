<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我的消息</span>
    </div>
    <div v-for="o in 4" :key="o" class="text item" style="border-bottom: 1px solid #DDD;margin: 0 0 15px 0;">
      <el-badge is-dot class="item" style="margin-bottom: 5px">这是第 {{o}} 条消息</el-badge>
    </div>
    <el-pagination
        layout="prev, pager, next"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        :total="1000">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "collapse",
  data() {
    return {
      currentPage1: 5,
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    max-height: 300px;
    width: 48%;
  }
</style>
