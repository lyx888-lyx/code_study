<template>
  <div>
    <el-footer style="background-color:#fff;min-height: 50px;text-align: center;display: flex;justify-content: center;align-items: center">
      <div id="record">
        <a href="https://www.beian.gov.cn/" target="_blank"><img src="ba.png" alt=""><span>晋公网安备 34172102000045号</span></a>
        <span> | 晋ICP备2021016347号-1</span>
      </div>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped lang="less">
#record {
  height: 50px;
  line-height: 50px;
  //width: 600px;
  //background-color: #20a0ff;
  text-align: center;
  position: absolute;

  a {
    text-decoration: none;

    img {
      position: relative;
      left: -2px;
      top: 4px;
    }

    span {
      font-size: 14px;
      color: #a1a1a1;

      &:hover {
        color: #20a0ff;
      }
    }
  }

  span {
    color: #a1a1a1;
    font-size: 14px;
  }
}
</style>
