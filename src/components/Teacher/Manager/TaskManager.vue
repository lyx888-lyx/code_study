<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务管理</span>
        <el-button style="float: right;" size="mini" type="primary" @click="createTask">发布任务</el-button>
      </div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
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
import {getAllTopic, getClass, addTask, getMessageByTeacherId} from '../../../api/api';
export default {
  name: "TaskManager",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogTaskVisible: false,
      formLabelWidth: '120px',
      value: [],
      classValue: '',
      options: [],
      classList: [],
      taskIntroduce: '',
      info: {}
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
    }
  },
  mounted() {
    this.info = JSON.parse(localStorage.getItem('info'));
    this.getAllTopicList();
    this.getAllClass();
  }
}
</script>

<style scoped>

</style>
