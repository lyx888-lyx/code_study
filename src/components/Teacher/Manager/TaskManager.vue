<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务管理</span>
        <el-button style="float: right;" size="mini" type="primary" @click="createTask">发布任务</el-button>
      </div>
      <el-table
          :data="releaseTaskList"
          stripe
          style="width: 100%">
        <el-table-column
            prop="createTime"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="tgTopicId"
            label="发布题号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="tgShould"
            label="应该完成人数">
        </el-table-column>
        <el-table-column
            prop="tgActual"
            label="实际完成人数">
        </el-table-column>
        <el-table-column
            align="right">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="delHandClick(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          style="margin-top: 15px"
          background
          layout="prev, pager, next"
          :total="1">
      </el-pagination>
    </el-card>
    <el-dialog title="添加任务" :visible.sync="dialogTaskVisible">
      <el-form>
        <el-form-item label="所需完成题目" :label-width="formLabelWidth">
          <el-select v-model="value" multiple placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options"
                :key="item.tpId"
                :label="item.tpName"
                :value="item.tpId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需完成班级" :label-width="formLabelWidth">
          <el-select v-model="classValue" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in classList"
                :key="item.clId"
                :label="item.clName"
                :value="item.clId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务说明" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="taskIntroduce">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="yesAddTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAllTopic, getClass, addTask, getMessageByTeacherId, getReleaseTask} from '../../../api/api';
export default {
  name: "TaskManager",
  data() {
    return {
      tableData: [],
      dialogTaskVisible: false,
      formLabelWidth: '120px',
      value: [],
      classValue: '',
      options: [],
      classList: [],
      taskIntroduce: '',
      info: {},
      releaseTaskList: [],
      currentPage: 1,
      totalCount: 0,
      totalPage: ''
    }
  },
  methods: {
    getAllTopicList() {
      getAllTopic().then((res) => {
        if (res.message.data.createCode === 1) {
          this.options = res.message.data.result;
        } else {
          this.$notify.error("获取题目信息失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    getAllClass() {
      let info = JSON.parse(localStorage.getItem('info'));
      let query = {
        teacherId: info.tid
      }
      getClass(query).then((res) => {
        if (res.message.data.createCode === 1) {
          this.classList = res.message.data.result;
        } else {
          this.$notify.error("获取班级信息失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    createTask() {
      this.dialogTaskVisible = true;
    },
    yesAddTask() {
      let topicId = "";
      for (let i in this.value) {
        if (this.value.hasOwnProperty(i)) {
          topicId = topicId + this.value[i] + "/";
        }
      }
      let data = {
        tgTopicId: topicId,
        tgForId: this.info.tid,
        taskIntroduction: this.taskIntroduce,
        tgFromClass: this.classValue,
      }

      addTask(data).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success("发布成功");
          this.dialogTaskVisible = false;
          // this.classList = res.message.data.result;
        } else {
          this.$notify.error(res.message.data.result);
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    getAllTask() {
      let query = {
        teacherId: this.info.tid,
        page: 1,
        count: 5
      }
      getReleaseTask(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result.data;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              result[i].createTime = result[i].createTime.split("T")[0]
            }
          }
          this.releaseTaskList = result;
          this.currentPage = res.message.data.currentPage;
          this.totalPage = res.message.data.totalPage;
          this.totalCount = res.message.data.totalCount;
          console.log(this.releaseTaskList);
        } else {
          this.$notify.error("获取发布任务列表失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    handleEdit() {},
    delHandClick(index, row) {
      this.$confirm('此操作将执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.releaseTaskList.some((item, i) => {
          if (item.tgId === row.tgId) {
            this.releaseTaskList.splice(i, 1);
            return true;
          }
        })
        this.$notify({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCurrentChange() {},
    handleSizeChange() {}
  },
  mounted() {
    this.info = JSON.parse(localStorage.getItem('info'));
    this.getAllTopicList();
    this.getAllClass();
    this.getAllTask();
  }
}
</script>

<style scoped>

</style>
