<template>
  <div style="margin-top: 0;margin-left: 0;">
    <el-aside :width="AsideWidth + 'px'" style="height: 100%;background-color:#fff;">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
               :background-color="this.$store.state.isBlack ? '#242424':'#fff'"
               :text-color="this.$store.state.isBlack ? '#B3C0D1' : '#242424'" :collapse="isCollapse">
        <el-menu-item index="/adminStudyVue/main/home" :route="{path: '/adminStudyVue/main'}">
          <i class="el-icon-menu"></i>
          <router-link to="/adminStudyVue/main" tag="span" style="display: inline-block;width: 100%">
            控制台
          </router-link>
        </el-menu-item>
        <el-submenu index="/teacher/studentManager">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">班级管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">班级管理</template>
            <el-menu-item index="/teacher/main/classesManager" :route="{path: '/teacher/main/classesManager'}">
              <router-link to="/teacher/main/classesManager" tag="span" style="display: inline-block;width: 100%">班级管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="/teacher/main/studentManager" :route="{path: '/teacher/main/studentManager'}">
              <router-link to="/teacher/main/studentManager" tag="span" style="display: inline-block;width: 100%">学生管理
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/teacher/topicManager">
          <template slot="title">
            <i class="el-icon-reading"></i>
            <span slot="title">试题管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">试题管理</template>
            <el-menu-item index="/teacher/main/topicManager" :route="{path: '/teacher/main/topicManager'}">
              <router-link to="/teacher/main/topicManager" tag="span" style="display: inline-block;width: 100%">题目管理
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/teacher/taskManager">
          <template slot="title">
            <i class="el-icon-suitcase"></i>
            <span slot="title">任务管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">任务管理</template>
            <el-menu-item index="/teacher/main/taskManager" :route="{path: '/teacher/main/taskManager'}">
              <router-link to="/teacher/main/taskManager" tag="span" style="display: inline-block;width: 100%">任务管理
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/teacher/information">
          <template slot="title">
            <i class="el-icon-chat-line-square"></i>
            <span slot="title">消息中心</span>
          </template>
          <el-menu-item-group>
            <template slot="title">消息中心</template>
            <el-menu-item index="/teacher/main/information" :route="{path: '/teacher/main/information'}">
              <router-link to="/teacher/main/information" tag="span" style="display: inline-block;width: 100%">消息管理
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">账号设置</span>
          </template>
          <el-menu-item-group>
            <template slot="title">账号设置</template>
            <el-menu-item index="/teacher/main/setting" :route="{path: '/teacher/main/setting'}">
              <router-link to="/teacher/main/setting" tag="span" style="display: inline-block;width: 100%">个人中心
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="el-menu-vertical-children" style="float: left;font-size: 20px">
        <i class="el-icon-caret-right" v-show="isCollapse" @click="editMenu(false)"></i>
        <i class="el-icon-caret-left" v-show="!isCollapse" @click="editMenu(true)"></i>
      </div>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      isCollapse: true,
      isShow: '',
      AsideWidth: 100
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    editMenu(status) {
      this.isCollapse = status;
      if (this.isCollapse) {
        this.$store.commit("isCollSpan", true);
        this.AsideWidth = 100;
      } else {
        this.$store.commit("isCollSpan", false);
        this.AsideWidth = 240;
      }

    },
    check() {
      if (this.isShow) {
        this.isShow = false;
        localStorage.setItem("theme", false);
      } else {
        this.isShow = true;
        localStorage.setItem("theme", true);
      }
    },
  },
  mounted() {
    this.check()
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  /*overflow: hidden;*/
}

.el-menu {
  height: 100%;
}

.el-menu-vertical-demo {
  float: left;
  position: relative;
}

.el-menu-vertical-children {
  float: left;
  font-size: 25px;
  cursor: pointer;
}

.block {
  background-color: #242424;
  color: #B3C0D1;
  transition: 0.3s ease;
}

.white {
  background-color: #fff !important;
  transition: 0.3s ease;
}
</style>
