<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="less">
#app, html, body {
  background-color: #f5f5f5;
  width: 100%;
  margin: 0;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.v-enter-active, .v-leave-active {
  transition: all 0.2s ease;
}
</style>
