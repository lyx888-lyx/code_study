<template>
  <div class="stAll">
    <div class="header">
      <div class="header_left">
        <img src="logo.png" alt="error" height="60" />
      </div>
      <div class="header_right">
        <el-menu default-active="/student/main" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/student/main" :route="{path: '/student/main'}">
            <router-link to="/student/main" v-slot="{navigate, href}" custom>
              <div @click="navigate" @keypress.enter="navigate" role="link">学习中心</div>
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/student/main" v-slot="{navigate, href}" custom>
              <div @click="navigate" @keypress.enter="navigate" role="link">我的试卷</div>
            </router-link>
          </el-menu-item>
          <el-menu-item index="3">消息中心</el-menu-item>
          <el-menu-item index="/student/info/data" :route="{path: '/student/info/data'}">
            <router-link to="/student/info/data" v-slot="{navigate, href}" custom>
              <div @click="navigate" @keypress.enter="navigate" role="link">个人中心</div>
            </router-link>
          </el-menu-item>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown" style="z-index: 9999">
              <el-dropdown-item disabled>张三</el-dropdown-item>
              <el-dropdown-item divided>
                <router-link to="/student/info/data" v-slot="{navigate, href}" custom>
                  <div @click="navigate" @keypress.enter="navigate" role="link">个人中心</div>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item >
                <span @click="goOut">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {}
  },
  methods: {
    handleScroll() {
      let stAll = document.querySelector(".header");
      let offsetTop = stAll.offsetTop;
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > stAll.offsetTop && stAll.offsetTop !== 0) {
        stAll.style.position = "fixed";
        stAll.style.zIndex = "999";
        stAll.style.top = "0";
      } else if (scrollTop < offsetTop) {
        stAll.style.top = "";
        stAll.style.position = "";
      }
    },
    handleSelect() {
    },
    goOut() {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/');
        this.$notify.success("退出成功");
      }).catch(() => {
        console.log('取消')
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // window.location.reload();
  }
}
</script>

<style scoped lang="less">
.stAll {
  width: 100%;
  touch-action: pan-y;
  height: 100%;

  .header {
    height: 60px;
    //background-color: #B3C0D1;
    width: 100%;
    background-color: #fff;
    position: fixed;
    z-index: 9999;
    top: 0;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: space-around;

    .header_left {
      display: flex;
      align-items: center;
    }

    .header_right {
      width: 600px;

      .el-menu-demo {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
