<template>
  <div style="padding-top: 15px">
    <el-descriptions title="账号安全" direction="vertical" :column="4" border>
      <el-descriptions-item label="电子邮箱" :span="4">{{info.stMailbox}}</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="2">{{info.stPhone}}</el-descriptions-item>
      <el-descriptions-item label="修改密码">
        <el-tag size="small" type="danger" style="cursor: pointer" @click="dialogFormVisible = true">修改密码</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.nowPassword" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" :label-width="formLabelWidth">
          <el-input v-model="form.ReNowPassword" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStudentPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateStudentPassword } from '../../../api/api';
export default {
  name: "StudentSafety",
  data() {
    return {
      info: {},
      dialogFormVisible: false,
      form: {
        password: '',
        nowPassword: '',
        ReNowPassword: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getInfo() {
      this.info = JSON.parse(localStorage.getItem('info'));
    },
    updateStudentPassword() {
      if (this.form.password.trim() === '') {
        this.$notify.error("原密码不能为空");
        return;
      }
      if (this.form.nowPassword.trim() === '' || this.form.ReNowPassword.trim() === '') {
        this.$notify.error("密码不能为空");
        return;
      }
      if (this.form.nowPassword !== this.form.ReNowPassword) {
        this.$notify.error("两次密码输入不相同");
        return;
      }
      if (this.form.password.trim() !== this.info.stPassword) {
        this.$notify.error("初始密码输入不正确");
        return;
      }
      let data = {
        stId: this.info.stId,
        password: this.form.password,
        nowPassword: this.form.nowPassword
      }
      updateStudentPassword(data).then((res) => {
        if (res.message.data.createCode === 1) {
          this.dialogFormVisible = false;
          this.$notify.success("修改成功");
          localStorage.clear();
          this.$router.push("/");
        } else {
          this.$notify.error("修改失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    }
  },
  mounted() {
    this.getInfo();
  }
}
</script>

<style scoped>

</style>
