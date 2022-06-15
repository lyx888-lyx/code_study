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
  components: {Echarts, PanelCards}
}
</script>

<style scoped>

</style>
