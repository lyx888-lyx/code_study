<template>
  <div style="padding-top: 15px">
    <el-descriptions title="个人资料" direction="vertical" :column="4" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">编辑</el-button>
      </template>
      <el-descriptions-item label="姓名" :span="2">{{ st_list.stName }}</el-descriptions-item>
      <el-descriptions-item label="学号" :span="2">
        <el-tag size="small">
          {{st_list.stNumber}}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="性别" :span="2">{{st_list.stGender === '' ? '请完善' : (st_list.stGender == '1' ? '男' : '女')}}</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="2">{{st_list.stPhone}}</el-descriptions-item>
      <el-descriptions-item label="邮箱" :span="2">{{st_list.stMailbox}}</el-descriptions-item>
<!--      <el-descriptions-item label="邮箱" :span="2">{{st_list.stMailbox}}</el-descriptions-item>-->
      <el-descriptions-item label="QQ" :span="2">{{st_list.stQq === null ? '请完善' : st_list.stQq}}</el-descriptions-item>
      <el-descriptions-item label="WX" :span="2">{{st_list.stWx === null ? '请完善' : st_list.stWx}}</el-descriptions-item>
    </el-descriptions>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" >
      <el-form :model="st_list" style="width: 70%">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="st_list.stNumber" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="st_list.stName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="st_list.stAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="st_list.stGender" placeholder="请选择" style="width: 100%" @change="selectGender">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="st_list.stPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="st_list.stMailbox" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-input v-model="st_list.stQq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="WX" :label-width="formLabelWidth">
          <el-input v-model="st_list.stWx" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="YesStUpdateInformation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getStudentInformation, stUpdateInformation} from '../../../api/api';
export default {
  name: "StudentData",
  data() {
    return {
      st_list: {},
      dialogFormVisible: false,
      formLabelWidth: '120px',
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
      fileRaw: {},
      dialogImageUrl: '',
      dialogVisible: false,
      autoUpload: false,
      disabled: false,
    }
  },
  methods: {
    getInfo() {
      let info = JSON.parse(localStorage.getItem('info'));
      let query = {
        studentId: info.stId
      }
      getStudentInformation(query).then((res) => {
        if (res.message.data.createCode === 1) {
          // res.message.data.result.stPicturePath = this.$baseImgUrl + res.message.data.result.stPicturePath;
          localStorage.setItem('info', JSON.stringify(res.message.data.result));
        } else {
          this.$notify.error("获取信息失败")
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
      if (info.stGender === 0) {
        info.stGender = ''
      }
      this.st_list = info;
    },
    handleRemove(file) {
      this.dialogImageUrl = '';
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
    YesStUpdateInformation() {
      let formData = new FormData();
      formData.append("studentId", this.st_list.stId);
      formData.append("name", this.st_list.stName);
      formData.append("studentNum", this.st_list.stNumber);
      formData.append("gender", this.st_list.stGender);
      formData.append("age", this.st_list.stAge);
      formData.append("phone", this.st_list.stPhone);
      formData.append("qq", this.st_list.stQq);
      formData.append("wx", this.st_list.stWx);
      formData.append("mailbox", this.st_list.stMailbox);
      formData.append("introduce", "学生");
      formData.append("headPicture", this.fileRaw);

      stUpdateInformation(formData).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success("修改成功");
          this.dialogFormVisible = false;
          this.st_list.stPicturePath = this.$baseImgUrl + this.st_list.stPicturePath;
          localStorage.setItem('info', JSON.stringify(this.st_list));
          this.getInfo();
          window.location.reload();
        } else {
          this.$notify.error("修改失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    selectGender(e) {
      this.st_list.stGender = e;
    }
  },
  mounted() {
    this.getInfo();
  }
}
</script>

<style scoped>

</style>
