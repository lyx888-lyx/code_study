<template>
  <div class="messageAll">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的消息</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div  class="text item" style="text-indent: 2em">
        {{ messageList.imText }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMessageById, checkMessage } from '../../../api/api';
export default {
  name: "Message",
  data() {
    return {
      messageList: {}
    }
  },
  methods: {
    getAllMessage() {
      let that = this;
      let id = this.$route.query.msId;
      let query = {
        messageId: id
      }
      getMessageById(query).then((res) => {
        if (res.message.data.createCode === 1) {
          that.getCheckMessage();
          let result = res.message.data.result;
          result.createTime = result.createTime.split("T")[0];
          this.messageList = result;
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    },
    getCheckMessage() {
      let query = {
        messageId: this.$route.query.msId
      }
      checkMessage(query).then((res) => {
        if (res.message.data.createCode === 1) {
          this.$notify.success("查收消息成功");
        } else {
          this.$notify.error("查收消息失败");
        }
      }).catch((err) => {
        this.$notify.error(err);
      })
    }
  },
  mounted() {
    this.getAllMessage();
  }
}
</script>

<style lang="less" scoped>
  .messageAll {
    width: 70%;
    margin: 80px auto 0 auto;
    min-height: 570px;
  }
</style>
