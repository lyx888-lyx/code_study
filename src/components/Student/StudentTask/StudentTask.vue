<template>
  <div class="all">
    <el-card class="box-card">
      <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
        width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type === '单选' || scope.row.type === '多选' ? '' : 'info'">{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="题目"
            width="400">
        </el-table-column>
        <el-table-column
            prop="address"
            label="通过率"
            width="150"
            sortable>
        </el-table-column>
        <el-table-column
            prop="name"
            label="难度"
            sortable
            width="180">
          <template slot-scope="scope">
            <el-link :type="scope.row.complexityType" :underline="false">{{ scope.row.complexity }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="goTopic(scope.$index, tableData)"
                type="primary"
                size="small">
              去完成
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StudentTask",
  data() {
    return {
      tableData: [{
        type: '单选',
        date: '2016-05-02',
        name: '两数之和',
        address: '50%',
        complexity: '简单'
      }, {
        type: '多选',
        date: '2016-05-04',
        name: 'sales数据库中增加销售表，修改关系图',
        address: '70%',
        complexity: '中等'
      }, {
        type: '判断',
        date: '2016-05-01',
        name: '创建的sales数据库中使用insert语句各录入一条记录',
        address: '30%',
        complexity: '中等'
      }, {
        type: '解答',
        date: '2016-05-03',
        name: 'Stuinfo数据库关系图',
        address: '90%',
        complexity: '困难'
      }]
    }
  },
  methods: {
    editData() {
      let data = this.tableData;
      for (let i in data) {
        if (data.hasOwnProperty(i)) {
          if (data[i].complexity === '简单') {
            data[i].complexityType = 'success';
          } else if (data[i].complexity === '中等') {
            data[i].complexityType = 'warning';
          } else if (data[i].complexity === '困难') {
            data[i].complexityType = 'danger'
          }
        }
      }
      this.tableData = data
    },
    goTopic() {
      this.$router.push('/student/topic')
    }
  },
  mounted() {
    this.editData();
  }
}
</script>

<style scoped lang="less">
  .all {
    width: 80%;
    margin: 80px auto 0;
    background-color: #f6f8f8;
  }
</style>
