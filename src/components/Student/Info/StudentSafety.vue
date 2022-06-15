<template>
  <div style="padding-top: 15px">
    <el-descriptions title="账号安全" direction="vertical" :column="4" border>
      <template slot="extra">
        <el-button type="primary" size="small">编辑</el-button>
      </template>
      <el-descriptions-item label="电子邮箱" :span="4">kooriookami@yeah.net</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="2">18100000000</el-descriptions-item>
      <el-descriptions-item label="QQ号" :span="2">940251494</el-descriptions-item>
      <el-descriptions-item label="微信号" :span="2">l940251494</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">学校</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "StudentSafety"
}
</script>

<style scoped>

</style>
