<template>
  <div>
    <Header/>
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
    <Footer style="margin-top: 15px;"/>
  </div>
</template>

<script>
import Header from "../../components/Student/Layout/Header";
import Footer from "../../components/Student/Layout/Footer";

export default {
  name: "Index",
  components: {Footer, Header}
}
</script>

<style scoped>
.main {
  height: 100%;
}
</style>
