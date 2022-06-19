<template>
  <div>
    <el-card class="box-card">
      <el-descriptions title="个人信息" direction="vertical" :column="4" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="dialogFormVisible = true">编辑</el-button>
        </template>
        <el-descriptions-item label="头像" :span="1">
          <div class="block">
            <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="用户名" :span="1">{{t_info.tname}}</el-descriptions-item>
        <el-descriptions-item label="手机号" :span="2">{{t_info.tphone}}</el-descriptions-item>
        <el-descriptions-item label="年龄" :span="1">{{t_info.tage  === null ? "请完善" : t_info.tage}}</el-descriptions-item>
        <el-descriptions-item label="性别" :span="1">{{t_info.tgender === null ? '请完善' : (t_info.tgender === 1 ? '男' : '女')}}</el-descriptions-item>
        <el-descriptions-item label="邮箱" :span="2">{{t_info.tmailbox}}</el-descriptions-item>
        <el-descriptions-item label="QQ" :span="1">{{t_info.tqq === null ? '请完善' : t_info.tqq}}</el-descriptions-item>
        <el-descriptions-item label="WX" :span="1">{{t_info.twx === null ? '请完善' : t_info.twx}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 70%">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-input v-model="form.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="WX" :label-width="formLabelWidth">
          <el-input v-model="form.wx" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mailbox" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
              action="#"
              list-type="picture-card"
              style="text-align: left"
              :on-change="changeFile"
              :auto-upload="autoUpload">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
        <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="yesUpdateInformation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getInformation, updateInformation} from '../../../api/api';
export default {
  name: "Setting",
  data() {
    return {
      t_info: {},
      dialogFormVisible: false,
      form: {
        name: '',
        gender: '',
        age: '',
        phone: '',
        qq: '',
        wx: '',
        mailbox: '',
        introduce: ''
      },
      formLabelWidth: '120px',
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
      dialogImageUrl: '',
      disabled: false,
      autoUpload: false,
      dialogVisible: false,
    }
  },
  methods: {
    getInfo() {
      this.t_info = JSON.parse(localStorage.getItem('info'));
      this.form.name = this.t_info.tname;
      if (this.t_info.tgender === 1) {
        this.form.gender = '男';
      } else if (this.t_info.tgender === 2) {
        this.form.gender = '女';
      } else {
        this.form.gender = '';
      }
      this.form.age = this.t_info.tage;
      this.form.qq = this.t_info.tqq;
      this.form.wx = this.t_info.twx;
      this.form.introduce = this.t_info.tintroduce;
      this.form.mailbox = this.t_info.tmailbox;
      this.form.phone = this.t_info.tphone;
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    changeFile(file,fileList) {
      this.fileRaw = file.raw
    },
    yesUpdateInformation() {
      let formData = new FormData();
      let { name, gender, age, phone, qq, wx, mailbox, introduce } = this.form;
      formData.append("teacherId", this.t_info.tid);
      formData.append("name", name);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("phone", phone);
      formData.append("qq", qq);
      formData.append("wx", wx);
      formData.append("mailbox", mailbox);
      formData.append("introduce", introduce);
      formData.append("headPicture", this.fileRaw);
      updateInformation(formData).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success("修改成功");
          this.dialogFormVisible = false;
          this.getInformationByTeacher();
        } else {
          this.$notify.error("修改失败");
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    getInformationByTeacher() {
      let query = {
        teacherId: this.t_info.tid
      }
      getInformation(query).then((res) => {
        if (res.message.data.createCode === 1) {
          this.t_info = res.message.data.result;
          localStorage.setItem('info', JSON.stringify(this.t_info));
        }
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
