<template>
  <div class="all">
    <el-card v-if="classList.length !== 0" class="box-card" v-for="item in classList" :key="item.clId">
      <div slot="header" class="clearfix">
        <span>{{item.clName}}</span>
      </div>
      <div class="main" >
        <div class="left_image">
          <el-image style="width: 200px;height: 150px" :src="item.clPicturePath"></el-image>
        </div>
        <div class="right_content">
          <div class="className">班级名称：{{item.clName}}</div>
          <div class="classIntroduce">班级介绍：{{item.clIntroduce}}</div>
          <div class="classStatus">班级状态：{{item.clStatus}}</div>
          <div class="classTime">
            <el-tag effect="plain" type="danger">
              开课时间：{{item.clCreateTime}} 结束时间：{{item.clEndTime}}
            </el-tag>
          </div>
        </div>
      </div>
    </el-card>
    <el-card v-if="classList.length === 0" style="width: 70%; margin: 0 auto" shadow="hover">
      <el-empty  description="暂时没有加入班级哦"></el-empty>
    </el-card>

  </div>
</template>

<script>
import { getClassByStudentId } from '../../../api/api';
export default {
  name: "MyClass",
  data() {
    return {
      classList: []
    }
  },
  methods: {
    getClass() {
      let info = JSON.parse(localStorage.getItem('info'));
      let query = {
        studentId: info.stId
      };
      getClassByStudentId(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              result[i].clCreateTime = result[i].clCreateTime.split("T")[0];
              result[i].clEndTime = result[i].clEndTime.split("T")[0];
              result[i].clPicturePath = this.$baseImgUrl + result[i].clPicturePath;
            }
          }
          this.classList = result;
        } else {
          this.$notify.error("暂无加入班级");
        }
        console.log(this.classList);
      }).catch((err) => {
        this.$notify.error(err);
      })
    }
  },
  mounted() {
    this.getClass();
  }
}
</script>

<style lang="less" scoped>
  .all {
    width: 100%;
    height: 100%;
    background-color: #F0F2F3;
    box-sizing: border-box;
    margin-top: 80px;
    min-height: 600px;
    padding: 15px 40px;

    .box-card {
      width: 70%;
      margin: 15px auto;
      padding-bottom: 15px;
      height: 100%;
      min-height: 250px;

      .main {
        height: 100%;

        .left_image {
          float: left;
        }

        .right_content {
          line-height: 40px;
          margin-left: 20px;
          position: relative;
          color: #999999;
          left: 20px;

          .classTime {
            position: absolute;
            bottom: -50px;
            right: 15px;
          }
        }
      }
    }
  }
</style>
