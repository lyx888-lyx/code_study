<template>
  <div id="myChart" style="width: 400px;height:400px;"></div>
</template>

<script>
let echarts = require("echarts");
export default {
  name: "StudentEcharts",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1048, name: '已完成题目'},
              {value: 735, name: '未完成题目'},
              {value: 580, name: '提交未通过题目'},
              {value: 484, name: '未开始题目'}
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
  }
}
</script>

<style scoped>
.all {
  min-width: 400px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
