<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="less">
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.v-enter-active, .v-leave-active {
  transition: all 0.2s ease;
}
</style>
