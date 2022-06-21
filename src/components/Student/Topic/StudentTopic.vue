<template>
  <div class="all">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ topic.tpName }}</span>
        <el-button style="float: right; " size="mini" type="primary" @click="back">返回</el-button>
      </div>
      <el-card shadow="never">
        <div class="title">
          {{ topic.name }}
        </div>
        <div class="desc">
          {{ topic.tpText }}
        </div>
        <div class="content" v-if="type === '单选'">
          <el-radio v-model="radio" label="A" class="answer">{{ options[0] }}</el-radio>
          <el-radio v-model="radio" label="B" class="answer">{{ options[1] }}</el-radio>
          <el-radio v-model="radio" label="C" class="answer">{{ options[2] }}</el-radio>
          <el-radio v-model="radio" label="D" class="answer">{{ options[3] }}</el-radio>
        </div>
        <div class="content" v-else-if="type === '多选'">
          <el-checkbox-group v-model="checkList" ref="answerLater" :disabled="answerLater">
            <el-checkbox label="A" class="answer">{{ options[0] }}</el-checkbox>
            <el-checkbox label="B" class="answer">{{ options[1] }}</el-checkbox>
            <el-checkbox label="C" class="answer">{{ options[2] }}</el-checkbox>
            <el-checkbox label="D" class="answer">{{ options[3] }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="content" v-else-if="type === '判断'">
          <el-radio v-model="judge" label="正确" class="answer">{{ options[0] }}</el-radio>
          <el-radio v-model="judge" label="错误" class="answer">{{ options[1] }}</el-radio>
        </div>
        <div class="content" v-else-if="type === '论述'">
          <mavon-editor v-model="body" ref="md" />
        </div>
        <div class="content" v-else-if="type === '大题'">
          <el-link type="primary" :href="linkPath">{{ linkPath }}<i class="el-icon-view el-icon--right"></i></el-link>
          <el-upload
              ref="upload"
              action="#"
              :limit="1"
              list-type="picture-card"
              style="text-align: center;margin-top: 25px"
              :on-change="changeFile"
              :before-upload="beforeUpload"
              accept=".jpeg"
              :auto-upload="autoUpload">
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
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
        </div>
        <div class="bottom clearfix footer">
          <el-button type="primary" class="button" @click="submitAnswer">提交</el-button>
        </div>
        <el-card shadow="never" v-show="parsing" style="margin-top: 120px">
          <div class="title">
            <el-link type="danger" :underline="false">题目答案</el-link>
          </div>
          <div class="content">
            {{ tpAnswer }}
          </div>
        </el-card>
      </el-card>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <el-card shadow="never" style="margin-top: 20px" v-show="isComment">
        <div class="title">
          <el-link type="primary" :underline="false" style="margin-bottom: 15px">题目评论</el-link>
        </div>
        <StudentComments/>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import StudentComments from "../StudentComment/StudentComments";
import {getTopic, makeQuestionNoPicture, makeQuestionWithPicture, getOneTask} from '../../../api/api';

export default {
  name: "StudentTopic",
  components: {StudentComments},
  data() {
    return {
      radio: '',
      judge: '',
      type: '',
      parsing: false,
      isComment: false,
      autoUpload: false,
      checkList: [],
      subject: {},
      tid: '',
      topic: {},
      options: [],
      info: {},
      answerLater: false,
      tpAnswer: '',
      linkPath: '',
      linkName: '',
      topicPic: {},
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      body: '',
      taskId: ''
    }
  },
  methods: {
    submitAnswer() {
      if (this.type === '单选') {
        console.log(this.radio);
        this.parsing = true;
        this.isComment = true;
      } else if (this.type === '多选') {
        let formData = new FormData();
        formData.append("studentId", this.info.stId);
        formData.append("topicId", this.tid);
        let answer = "";
        for (let i in this.checkList) {
          if (this.checkList.hasOwnProperty(i)) {
            answer = answer + this.checkList[i] + "/";
          }
        }
        formData.append("answer", answer);
        if (this.checkList.length !== 0) {
          makeQuestionNoPicture(formData).then((res) => {
            if (res.message.data.createCode === 1) {
              this.answerLater = true;
              this.tpAnswer = res.message.data.topic.tpAnswer;
              this.$notify.success("回答成功");
              // console.log(this.checkList);
              this.parsing = true;
              this.isComment = true;
            } else {
              this.$notify.error("回答失败");
            }
          }).catch((err) => {
            this.$notify.error(err);
          })
        } else {
          this.$notify.error("请选择选项");
        }
      } else if (this.type === '判断') {
        console.log(this.judge);
        this.parsing = true;
        this.isComment = true;
      } else if (this.type === '大题') {
        let formData = new FormData();
        formData.append("studentId", this.info.stId);
        formData.append("topicId", this.tid);
        formData.append("answerPicture", this.topicPic);

        makeQuestionWithPicture(formData).then((res) => {
          if (res.message.data.createCode === 1) {
            this.$notify.success("上传成功");
          } else {
            this.$notify.error("上传失败");
          }
        }).catch((err) => {
          this.$notify.error(err);
        })
      } else if (this.type === '论述') {
        let formData = new FormData();
        formData.append("studentId", this.info.stId);
        formData.append("topicId", this.tid);
        formData.append("answer", this.body);

        makeQuestionNoPicture(formData).then((res) => {
          if (res.message.data.createCode === 1) {
            this.$notify.success("答题成功");
          } else {
            this.$notify.error("上传失败");
          }
        }).catch((err) => {
          this.$notify.error(err);
        })
      }
    },
    back() {
      this.$router.push("/student/main")
    },
    getTopicDetails() {
      let query = {
        topicId: this.tid
      }
      getTopic(query).then((res) => {
        if (res.message.data.createCode === 1) {
          this.topic = res.message.data.result;
        }
        console.log(this.topic);
        if (this.type === '多选') {
          let option = this.topic.tpOption.split("/")
          for (let i in option) {
            if (option.hasOwnProperty(i)) {
              let sel = option[i].split(" ");
              this.options.push(sel[1]);
              // console.log(this.options);
            }
          }
          // console.log(option);
        } else if (this.type === '单选') {
          let option = this.topic.tpOption.split("/");
          for (let i in option) {
            if (option.hasOwnProperty(i)) {
              this.options.push(option[i]);
            }
          }
        } else if (this.type === '判断') {
          let option = this.topic.tpOption.split("/");
          for (let i in option) {
            if (option.hasOwnProperty(i)) {
              this.options.push(option[i]);
            }
          }
        } else if (this.type === '大题') {
          this.linkPath = this.topic.tpOption;
          this.linkName = this.topic.tpText
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    getTaskOne() {
      let query = {

      }
      getOneTask()
    },
    changeFile(file) {
      this.topicPic = file.raw;
      let imgSize = Number(file.size / 1024 / 1024);

      if (imgSize > 1) {
        this.$msgbox({
          title: "",
          message: "文件大小不能超过1MB，请重新上传。",
          type: "warning",
        });
        this.handleRemove(this.topicPic);
      }

    },
    handleRemove(file) {
      console.log(file)
      //使用indexOf把点击的图片的索引位置找出来删掉
      let arr = this.$refs.upload.uploadFiles
      let index = arr.indexOf(file)
      console.log(index);
      arr.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

      const whiteList = ["jpg", "jpeg", "png"];

      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error('上传文件只能是 jpg、jpeg、png格式');
        return false;
      }

      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB');
        return false;
      }
    }
  },
  mounted() {
    this.info = JSON.parse(localStorage.getItem('info'));
    this.type = this.$route.query.type;
    if (this.$route.query.id) {
      this.tid = this.$route.query.id;
    } else if (this.$route.query.taskId) {
      this.taskId = this.$route.query.taskId
    }
    this.subject = this.$store.state.subject;
    this.getTopicDetails();
  }
}
</script>

<style scoped lang="less">
.all {
  width: 60%;
  margin: 80px auto 0;
  min-height: 80vh;
}

.clearfix {
  text-align: center;
}

.answer {
  display: block;
  margin: 40px 10px;
}

.content {
  margin-top: 20px;
}

.footer {
  float: right;
  padding-bottom: 15px;
}
</style>
