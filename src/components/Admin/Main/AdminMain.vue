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
  name: "AdminMain",
  components: {Echarts, PanelCards}
}
</script>

<style scoped>

</style>
