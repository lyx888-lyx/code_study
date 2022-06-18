<template>
  <div class="mainAll">
    <div style="display: flex;justify-content: space-between;width: 67%;margin: 20px auto;">
      <Carousel/>
      <Collapse />
    </div>

    <div class="content">
      <div class="main_title">
        <div class="main_title_left"></div>
        习题中心
      </div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%;z-index: 998">
        <el-table-column
            prop="name"
            label="任务名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="date"
            label="开始时间"
            width="280">
        </el-table-column>
        <el-table-column
            prop="date"
            label="截止时间"
            width="280">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="goTask(scope.$index, tableData)"
                type="primary"
                size="small">
              去完成
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Carousel from "../Carousel/carousel";
import Collapse from '../Collapse/collapse';
export default {
  name: "Main",
  components: {
    Carousel,
    Collapse
  },
  data() {
    return {
      activeIndex: '1',
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
      }]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goTask(index, data) {
      this.$router.push({
        path: '/student/task/'
      });
    }
  }
}
</script>

<style scoped lang="less">
.mainAll {
  min-height: 100%;
  width: 100%;
  touch-action: pan-y;
  background-color: #f6f8f8;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 0 !important;
  margin-right: 0 !important;
  margin-top: 50px;
  //height: 100%;

  .header {
    height: 60px;
    //background-color: #B3C0D1;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: space-around;

    .header_left {
      display: flex;
      align-items: center;
    }

    .header_right {
      width: 600px;

      .el-menu-demo {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .main {
    width: 65%;
    min-height: 300px;
    margin: 20px auto;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ebebeb;
    //background-color: red;

    .main_title {
      display: flex;
      align-items: center;
      width: 150px;
      //background-color: blue;
      height: 50px;

      .main_title_left {
        float: left;
        padding-right: 15px;

        &:before {
          content: " ";
          display: inline-block;
          background-color: #3953C6;
          width: 10px;
          height: 40px;
        }
      }
    }

    .homework {
      //padding: 10px;
      margin-top: 5px;
      display: flex;
      justify-content: space-around;
      color: #303133;
    }
  }

  .content {
    width: 65%;
    min-height: 300px;
    margin: 20px auto;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ebebeb;
    z-index: 9998;
    //background-color: red;

    .main_title {
      display: flex;
      align-items: center;
      width: 150px;
      //background-color: blue;
      height: 50px;

      .main_title_left {
        float: left;
        padding-right: 15px;

        &:before {
          content: " ";
          display: inline-block;
          background-color: #D35AAB;
          width: 10px;
          height: 40px;
        }
      }
    }

    .homework {
      margin-top: 15px;
      display: flex;
      align-items: center;
    }
  }

  .paper {
    width: 65%;
    min-height: 300px;
    margin: 20px auto;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ebebeb;
    //background-color: red;

    .main_title {
      display: flex;
      align-items: center;
      width: 150px;
      //background-color: blue;
      height: 50px;

      .main_title_left {
        float: left;
        padding-right: 15px;

        &:before {
          content: " ";
          display: inline-block;
          background-color: #DBCF47;
          width: 10px;
          height: 40px;
        }
      }
    }

    .homework {
      margin-top: 15px;
    }
  }

  .my {
  }
}

.el-divider {
  margin: 15px;
}
</style>
