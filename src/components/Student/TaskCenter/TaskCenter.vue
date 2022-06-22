<template>
  <div class="taskCenter">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>我的任务</span>
      </div>

      <el-timeline>
        <el-timeline-item v-if="taskList.length!==0" @click.native="goTask(item.tkId, item.tkTopicId)" v-for="item in taskList" :key="item.tkId" class="task" :timestamp="item.createTime" placement="top" >
          <el-card  class="card" >
            <h4>{{item.topicName}}</h4>
            <p>
              <el-tag effect="plain" type="danger">{{item.createTime}}</el-tag>
            </p>
          </el-card>
        </el-timeline-item>
        <div v-if="taskList.length === 0">
          <el-empty description="暂时没有任务哦" style="min-height: 450px"></el-empty>
        </div>

        <el-pagination
            style="margin-top: 5px;text-align: center"
            v-if="taskList.length !== 0"
            layout="prev, pager, next"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-count="totalCount">
        </el-pagination>
      </el-timeline>

    </el-card>
  </div>
</template>

<script>
import { getAllTask, getOneTask } from '../../../api/api';
export default {
  name: "TaskCenter",
  data() {
    return {
      taskList: [],
      info: {},
      currentPage: 1,
      tpId: '',
      task: {},
      totalCount: 0,
      totalPage: 1
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    goTask(id, tpId) {
      let query = {
        taskId: id
      }
      this.tpId = tpId;
      let that = this;
      getOneTask(query).then((res) => {
        if (res.message.data.createCode === 1) {
          console.log(res.message.data);
          this.task = res.message.data.task;
          let type = res.message.data.topic.tpType;
          if (type === 1) {
            type = '单选';
          } else if (type === 2) {
            type = '多选';
          } else if (type === 3) {
            type = '判断';
          } else if (type === 5) {
            type = '大题';
          } else if (type === 6) {
            type = '论述'
          }
          this.$router.push({
            path: "/student/topic",
            query: {
              taskId: that.task.tkId,
              type: type,
              tpId: tpId,
              name: 'noFree'
            }
          });
        }
      })

    },
    getAllTaskList() {
      let query = {
        studentId: this.info.stId,
        page: this.currentPage,
        count: 5
      }
      getAllTask(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result.data;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              result[i].createTime = result[i].createTime.split("T")[0];
            }
          }
          this.taskList = result;
          this.currentPage = res.message.data.result.currentPage;
          this.totalCount = res.message.data.result.totalCount;
          this.totalPage = res.message.data.result.totalPage;
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllTaskList();
    },
  },
  mounted() {
    this.info = JSON.parse(localStorage.getItem('info'));
    this.getAllTaskList();
  }
}
</script>

<style lang="less" scoped>
  .taskCenter {
    width: 70%;
    margin: 60px auto 15px auto;
    padding-top: 40px;
  }

  .task {
    display: block;
    cursor: pointer;

    .card {
      &:hover {
        color: #409EFF;
      }
    }

  }
</style>
