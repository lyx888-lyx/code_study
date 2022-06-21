<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>题目列表</span>
        <el-button style="float: right;" size="mini" type="primary" @click="dialogFormVisible = true">添加题目</el-button>
      </div>
      <el-table
          :data="topicList"
          stripe
          style="width: 100%">
        <el-table-column
            prop="createTime"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="tpName"
            label="题目名称"
            width="460">
        </el-table-column>
        <el-table-column
            prop="tpType"
            label="类型"
            width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tagType">{{scope.row.tpType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="300">
          <template slot-scope="scope">
            <el-button @click="lookHandleClick(scope.row)" type="info" size="mini">查看</el-button>
<!--            <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>-->
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加题目" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="题目名称" :label-width="formLabelWidth" style="width: 70%">
            <el-input v-model="form.topicName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="题目内容" :label-width="formLabelWidth" style="width: 70%">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.topicText">
            </el-input>
          </el-form-item>
          <el-form-item label="题目类型" :label-width="formLabelWidth" style="width: 70%">
            <el-select v-model="form.type" placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type === '1'" label="单选题目选项" :label-width="formLabelWidth" style="width: 70%">
            <el-input v-model="form.topicNameA" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项A</template>
            </el-input>
            <el-input v-model="form.topicNameB" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项B</template>
            </el-input>
            <el-input v-model="form.topicNameC" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项C</template>
            </el-input>
            <el-input v-model="form.topicNameD" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项D</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="form.type === '2'" label="多选题目选项" :label-width="formLabelWidth" style="width: 70%">
            <el-input v-model="form.topicNameA" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项A</template>
            </el-input>
            <el-input v-model="form.topicNameB" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项B</template>
            </el-input>
            <el-input v-model="form.topicNameC" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项C</template>
            </el-input>
            <el-input v-model="form.topicNameD" autocomplete="off" style="margin: 10px 0">
              <template slot="prepend">选项D</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="form.type === '1'" label="题目答案" :label-width="formLabelWidth" style="width: 70%">
            <el-select v-model="form.oneAnswer" placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in oneOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type === '2'" label="题目答案" :label-width="formLabelWidth" style="width: 70%">
            <el-select v-model="numsValue" multiple placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in oneOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type === '3'" label="题目答案" :label-width="formLabelWidth" style="width: 70%">
            <el-select v-model="numsTf" placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in TfOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.type === '5'" label="题目链接" :label-width="formLabelWidth" style="width: 70%">
            <el-input placeholder="请输入大题链接" v-model="form.linkResource">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="form.type === '6'" label="题目答案" :label-width="formLabelWidth" style="width: 70%">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="form.bigTopic">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="yesAddTopicNoPicture">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="题目选项" :visible.sync="dialogLookVisible">
        <el-form style="width: 70%" disabled v-if="topic.tpType === 1 || topic.tpType === 2">
          <el-form-item label="题目内容" :label-width="formLabelWidth">
            <el-input v-model="topic.tpText" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="tpOption[0]" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="tpOption[1]" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="tpOption[2]" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="tpOption[3]" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-form style="width: 70%" disabled v-else-if="topic.tpType === 3">
          <el-form-item label="题目内容" :label-width="formLabelWidth">
            <el-input v-model="topic.tpText" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="tpOption[0]" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-input v-model="tpOption[1]" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-form style="width: 100%" disabled v-else-if="topic.tpType === 5">
          <el-form-item label="题目内容" :label-width="formLabelWidth">
            <el-input v-model="topic.tpText" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="题目链接" :label-width="formLabelWidth">
            <el-input v-model="topic.tpOption" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-form style="width: 70%" disabled v-else-if="topic.tpType === 6">
          <el-form-item label="题目内容" :label-width="formLabelWidth">
            <el-input v-model="topic.tpText" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogLookVisible = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="dialogLookVisible = false">确 定</el-button>-->
<!--        </div>-->
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { addTopicNoPicture, getAllTopic, getTopic } from '../../../api/api';
export default {
  name: "TopicManager",
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
      dialogFormVisible: false,
      form: {
        topicName: '',
        topicText: '',
        topicNameA: '',
        topicNameB: '',
        topicNameC: '',
        topicNameD: '',
        oneAnswer: '',
        date2: '',
        delivery: false,
        type: '',
        resource: '',
        desc: '',
        bigTopic: '',
        linkResource: ''
      },
      formLabelWidth: '120px',
      options: [{
        value: '1',
        label: '单选题'
      }, {
        value: '2',
        label: '多选题'
      }, {
        value: '3',
        label: '判断题'
      }, {
        value: '5',
        label: '大题'
      }, {
        value: '6',
        label: '论述题'
      }],
      oneOption: [{
        value: 'A',
        label: 'A'
      }, {
        value: 'B',
        label: 'B'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'D',
        label: 'D'
      }],
      TfOption: [
        {
          value: '正确',
          label: '正确'
        },
        {
          value: '错误',
          label: '错误'
        }
      ],
      numsValue: [],
      numsTf: '',
      topicList: [],
      dialogLookVisible: false,
      topic: {},
      tpOption: []
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    lookHandleClick(row) {
      this.dialogLookVisible = true;
      let query = {
        topicId: row.tpId
      }
      getTopic(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result;
          this.tpOption = result.tpOption.split("/")
          console.log(this.tpOption);
          this.topic = res.message.data.result;
        } else {
          this.$notify.error("获取题目列表失败");
        }
        console.log(this.topic);
      }).catch((err) => {
        this.$notify.error(err);
      })
      // console.log(row);
    },
    yesAddTopicNoPicture() {
      let info = JSON.parse(localStorage.getItem('info'));
      let formData = new FormData();
      formData.append("topicName", this.form.topicName);
      formData.append("type", this.form.type);
      formData.append("topicText", this.form.topicText);
      if (this.form.type === '1' || this.form.type === '2') {
        formData.append("option", "A " + this.form.topicNameA + "/" + "B " +this.form.topicNameB + "/" + "C " +this.form.topicNameC + "/" + "D " +this.form.topicNameD);
      } else if (this.form.type === '3') {
        formData.append("option", "正确/错误")
      } else if (this.form.type === '5') {
        formData.append("option", this.form.linkResource);
      } else if (this.form.type === '6') {
        formData.append("option", "0");
      }
      if (this.form.type === '1') {
        formData.append("answer", this.form.oneAnswer);
      } else if (this.form.type === '2') {
        let letAnswer = "";
        for (let i in this.numsValue) {
          if (this.numsValue.hasOwnProperty(i)) {
            letAnswer += this.numsValue[i] + "/";
            let position = letAnswer.lastIndexOf("/")
            let j = letAnswer.substring(position, letAnswer.length);
            letAnswer.replace(j, "");
          }
        }
        formData.append("answer", letAnswer);
      } else if (this.form.type === '3') {
        formData.append("answer", this.numsTf);
      } else if (this.form.type === '5') {
        formData.append("answer", this.form.linkResource);
      } else if (this.form.type === '6') {
        formData.append("answer", this.form.bigTopic);
      }
      formData.append("hyperlinkId", '0');
      formData.append("teacherId", info.tid);
      addTopicNoPicture(formData).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success(res.message.data.result);
          this.dialogFormVisible = false;
        } else {
          this.$notify.error(res.message.data.result);
        }
      }).catch((err) => {
        this.$notify.error(err);
        console.log(err);
      })
    },
    restForm() {
      let form = {
        topicName: '',
        topicText: '',
        topicNameA: '',
        topicNameB: '',
        topicNameC: '',
        topicNameD: '',
        oneAnswer: '',
        date2: '',
        delivery: false,
        type: '',
        resource: '',
        desc: ''
      }
      this.numsTf = '';
      this.numsValue = '';
    },
    getAllTopicList() {
      getAllTopic().then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              result[i].createTime = result[i].createTime.split("T")[0]
              if (result[i].tpType === 1) {
                result[i].tpType = '单选';
                result[i].tagType = 'info';
              } else if (result[i].tpType === 2) {
                result[i].tpType = '多选';
                result[i].tagType = 'primary';
              } else if (result[i].tpType === 3) {
                result[i].tpType = '判断';
                result[i].tagType = 'warning';
              } else if (result[i].tpType === 5) {
                result[i].tpType = '大题';
                result[i].tagType = 'danger';
              } else if (result[i].tpType === 6) {
                result[i].tpType = '论述';
                result[i].tagType = 'danger';
              }
            }
          }
          this.topicList = result;
          // console.log(this.topicList);
        } else {
          this.$notify.error("获取题目信息失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    }
  },
  mounted() {
    this.getAllTopicList();
  }
}
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  //margin-right: 0;
  //margin-bottom: 0;
  margin: 0 auto;
  width: 100%;
}
</style>
