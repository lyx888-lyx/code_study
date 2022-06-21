<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in carousel" :key="item.id">
      <img :src="item.url" alt="null">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      carousel: [
          {
            id: '1',
            url: 'https://picsum.photos/id/0/500/300'
          },
          {
            id: '2',
            url: 'https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822__340.jpg'
          },
          {
            id: '3',
            url: 'https://picsum.photos/id/1/500/300'
          }
      ]
    }
  }
}
</script>

<style scoped>
.el-carousel {
  width: 48%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
