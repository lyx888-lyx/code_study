<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in lists" :key="item.path">
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      lists: []            //定义一个数组 用于接收路由信息
    }
  },
  created() {
    // console.log(this.$route.matched)
    this.lists = this.$route.matched  //获取路由内的全部信息
  },
  //这里必须使用监听，否则无法实时获取路由变动信息。
  // 监听后路由会实时变动，不然需要手动刷新路径才会改变
  watch: {
    $route(to, from) {
      // console.log(to)
      this.lists = to.matched
    }
  }
}
</script>

<style scoped>

</style>
