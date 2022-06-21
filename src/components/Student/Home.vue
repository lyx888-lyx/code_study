<template>
  <div>
    <Main />
  </div>
</template>

<script>
import Main from "./Layout/Main";
export default {
  name: "Home",
  components: {
    Main
  },
  methods: {
    getStudentInfo() {
      let info = JSON.parse(localStorage.getItem('info'));
      if (info.stPictureId === null || info.stQq === null || info.stWx === null) {
        this.$alert('信息不完善，请先去完善信息', '完善信息', {
          showClose: false,
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/student/info/data');
          }
        });
      }
    }
  },
  mounted() {
    this.getStudentInfo();
  }
}
</script>

<style lang="less" scoped>
.el-message-box {
  z-index: 99;
}
</style>
