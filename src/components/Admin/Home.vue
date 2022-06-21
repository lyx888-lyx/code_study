<template>
  <div>
    <el-container style="min-height: 650px">
      <Aside/>
      <el-container >

        <el-header style="height: 0"></el-header>

        <el-main style="background-color:#F2F4F5;">
          <Breadcrumb style="margin-bottom: 15px"/>
          <router-view style="min-height: 650px"/>
        </el-main>

        <Footer/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Layout/Aside";
import Footer from "../Student/Layout/Footer";
import Breadcrumb from "../Teacher/Breadcrumb/Index";
export default {
  name: "Home",
  data() {
    return {}
  },
  components: {
    Aside,
    Footer,
    Breadcrumb
  }
}
</script>

<style scoped>

</style>
