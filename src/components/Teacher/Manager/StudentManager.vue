<template>
  <div>
    <el-card class="box-card">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            label="学生姓名"
            prop="stName">
        </el-table-column>
        <el-table-column
            label="学生学号"
            prop="stNumber">
        </el-table-column>
        <el-table-column
            label="性别">
          <template slot-scope="scope">
            {{scope.row.stGender === 0 ? '未填写' : (scope.row.stGender === 1 ? '男' : '女')}}
          </template>
        </el-table-column>
        <el-table-column
            label="年龄">
          <template slot-scope="scope">
            {{scope.row.stAge === null ? '未填写' : scope.row.stAge}}
          </template>
        </el-table-column>
        <el-table-column
            label="学生电话"
            prop="stPhone">
        </el-table-column>
        <el-table-column
            label="学生QQ">
          <template slot-scope="scope">
            {{scope.row.stQq === null ? '未填写' : scope.row.stQq}}
          </template>
        </el-table-column>
        <el-table-column
            label="学生WX">
          <template slot-scope="scope">
            {{scope.row.stWx === null ? '未填写' : scope.row.stWx}}
          </template>
        </el-table-column>
        <el-table-column
            align="right">
          <template slot="header" slot-scope="scope">
            <el-select v-model="className" clearable placeholder="请选择" @change="selectClass">
              <el-option
                  v-for="item in classList"
                  :key="item.clId"
                  :label="item.clName"
                  :value="item.clId">
              </el-option>
            </el-select>
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          style="margin-top: 15px"
          background
          layout="prev, pager, next"
          :total="totalCount">
      </el-pagination>
    </el-card>
    <el-dialog title="修改学生信息" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm" style="width: 70%">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="editForm.stNumber" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="editForm.stName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="editForm.stGender" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="editForm.stAge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号" :label-width="formLabelWidth">
          <el-input v-model="editForm.stPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth">
          <el-input v-model="editForm.stQq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="WX" :label-width="formLabelWidth">
          <el-input v-model="editForm.stWx" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editForm.stMailbox" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getClass, getStudentByClass} from "../../../api/api";

export default {
  name: "StudentManager",
  data() {
    return {
      tableData: [],
      search: '',
      classList: [],
      className: '',
      currentPage: 1,
      totalCount: 1,
      dialogEditFormVisible: false,
      editForm: {
        stId: "",
        stNumber: "",
        stName: "",
        stGender: "",
        stAge: "",
        stPhone: "",
        stQq: "",
        stWx: "",
        stMailbox: "",
      },
      formLabelWidth: '120px',
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogEditFormVisible = true;
      if (parseInt(row.stGender) === 0) {
        row.stGender = '';
      } else if (parseInt(row.stGender) === 1) {
        row.stGender = '男';
      } else if (parseInt(row.stGender) === 2) {
        row.stGender = '女';
      } else {
        row.stGender = '';
      }
      this.editForm = row;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
    selectClass(e) {
      let info = JSON.parse(localStorage.getItem('info'));
      let query = {
        teacherId: info.tid,
        classId: e,
        page: this.currentPage,
        count: 10
      };

      getStudentByClass(query).then((res) => {
        if (res.message.data.createCode === 1) {
          this.tableData = res.message.data.result.data;
          this.totalCount = res.message.data.result.totalCount;
          this.currentPage = res.message.data.result.currentPage;
        } else if (res.message.data.createCode === -1) {
          this.$notify.error("该班级暂无学生信息");
          this.tableData = [];
        }
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
  },
  mounted() {
    this.getAllClass();
  }
}
</script>

<style scoped>

</style>
