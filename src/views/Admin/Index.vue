<template>
  <div>
    <Header/>
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Footer from "../../components/Student/Layout/Footer";
import Header from "../../components/Teacher/Layout/Header";

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
