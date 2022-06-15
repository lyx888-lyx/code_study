<template>
  <div class="all">
    <div class="main">
      <div class="left">
        <el-avatar shape="square" :size="70"
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-divider/>
        <div class="left_main">

          <router-link to="/student/info/data" class="left_list "
                       :class="['item', $route.meta.index === 0 ? 'active' : '']" tag="div">
            <el-icon class="el-icon-user"/>
<!--            <div @click="navigate" @keypress.enter="navigate" role="link" class="font">个人资料</div>-->
            <span class="font">个人资料</span>
          </router-link>

          <router-link class="left_list" :class="['item', $route.meta.index === 1 ? 'active' : '']"
                       to="/student/info/safety"  tag="div">
            <el-icon class="el-icon-user"/>
<!--            <div @click="navigate" @keypress.enter="navigate" role="link" class="font">个人资料</div>-->
            <span class="font">账号安全</span>
          </router-link>
        </div>
      </div>
      <div class="center">
        <router-view/>
      </div>
      <div class="right">
        <Echarts/>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from './StudentEcharts';
export default {
  name: "StudentInfo",
  components: {
    Echarts
  }
}
</script>

<style scoped lang="less">
.all {
  width: 100%;
  height: 100%;
  background-color: #F0F2F3;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 50px;

  .main {
    width: 85%;
    min-height: 500px;
    background-color: #fff !important;
    min-width: 1050px;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    .left {
      min-width: 200px;
      padding: 10px;
      flex: 1;
      text-align: center;
      //background-color: red;

      .left_main {

        .left_list {
          width: 100%;
          font-size: 15px;
          margin: 10px 0;
          height: 40px;
          line-height: 40px;
          cursor: pointer;

          .font {
            margin-left: 15px;
          }


          &:hover {
            background-color: #edeef0;
            transition: all 0.3s ease-in-out;
          }
        }

        .active {
          color: #0a84ff;
          background-color: #edeef0;
        }

        //text-align: left;
      }
    }

    .center {
      flex: 4;
      min-width: 450px;

      .center_card {
        height: 500px;
      }

      //background-color: blue;
    }

    .right {
      flex: 3;
      display: flex;
      align-items: center;
      text-align: center;
      //min-width: 500px;
      min-height: 400px;
      //background-color: #fff;
      //min-width: 400px
      //background-color: #1b334d;
    }
  }
}
</style>
