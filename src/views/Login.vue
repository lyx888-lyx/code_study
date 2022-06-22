<template>
  <div>
    <el-card shadow="hover" style="width: 700px; margin: 40px auto">
      <el-container>
        <el-header>
          <el-divider content-position="left">学生算法学习管理系统</el-divider>
        </el-header>
        <el-main style="margin-top: -20px">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="学生登录"  name="first" v-loading="loading">
              <StudentLogin />
            </el-tab-pane>
            <el-tab-pane label="教师登录" name="second" v-loading="loading">
              <TeacherLogin />
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-footer>
          <el-divider content-position="right">版权所有<span @click="goRegister">©</span>杭科院</el-divider>
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import StudentLogin from "../components/Login/StudentLogin";
import TeacherLogin from "../components/Login/TeacherLogin";

export default {
  name: "Login",
  components: {
    StudentLogin,
    TeacherLogin
  },
  data() {
    return {
      activeName: 'first',
      loading: false
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    goRegister() {
      this.$router.push("/teacherRegister");
    }
  }
}
</script>

<style scoped>

</style>
