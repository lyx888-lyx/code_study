<template>
  <el-header class="teacherHeader" :class="isShow?'bloack':'white'" style="border-bottom: 1px solid #ddd">
    <div class="teacherHeader_left"><img src="logo.png" alt="error" height="60" /></div>
    <div class="teacherHeader_right">
      <div class="right_children">
        <i class="el-icon-bell"></i>
        <!--        <span>文档中心</span>-->
        <span>
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        中文<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="e" divided>中文</el-dropdown-item>
                        <el-dropdown-item command="e" divided>英文</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </span>
        <span @click="check"><i v-if="!isShow" class="el-icon-sunny"></i> <i v-else class="el-icon-moon"></i></span>
        <el-dropdown style="padding-top: 15px">
            <span class="el-dropdown-link">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>张三</el-dropdown-item>
            <el-dropdown-item divided >
              <span @click="goOut">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isShow: ''
    }
  },
  methods: {
    check() {
      if (this.isShow) {
        this.isShow = false;
        localStorage.setItem("theme", false);
        this.$store.commit("check", false)
      } else {
        this.isShow = true;
        localStorage.setItem("theme", true);
        this.$store.commit("check", true)
      }
    },
    handleScroll() {
      let stAll = document.querySelector(".teacherHeader");
      let offsetTop = stAll.offsetTop;
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > stAll.offsetTop && stAll.offsetTop !== 0) {
        stAll.style.position = "fixed";
        stAll.style.zIndex = "99";
        stAll.style.top = "0";
      } else if (scrollTop < offsetTop) {
        stAll.style.top = "";
        stAll.style.position = "";
      }
    },
    goOut() {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/');
        this.$notify.success("退出成功");
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
.teacherHeader {
  background-color: #fff;
  position: relative !important;
  width: 100% !important;
  display: flex;
  align-items: center;

  .teacherHeader_left {
    line-height: 30px;
    position: absolute !important;
    left: 0 !important;
    width: 13% !important;
    margin-left: 20px;
    //background-color: red !important;
  }

  .teacherHeader_right {
    position: absolute;
    right: 0;
    width: 400px;
    //background-color: blueviolet;

    .right_children {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-container {
  touch-action: pan-y;
}

.el-aside {
  color: #333;
}

.title {
  margin-bottom: 20px;
}

.btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  margin: 0 auto;
}

.bloack {
  background-color: #242424;
  color: #B3C0D1;
  transition: 0.3s ease;
}

.white {
  background-color: #fff !important;
  transition: 0.3s ease;
}
</style>
