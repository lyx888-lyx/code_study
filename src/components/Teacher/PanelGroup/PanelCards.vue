<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('1')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-user"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            当前用户数
          </div>
          <span class="card-panel-num">{{ numberMsg.storeCount || 0 }}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('2')">
        <div class="card-panel-icon-wrapper icon-truck">
          <i class="el-icon-truck"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            当前运货员数
          </div>
          <span class="card-panel-num">{{ numberMsg.deliveryCount || 0 }}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('3')">
        <div class="card-panel-icon-wrapper icon-order">
          <i class="el-icon-s-order"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本周订单数
          </div>
          <span class="card-panel-num">{{ numberMsg.orderCount || 0 }}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('4')">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-money"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本周成交额
          </div>
          <span class="card-panel-num">{{ numberMsg.priceCount || 0 }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PanelCards",
  data() {
    return {
      numberMsg: {
        priceCount: '',
        deliveryCount: '',
        storeCount: '',
        orderCount: ''
      }
    }
  },
  methods: {
    handleSetLineChartData(name) {
      this.$store.commit('changeComName', name)
    },
    // 获取相关数据
    getNumberMsg() {
      // let query = {
      //   factoryId: window.localStorage.getItem('facId') || ''
      // }
      // getNumberMsg(query).then(res => {
      //   console.log(res)
      //   this.numberMsg = res.data.message.data
      // })
    }
  },
  mounted() {
    this.getNumberMsg()
  }
}
</script>

<style lang="less" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-order {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-truck {
        background: rgb(11, 238, 193);
      }
    }

    .icon-people {
      color: #40c9c6;

      .el-icon-user {
        font-size: 40px;
      }
    }

    .icon-order {
      color: #36a3f7;

      .el-icon-s-order {
        font-size: 40px;
      }
    }

    .icon-money {
      color: #f4516c;

      .el-icon-money {
        font-size: 40px;
      }
    }

    .icon-truck {
      color: #34bfa3;

      .el-icon-truck {
        font-size: 40px;
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
}
</style>
