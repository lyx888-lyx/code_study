<template>
  <div>
    <el-card class="box-card">
      <el-descriptions title="个人信息" direction="vertical" :column="4" border>
        <template slot="extra">
          <el-button type="primary" size="small">编辑</el-button>
        </template>
        <el-descriptions-item label="头像" :span="2">
          <div class="block">
            <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="居住地" :span="2">苏州市</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Setting"
}
</script>

<style scoped>

</style>
