<template>
  <div>
    <el-card shadow="hover" style="width: 700px; margin: 40px auto">
      <el-container>
        <el-header>
          <el-divider content-position="left">学生算法学习管理系统</el-divider>
        </el-header>
        <el-main style="margin-top: -20px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 600px;margin-top: 20px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input type="text" v-model="ruleForm.phone" autocomplete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" show-password v-model="ruleForm.password" autocomplete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="rwPassword">
              <el-input type="password" show-password v-model="ruleForm.rwPassword" autocomplete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mailbox">
              <el-input type="text" v-model="ruleForm.mailbox" autocomplete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 40px; float: right">
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-main>
        <el-footer>
          <el-divider content-position="right">版权所有<span>©</span>杭科院</el-divider>
        </el-footer>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import {userRegister} from "../../api/api";

export default {
  name: "TeacherRegister",
  data() {
    const validateUsername = async (rule, value, callback) => {
      if (value === '') {
        await callback(new Error('请输入账号'));
      } else {
        if (this.ruleForm.username !== '') {
          this.$refs.ruleForm.validateField('username');
        } else {
          await callback();
        }
      }
    };
    const validatePassword = async (rule, value, callback) => {
      if (value === '') {
        await callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password');
        } else {
          await callback();
        }
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        rwPassword: '',
        phone: '',
        mailbox: ''
      },
      rules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.goRegister();
          // this.$debounce(this.goLogin, 1000);
        } else {
          this.$notify({
            title: '警告',
            message: '请填写完整表单信息',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goRegister() {
      let data = {
        username: this.ruleForm.username,
        phone: this.ruleForm.phone,
        roleGroupId: 2,
        password: this.ruleForm.password,
        rwPassword: this.ruleForm.rwPassword,
        mailbox: this.ruleForm.mailbox
      }
      userRegister(data).then((res) => {
        if (res.message.register_code === 1) {
          this.$notify.success("注册成功");
          this.$router.push('/');
        } else {
          this.$notify({
            message: res.message.data,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
