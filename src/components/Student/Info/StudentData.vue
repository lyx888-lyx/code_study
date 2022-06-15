<template>
  <div style="padding-top: 15px">
    <el-descriptions title="个人资料" direction="vertical" :column="4" border>
      <template slot="extra">
        <el-button type="primary" size="small">编辑</el-button>
      </template>
      <el-descriptions-item label="用户名" :span="2">kooriookami</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="2">18100000000</el-descriptions-item>
      <el-descriptions-item label="联系地址" :span="4">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      <el-descriptions-item label="居住地" :span="4">苏州市</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "StudentData"
}
</script>

<style scoped>

</style>
