<template>
  <div>
    <Header />
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from "../../components/Teacher/Layout/Header";
export default {
  name: "Index",
  components: {Header}
}
</script>

<style scoped>

</style>
