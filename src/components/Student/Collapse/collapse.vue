<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>我的消息</span>
    </div>
    <div v-if="messageList.length !== 0">
      <div v-for="item in messageList" :key="messageList.imId" class="message" @click="goCheckMessage(item.imId)">
        <el-badge :is-dot="item.isCheck!==1">
          {{ item.imText }}
        </el-badge>
      </div>
    </div>
    <div v-if="messageList.length === 0" style="height: 150px;padding: 0">
      <el-empty :image-size="100" style="padding-top: 15px;" description="暂时没有通知"></el-empty>
    </div>
    <el-pagination
        style="margin-top: 5px"
        v-if="messageList.length !== 0"
        layout="prev, pager, next"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="4"
        :total="totalCount">
    </el-pagination>
  </el-card>
</template>

<script>
import {getMessageByStudentId, checkMessage} from '../../../api/api';

export default {
  name: "collapse",
  data() {
    return {
      currentPage: 1,
      visible: false,
      count: 4,
      totalCount: 1,
      messageList: []
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllMessages();
    },
    getAllMessages() {
      let info = JSON.parse(localStorage.getItem('info'));
      let query = {
        studentId: info.stId,
        roleId: info.stRoleId,
        page: this.currentPage,
        count: 4
      }
      getMessageByStudentId(query).then((res) => {
        if (res.message.data.createCode === 1) {
          let result = res.message.data.result.data;
          for (let i in result) {
            if (result.hasOwnProperty(i)) {
              result[i].isVisible = false;
            }
          }
          this.messageList = result;
          this.currentPage = res.message.data.result.currentPage;
          this.totalCount = res.message.data.result.totalCount;
          // console.log(this.messageList);
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    checkMessage(id) {
      let query = {
        messageId: id
      }
      checkMessage(query).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success("查收成功");
          this.getAllMessages();
        } else {
          this.$notify.error("查收失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    goCheckMessage(msId) {
      this.$router.push({
        path: '/student/myMessage',
        query: {
          'msId': msId
        }
      });
    }
  },
  mounted() {
    this.getAllMessages();
  }
}
</script>

<style lang="less" scoped>
.box-card {
  max-height: 300px;
  width: 48%;

  .message {
    height: 40px;
    border-bottom: 1px solid #DDD;
    line-height: 40px;
    cursor: pointer;

    &:hover {
      background-color: #f8f8f8;
      color: #000;
      transition: all ease-in-out .3s;
    }
  }
}

.text {
  border-bottom: 1px solid #DDD;
  margin: 0 0 15px 0;
  cursor: pointer;
  display: block;
  padding: 2px;

  &:hover {
    background-color: #F6F8F8;
    transition: all ease-in-out .3s;
  }
}
</style>
