<template>
  <div>
    <PanelCards />
    <Echarts />
  </div>
</template>

<script>
import PanelCards from "../PanelGroup/PanelCards";
import Echarts from "../Echarts/Echarts";
export default {
  name: "TeacherMain",
  components: {Echarts, PanelCards},
  methods: {
    completeInfo() {
      let info = JSON.parse(localStorage.getItem('info'));
      if (info.tpictureId == null || info.tgender == null) {
        this.$alert('信息不完善，请先去完善信息', '标题名称', {
          showClose: false,
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/teacher/main/setting');
          }
        });
      }
    }
  },
  mounted() {
    this.completeInfo();
  }
}
</script>

<style scoped>

</style>
