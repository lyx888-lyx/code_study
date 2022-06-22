<template>
  <div>
    <el-card class="box-card">
      <el-table
          v-if="pageList.data !== ''"
          :data="pageList.data"
          stripe
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="imText"
            label="消息内容"
            width="400">
        </el-table-column>
        <el-table-column
            align="right">
          <template slot="header" slot-scope="scope">
            <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加消息</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="margin-top: 20px"
          background
          layout="prev, pager, next"
          :current-page="pageList.currentPage"
          :total="pageList.totalPage">
      </el-pagination>
      <el-dialog title="发布消息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="请选择班级" :label-width="formLabelWidth">
            <el-select v-model="value" placeholder="请选择"  >
              <el-option
                  v-for="item in classList"
                  :key="item.clId"
                  :label="item.clName"
                  :value="item.clId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息内容" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入消息内容"
                v-model="form.content" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="yesAddInformation">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {addInformation, getClass, getMessageByTeacherId} from '../../../api/api';
export default {
  name: "Information",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        content: ''
      },
      formLabelWidth: '120px',
      info: {},
      pageList: {},
      classList: [],
      value: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    yesAddInformation() {
      console.log(this.form.content);
      let info = JSON.parse(localStorage.getItem('info'));
      let data = {
        igContent: this.form.content,
        igForId: info.tid,
        igRoleId: info.troleId,
        igFromAll: 2,
        igFromClass: this.value
      }
      addInformation(data).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success(res.message.data.result);
          this.dialogFormVisible = false;
          this.form.content = '';
        } else {
          this.$notify.error(res.message.data.result);
          this.dialogFormVisible = false;
        }
      }).catch((err) => {
        this.$notify.error(err);
        console.log(err);
      });
    },
    getAllMessage() {
      let query = {
        teacherId: this.info.tid,
        roleId: this.info.troleId,
        page: 1,
        count: 100
      }
      getMessageByTeacherId(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result;
          if (result.data.length !== 0) {
            result.data.createTime = result.data.createTime.split("T")[0];
          }
          this.pageList = result;
          // this.classList = res.message.data.result;
        } else {
          this.$notify.error(res.message.data.result);
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
  },
  mounted() {
    this.info = JSON.parse(localStorage.getItem('info'));
    this.getAllMessage();
    this.getAllClass();
  }
}
</script>

<style scoped>

</style>
