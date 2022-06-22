<template>
  <div class="classAll">
    <div class="addClass" @click="addClassDialog">
      <div>
        <el-button type="success" icon="el-icon-plus" circle class="add"></el-button>
        <div>添加班级</div>
      </div>
    </div>
    <el-card shadow="never" v-for="item in classList" :key="item.clId" :body-style="{ padding: '0px' }" style="max-width: 25%;max-height: 350px;margin: 15px">
      <img style="width: 350px;height: 200px"
           :src="item.clPicturePath"
           class="image" alt="暂无">
      <div style="padding: 14px;">
        <span>{{item.clName}} —— 班级介绍: {{item.clIntroduce}}</span>
        <div class="bottom clearfix">
          <time class="time">
            <el-tag type="danger" effect="plain">班级课程时间: {{ item.clCreateTime }} —— {{item.clEndTime}}</el-tag>
          </time>
          <el-button type="primary" class="button" style="margin-top: 15px;padding: 5px" @click="addStudentId(item.clId)">导入学生信息</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="批量添加学生" :visible.sync="addStudentDialogFormVisible">
      <el-form :model="addStudent" style="text-align: center">
        <div class="block">
          <el-image src="/addStudent.png"></el-image>
        </div>
        <el-upload
            class="upload-demo"
            drag
            action="#"
            :on-change="changeStudentInfoFile"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过1MB</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStudentDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="YesAddStudent">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
        title="添加班级"
        :before-close="handleClose"
        :visible.sync="addClassDialogVisible"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        size="40%"
    >
      <div class="demo-drawer__content" style="text-align: right;width: 90%;">
        <el-form :model="form">
          <el-form-item label="班级名称" :label-width="formLabelWidth">
            <el-input v-model="form.className" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" :label-width="formLabelWidth">
            <div class="block">
              <el-date-picker
                  v-model="form.openTime"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="班级状态" :label-width="formLabelWidth">
            <el-select v-model="form.classStatus" placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级简介" :label-width="formLabelWidth">
            <el-input v-model="form.introduce" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级封面图片" :label-width="formLabelWidth">
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
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="addClass">确认</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {getClass, inputByExcel} from '../../../api/api';

export default {
  name: "ClassesManager",
  data() {
    return {
      currentDate: '计应2002',
      table: false,
      dialog: false,
      loading: false,
      form: {
        className: '',
        openTime: '',
        endTime: '',
        classStatus: '',
        introduce: '',
        headPicture: '',
      },
      options: [{
        value: '未开放',
        label: '未开放'
      }, {
        value: '开放',
        label: '开放'
      }],
      value: '',
      formLabelWidth: '100px',
      timer: null,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      autoUpload: false,
      addClassDialogVisible: false,
      fileRaw: {},
      studentInfo: {},
      classList: [],
      addStudentDialogFormVisible: false,
      addStudent: {
        name: '',
        region: ''
      },
      addStudentIdNum: ''
    }
  },
  methods: {
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
          });
    },
    cancelForm() {
      this.addClassDialogVisible = false;
      this.addClassDialogVisible = false;
      clearTimeout(this.timer);
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
    addClassDialog() {
      this.addClassDialogVisible = true;
    },
    addClass() {
      const info = JSON.parse(localStorage.getItem('info'));
      let formData = new FormData();
      formData.append("className", this.form.className);
      formData.append("classStatus", this.form.classStatus);
      formData.append("teacherId", info.tid);
      formData.append("introduce", this.form.introduce);
      formData.append("headPicture", this.fileRaw);
      formData.append("openTime", this.form.openTime[0] + " 00:00:00");
      formData.append("endTime", this.form.openTime[1] + " 00:00:00");

      this.$axios({
        url: "https://www.katechian.xyz/teacher/createClass",
        data: formData,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        if (res.data.message.register_code === 1 && res.data.message.data.createCode === 1) {
          this.$notify.success(res.data.message.data.result);
          this.restForm();
          this.getAllClass();
        } else {
          this.$notify.error(res.data.message.data.result)
        }
        this.addClassDialogVisible = false;
      }).catch((err) => {
        console.log(err);
      })
    },
    changeFile(file,fileList) {
      this.fileRaw = file.raw
    },
    getAllClass() {
      let info = JSON.parse(localStorage.getItem('info'));
      let query = {
        teacherId: info.tid
      }
      getClass(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              let creTime = result[i].clCreateTime.split("T")[0];
              let endTime = result[i].clEndTime.split("T")[0];
              result[i].clCreateTime = creTime;
              result[i].clEndTime = endTime;
              result[i].clPicturePath = this.$baseImgUrl + result[i].clPicturePath;
            }
          }
          this.classList = result;
        } else {
          this.$notify.error("暂无班级");
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    changeStudentInfoFile(file) {
      this.studentInfo = file.raw;
    },
    YesAddStudent() {
      let formData = new FormData();
      formData.append("classId", this.addStudentIdNum);
      formData.append("studentExcel", this.studentInfo);

      inputByExcel(formData).then((res) => {
        console.log(res);
      })
    },
    addStudentId(id) {
      this.addStudentIdNum = id;
      this.addStudentDialogFormVisible = true;
    },
    restForm() {
      this.form = {
        className: '',
        openTime: '',
        endTime: '',
        classStatus: '',
        introduce: '',
        headPicture: '',
      };
      this.fileRaw = {};
    }
  },
  mounted() {
    this.getAllClass();
  }
}
</script>

<style lang="less" scoped>
.classAll {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .addClass {
    cursor: pointer;
    text-align: center;
    border-radius: 2%;
    margin: 15px;
    width: 350px;
    height: 250px;
    border: 1px solid #85ce61;
    display: flex;
    justify-content: center;
    align-items: center;


    .add {
      font-size: 55px;
      margin-bottom: 15px;
    }
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
}
</style>
