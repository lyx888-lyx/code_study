<template>
  <div class="all">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>创建的sales数据库中使用insert语句各录入一条记录</span>
        <el-button style="float: right; padding: 3px 0" type="text">返回</el-button>
      </div>
      <el-card shadow="never">
        <div class="title">
          创建的sales数据库中使用insert语句各录入一条记录
        </div>
        <div class="content">
          <el-radio v-model="radio" label="A" class="answer">我是答案A</el-radio>
          <el-radio v-model="radio" label="B" class="answer">我是答案B</el-radio>
          <el-radio v-model="radio" label="C" class="answer">我是答案C</el-radio>
          <el-radio v-model="radio" label="D" class="answer">我是答案D</el-radio>
        </div>
        <div class="bottom clearfix footer">
          <el-button type="primary" class="button">提交</el-button>
        </div>
        <el-card shadow="never" style="margin-top: 120px">
          <div class="title">
            <el-link type="danger" :underline="false">题目解析</el-link>
          </div>
          <div class="content">
            这道题选A
          </div>
        </el-card>
      </el-card>

      <el-card shadow="never" style="margin-top: 20px">
        <div class="title">
          <el-link type="primary" :underline="false" style="margin-bottom: 15px">题目评论</el-link>
        </div>
        <StudentComments />
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
      radio: ''
    }
  }
}
</script>

<style scoped lang="less">
  .all {
    width: 60%;
    margin: 80px auto 0;
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
