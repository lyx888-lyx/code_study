<template>
  <div class="all">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{subject.name}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">返回</el-button>
      </div>
      <el-card shadow="never">
        <div class="title">
          {{subject.name}}
        </div>
        <div class="content" v-if="type === '单选'">
          <el-radio v-model="radio" label="A" class="answer">我是答案A</el-radio>
          <el-radio v-model="radio" label="B" class="answer">我是答案B</el-radio>
          <el-radio v-model="radio" label="C" class="answer">我是答案C</el-radio>
          <el-radio v-model="radio" label="D" class="answer">我是答案D</el-radio>
        </div>
        <div class="content" v-else-if="type === '多选'">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="A" class="answer">我是答案A</el-checkbox>
            <el-checkbox label="B" class="answer">我是答案B</el-checkbox>
            <el-checkbox label="C" class="answer">我是答案C</el-checkbox>
            <el-checkbox label="D" class="answer">我是答案D</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="content" v-else-if="type === '判断'">
          <el-radio v-model="judge" label="正确" class="answer">我是正确</el-radio>
          <el-radio v-model="judge" label="错误" class="answer">我是错误</el-radio>
        </div>
        <div class="content" v-else>
          <el-link type="primary">Stuinfo数据库关系图<i class="el-icon-view el-icon--right"></i> </el-link>
          <el-upload
              style="margin: 30px auto;text-align: center"
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div class="bottom clearfix footer">
          <el-button type="primary" class="button" @click="submitAnswer">提交</el-button>
        </div>
        <el-card shadow="never" v-show="parsing" style="margin-top: 120px">
          <div class="title">
            <el-link type="danger" :underline="false">题目解析</el-link>
          </div>
          <div class="content">
            这道题选A
          </div>
        </el-card>
      </el-card>

      <el-card shadow="never" style="margin-top: 20px" v-show="isComment">
        <div class="title">
          <el-link type="primary" :underline="false" style="margin-bottom: 15px">题目评论</el-link>
        </div>
        <StudentComments  />
      </el-card>
    </el-card>
  </div>
</template>

<script>
import StudentComments from "../StudentComment/StudentComments";
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
      checkList: [],
      subject: {}
    }
  },
  methods: {
    submitAnswer() {
      if (this.type === '单选') {
        console.log(this.radio);
        this.parsing = true;
        this.isComment = true;
      } else if (this.type === '多选') {
        console.log(this.checkList);
        this.parsing = true;
        this.isComment = true;
      } else if (this.type === '判断') {
        console.log(this.judge);
        this.parsing = true;
        this.isComment = true;
      }
    }
  },
  mounted() {
    this.type = this.$route.query.type;
    this.subject = this.$store.state.subject;
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
