<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 600px;margin-top: 20px" class="demo-ruleForm">
      <el-form-item label="工号" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="ruleForm.password" autocomplete="off" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 40px; float: right">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {studentLogin, teacherLogin} from '../../api/api';
export default {
  name: "TeacherLogin",
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
        password: ''
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
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.goLogin();
          // let md5Password = this.$md5(this.ruleForm.password)
          // localStorage.setItem('lockPassword', md5Password);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goLogin() {
      let data = {
        phone: this.ruleForm.username,
        password: this.ruleForm.password,
        roleGroup: "teacher"
      }
      teacherLogin(data).then((res) => {
        console.log(res);
        if (res.message.login_code === 1) {
          localStorage.setItem('token', res.message.token);
          console.log(res.message.data)
          localStorage.setItem('info', JSON.stringify(res.message.data));
          this.$notify({
            message: '登录成功',
            type: 'success',
            offset: 100
          });
          this.$router.push('/teacher/main')
        } else {
          this.$notify({
            message: res.data.message.data,
            type: 'error'
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
