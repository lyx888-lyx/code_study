<template>
  <el-card class="box-card">
    <div id="myChart" style="width: 100%;height:400px;"></div>
  </el-card>
</template>

<script>
let echarts = require("echarts");
let option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
let option2 = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};
let option3 = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        {value: 1048, name: 'Search Engine'},
        {value: 735, name: 'Direct'},
        {value: 580, name: 'Email'},
        {value: 484, name: 'Union Ads'},
        {value: 300, name: 'Video Ads'}
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
let option4 = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }
  ]
};
let myChart;
export default {
  name: "Echarts",
  data() {
    return {
      whichEcharts: '1'
    }
  },
  methods: {
    drawChart1() {
      if (myChart !== null && myChart !== "" && myChart !== undefined) {
        myChart.dispose();
      }
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById("myChart"));
      // 指定图表的配置项和数据
      // 使用刚指定的配置项和数据显示图表。\
      if (this.whichEcharts === '1') {
        myChart.setOption(option);
      } else if (this.whichEcharts === '2') {
        myChart.setOption(option2);
      } else if (this.whichEcharts === '3') {
        myChart.setOption(option3);
      } else if (this.whichEcharts === '4') {
        myChart.setOption(option4);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart1();
    })
  },
  computed: {
    comNameChange() {
      return this.$store.state.comName;
    }
  },
  watch: {
    comNameChange: {
      handler(val) {
        this.whichEcharts = val
        this.drawChart1();
      }
    }
  }
}
</script>

<style scoped>
.all {
  min-height: 300px;
}
</style>
