<template>
  <div class="mainAll">
    <div style="display: flex;justify-content: space-between;width: 67%;margin: 20px auto;">
      <Carousel/>
      <Collapse/>
    </div>

    <div class="content">
      <div class="main_title">
        <div class="main_title_left"></div>
        习题中心
      </div>
      <el-table
          :data="topicList"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
            width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tpType === '单选' || scope.row.tpType === '多选' ? '' : 'info'">{{
                scope.row.tpType
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="日期"
            sortable
            width="120">
        </el-table-column>
        <el-table-column
            prop="tpName"
            label="题目"
            width="480">
        </el-table-column>
        <el-table-column
            prop="difficulty"
            label="难度"
            sortable
            width="120">
          <template slot-scope="scope">
            <el-link :type="scope.row.complexityType" :underline="false">{{ scope.row.difficulty }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="goTopic(scope.$index, scope.row)"
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
import {getAllTopic} from '../../../api/api';

export default {
  name: "Main",
  components: {
    Carousel,
    Collapse
  },
  data() {
    return {
      activeIndex: '1',
      topicList: []
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goTask(index, data) {
      this.$router.push({
        path: '/student/task'
      });
    },
    editData() {
      let data = this.topicList;
      for (let i in data) {
        if (data.hasOwnProperty(i)) {
          console.log(data[i]);
          if (data[i].difficulty === '简单') {
            data[i].complexityType = 'success';
          } else if (data[i].difficulty === '中等') {
            data[i].complexityType = 'warning';
          } else if (data[i].difficulty === '困难') {
            data[i].complexityType = 'danger';
          }
        }
      }
      this.topicList = data;
    },
    goTopic(index, data) {
      console.log(data);
      this.$store.commit("addSubject", data);
      this.$router.push({
        path: '/student/topic',
        query: {
          type: data.tpType,
          tpId: data.tpId,
          name: 'free'
        }
      }).catch(_ => {})
    },
    getAllTopicList() {
      getAllTopic().then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              result[i].pass = Math.round(Math.random() * 100);
              if (result[i].pass > 0 && result[i].pass < 30) {
                result[i].difficulty = '困难';
              } else if (result[i].pass >= 30 && result[i].pass < 60) {
                result[i].difficulty = '中等';
              } else {
                result[i].difficulty = '简单';
              }
              result[i].pass = result[i].pass + '%';
              if (result[i].difficulty === '简单') {
                result[i].complexityType = 'success';
              } else if (result[i].difficulty === '中等') {
                result[i].complexityType = 'warning';
              } else if (result[i].difficulty === '困难') {
                result[i].complexityType = 'danger';
              }
              result[i].createTime = result[i].createTime.split("T")[0];
              if (result[i].tpType === 1) {
                result[i].tpType = '单选';
              } else if (result[i].tpType === 2) {
                result[i].tpType = '多选';
              } else if (result[i].tpType === 3) {
                result[i].tpType = '判断';
              } else if (result[i].tpType === 5) {
                result[i].tpType = '大题';
              } else if (result[i].tpType === 6) {
                result[i].tpType = '论述';
              }
            }
          }

          this.topicList = result;
          // console.log(this.topicList);
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    }
  },
  mounted() {
    this.getAllTopicList();
    // this.editData();
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
