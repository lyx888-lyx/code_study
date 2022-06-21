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
import Breadcrumb from './Breadcrumb/Index';
import Aside from "./Layout/Aside";
import Footer from "../Student/Layout/Footer";
export default {
  name: "Home",
  data() {
    return {
      scrollHeight: ''
    }
  },
  methods: {
    getHeight() {
      this.scrollHeight = document.documentElement.scrollHeight;
    }
  },
  components: {
    Breadcrumb,
    Aside,
    Footer
  },
  mounted() {
    this.getHeight();
  }
}
</script>

<style lang="less" scoped>

</style>
