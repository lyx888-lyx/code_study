import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events';
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
//顶部页面加载条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})
//路由监听
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
//路由跳转结束
router.afterEach(() => {
  NProgress.done()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
